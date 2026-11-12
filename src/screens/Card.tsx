import { useEffect, useState } from 'react';
import type { ScreenProps } from '../App';
import { byId } from '../questions';
import { IMAGES, type PictureInfo } from '../images';
import type { Kind, Phase } from '../types';

const ANSWER_SECONDS: Record<Kind, number> = { qa: 30, blank: 30, emoji: 30, picture: 30, charades: 60 };
const STEAL_SECONDS = 15;

const KIND_LABEL: Record<Kind, string> = {
  qa: 'Answer out loud',
  blank: 'Fill in the blank',
  emoji: 'Name the movie',
  picture: 'Picture round',
  charades: 'Act it out — no words',
};

function beep() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 440;
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.6);
    osc.onended = () => void ctx.close();
  } catch {
    /* audio is optional */
  }
}

/**
 * The card's photo, with a fallback if it won't load. The licence credit is
 * shown only after the reveal: credits often name the subject ("PD-India",
 * "Lhasa Government") and would give the answer away.
 */
function Picture({ info, showCredit }: { info: PictureInfo; showCredit: boolean }) {
  const [failed, setFailed] = useState(false);
  return (
    <figure className="card-img">
      {failed ? (
        <p className="img-fail">The picture didn't load. Check the connection, or tap Answer locked in to move on.</p>
      ) : (
        <img src={info.src} alt="Picture clue" onError={() => setFailed(true)} />
      )}
      {showCredit && (
        <figcaption>
          <a href={info.page} target="_blank" rel="noreferrer">Photo: {info.credit}</a>
        </figcaption>
      )}
    </figure>
  );
}

/** Counts down while the phase is timed; restarts whenever the phase changes. */
function useCountdown(phase: Phase, seconds: number): number {
  const [left, setLeft] = useState(seconds);
  const timed = phase === 'question' || phase === 'steal';

  useEffect(() => {
    setLeft(seconds);
    if (!timed) return;
    const id = window.setInterval(() => {
      setLeft((n) => {
        if (n === 1) beep();
        return Math.max(0, n - 1);
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [phase, seconds, timed]);

  return left;
}

export default function Card({ state, dispatch }: ScreenProps) {
  const cur = state.cur!;
  const cell = state.board![cur.col][cur.row];
  const cat = byId(state.picked[cur.col]);
  const charades = cat.kind === 'charades';

  const team = state.teams[cur.team];
  const other = state.teams[1 - cur.team];
  const seconds = cur.phase === 'steal' ? STEAL_SECONDS : ANSWER_SECONDS[cat.kind];
  const left = useCountdown(cur.phase, seconds);

  const [shown, setShown] = useState(false);
  const done = cur.phase === 'done';
  const reveal = cur.phase === 'reveal';
  // Only a charades actor may look early; otherwise the answer waits for the reveal.
  const answerVisible = done || reveal || (charades && shown);
  const active = cur.phase === 'steal' ? other : team;
  const scorer = cell.by !== null && cell.by >= 0 ? state.teams[cell.by] : null;
  const picture = cell.img ? IMAGES[cell.img] : undefined;

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label={`${cat.name} for ${cell.value}`}>
      <div className="card">
        <div className="card-head">
          <span className="tag">{cat.icon} {cat.name}</span>
          <span className="tag value">{cell.value}</span>
        </div>

        {!done && !reveal && (
          <p className="whose" style={{ background: active.color }}>
            {cur.phase === 'steal'
              ? charades ? `${other.name} can steal!` : `${other.name}: your steal guess?`
              : `${team.name} to ${charades ? 'act' : 'answer'}`}
          </p>
        )}
        {reveal && <p className="whose">Who got it?</p>}

        {(cur.phase === 'question' || cur.phase === 'steal') && (
          <div className={`timer ${left <= 5 ? 'low' : ''}`} aria-live="off">
            <div className="bar" style={{ width: `${(left / seconds) * 100}%`, background: active.color }} />
            <span>{left > 0 ? `${left}s` : "Time's up!"}</span>
          </div>
        )}

        <p className="kind">{picture ? 'Picture round' : KIND_LABEL[cat.kind]}</p>

        {picture && <Picture info={picture} showCredit={answerVisible} />}

        {charades ? (
          <p className="prompt">
            {answerVisible ? cell.a : cur.phase === 'ready'
              ? `Hand the screen to ${team.name}'s actor. Only they may peek.`
              : '🤫 Word hidden'}
          </p>
        ) : (
          <p className={`prompt ${cat.kind === 'emoji' ? 'emoji' : ''} ${picture ? 'small' : ''}`}>{cell.q}</p>
        )}

        {!charades && answerVisible && (
          <p className="answer"><span>Answer</span>{cell.a}</p>
        )}

        {done && (
          <p className="result" style={{ background: scorer?.color }}>
            {scorer ? `+${cell.value} for ${scorer.name}` : 'Nobody scores'}
          </p>
        )}

        <div className="row center wrap">
          {charades && !done && (
            <button className="btn ghost" onClick={() => setShown((v) => !v)}>
              {shown ? 'Hide word' : 'Peek at word'}
            </button>
          )}

          {cur.phase === 'ready' && (
            <button
              className="btn primary"
              onClick={() => {
                setShown(false);
                dispatch({ type: 'startClock' });
              }}
            >
              Start the clock
            </button>
          )}

          {charades && cur.phase === 'question' && (
            <>
              <button className="btn good" onClick={() => dispatch({ type: 'judge', correct: true })}>Correct</button>
              <button className="btn bad" onClick={() => dispatch({ type: 'judge', correct: false })}>Wrong</button>
            </>
          )}

          {charades && cur.phase === 'steal' && (
            <>
              <button className="btn good" onClick={() => dispatch({ type: 'judge', correct: true })}>Stolen!</button>
              <button className="btn bad" onClick={() => dispatch({ type: 'judge', correct: false })}>No steal</button>
            </>
          )}

          {!charades && cur.phase === 'question' && (
            <button className="btn primary" onClick={() => dispatch({ type: 'advance' })}>
              Answer locked in
            </button>
          )}

          {!charades && cur.phase === 'steal' && (
            <button className="btn primary" onClick={() => dispatch({ type: 'advance' })}>
              Reveal answer
            </button>
          )}

          {reveal && (
            <>
              <button
                className="btn pick"
                style={{ background: team.color }}
                onClick={() => dispatch({ type: 'award', scorer: cur.team })}
              >
                {team.name} got it
              </button>
              <button
                className="btn pick"
                style={{ background: other.color }}
                onClick={() => dispatch({ type: 'award', scorer: 1 - cur.team })}
              >
                {other.name} stole it
              </button>
              <button className="btn ghost" onClick={() => dispatch({ type: 'award', scorer: -1 })}>
                Nobody
              </button>
            </>
          )}

          {done && (
            <button className="btn primary" autoFocus onClick={() => dispatch({ type: 'close' })}>
              Back to board
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
