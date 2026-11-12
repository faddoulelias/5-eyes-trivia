import type { ScreenProps } from '../App';
import { CATEGORIES } from '../questions';
import { PICK_COUNT, inProgress, unseenCount } from '../game';

const TOTAL_CARDS = CATEGORIES.reduce((n, c) => n + c.tiers.flat().length, 0);

export default function PickThemes({ state, dispatch }: ScreenProps) {
  const count = state.picked.length;
  const full = count === PICK_COUNT;

  const start = () => {
    if (inProgress(state) && !window.confirm('This replaces the match in progress. Start a new one?')) return;
    dispatch({ type: 'start' });
  };

  const resetHistory = () => {
    if (window.confirm('Forget which cards you have played? Every card will count as new again.')) {
      dispatch({ type: 'resetSeen' });
    }
  };

  return (
    <div className="panel wide">
      <p className="eyebrow">Step 2 of 2</p>
      <h1>Pick {PICK_COUNT} themes</h1>

      <div className="themes">
        {CATEGORIES.map((c) => {
          const on = state.picked.includes(c.id);
          const fresh = unseenCount(c.id, state.seen);
          return (
            <button
              key={c.id}
              className={`theme ${on ? 'on' : ''}`}
              aria-pressed={on}
              disabled={!on && full}
              onClick={() => dispatch({ type: 'togglePick', id: c.id })}
            >
              <span className="icon" aria-hidden>{c.icon}</span>
              {c.name}
              <span className={`fresh ${fresh === 0 ? 'none' : ''}`}>
                {fresh === 0 ? 'All played' : `${fresh} new`}
              </span>
            </button>
          );
        })}
      </div>

      <p className="hint">{count} / {PICK_COUNT} picked</p>

      {state.seen.length > 0 && (
        <p className="hint history">
          You've played {state.seen.length} of {TOTAL_CARDS} cards on this device. New ones are drawn first.{' '}
          <button className="link" onClick={resetHistory}>Start fresh</button>
        </p>
      )}

      <div className="row center">
        <button className="btn ghost" onClick={() => dispatch({ type: 'go', screen: 'teams' })}>
          Back
        </button>
        <button className="btn ghost" onClick={() => dispatch({ type: 'randomPick' })}>
          🎲 Surprise us
        </button>
        <button className="btn primary" disabled={!full} onClick={start}>
          Start match
        </button>
      </div>
    </div>
  );
}
