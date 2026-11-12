import { useEffect, useState } from 'react';
import { IMAGES } from '../images';
import type { ScreenProps } from '../App';
import { byId } from '../questions';
import type { Team } from '../types';

const ADJUST_STEP = 100;

interface ScoreboardProps {
  teams: [Team, Team];
  turn: number | null;
  /** When set, each score gets − / + buttons. */
  onAdjust?: (index: number, delta: number) => void;
}

export function Scoreboard({ teams, turn, onAdjust }: ScoreboardProps) {
  return (
    <div className="scoreboard">
      {teams.map((t, i) => (
        <div key={i} className={`score ${turn === i || onAdjust ? 'active' : ''}`}>
          <span className="dot" style={{ background: t.color }} />
          <span className="name">{t.name}</span>
          <span className="points">
            {onAdjust && (
              <button
                className="step"
                aria-label={`Take ${ADJUST_STEP} from ${t.name}`}
                disabled={t.score === 0}
                onClick={() => onAdjust(i, -ADJUST_STEP)}
              >
                −
              </button>
            )}
            <b aria-live="polite">{t.score}</b>
            {onAdjust && (
              <button
                className="step"
                aria-label={`Give ${ADJUST_STEP} to ${t.name}`}
                onClick={() => onAdjust(i, ADJUST_STEP)}
              >
                +
              </button>
            )}
          </span>
          {turn === i && <span className="turn">Your pick</span>}
        </div>
      ))}
    </div>
  );
}

export default function Board({ state, dispatch }: ScreenProps) {
  const [adjusting, setAdjusting] = useState(false);
  const board = state.board!;
  const left = board.flat().filter((c) => !c.done).length;

  // Warm the browser cache so picture cards open without a loading gap.
  useEffect(() => {
    for (const cell of board.flat()) {
      if (cell.img && !cell.done && IMAGES[cell.img]) new Image().src = IMAGES[cell.img].src;
    }
    // Only needed once per match: the set of pictures is fixed when the board is built.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.picked.join()]);

  const quit = () => {
    if (window.confirm('End this match? The scores will be lost.')) dispatch({ type: 'quit' });
  };

  return (
    <div className="board-screen">
      <Scoreboard
        teams={state.teams}
        turn={state.turn}
        onAdjust={adjusting ? (index, delta) => dispatch({ type: 'adjust', index, delta }) : undefined}
      />

      <div className="board" role="grid" aria-label="Game board">
        {board.map((col, c) => {
          const cat = byId(state.picked[c]);
          return (
            <div className="col" key={cat.id} role="row">
              <div className="col-head" role="columnheader">
                <span aria-hidden>{cat.icon}</span>
                <span>{cat.name}</span>
              </div>
              {col.map((cell, r) => {
                const scorer = cell.by !== null && cell.by >= 0 ? state.teams[cell.by] : null;
                return (
                  <button
                    key={r}
                    role="gridcell"
                    className={`cell ${cell.done ? 'done' : ''}`}
                    disabled={cell.done}
                    style={scorer ? { background: scorer.color } : undefined}
                    aria-label={
                      cell.done
                        ? `${cat.name} ${cell.value}, ${scorer ? `won by ${scorer.name}` : 'nobody scored'}`
                        : `${cat.name} for ${cell.value}`
                    }
                    onClick={() => dispatch({ type: 'open', col: c, row: r })}
                  >
                    {cell.done ? (scorer ? '✓' : '✕') : cell.value}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className="row between">
        <span className="hint">{left} cards left</span>
        <span className="row">
          <button className="btn ghost small" aria-pressed={adjusting} onClick={() => setAdjusting((v) => !v)}>
            {adjusting ? 'Done adjusting' : 'Adjust scores'}
          </button>
          <button className="btn ghost small" onClick={quit}>End match</button>
        </span>
      </div>
    </div>
  );
}
