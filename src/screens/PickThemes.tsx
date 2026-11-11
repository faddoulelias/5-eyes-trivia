import type { ScreenProps } from '../App';
import { CATEGORIES } from '../questions';
import { PICK_COUNT, inProgress } from '../game';

export default function PickThemes({ state, dispatch }: ScreenProps) {
  const count = state.picked.length;
  const full = count === PICK_COUNT;

  const start = () => {
    if (inProgress(state) && !window.confirm('This replaces the match in progress. Start a new one?')) return;
    dispatch({ type: 'start' });
  };

  return (
    <div className="panel wide">
      <p className="eyebrow">Step 2 of 2</p>
      <h1>Pick {PICK_COUNT} themes</h1>

      <div className="themes">
        {CATEGORIES.map((c) => {
          const on = state.picked.includes(c.id);
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
            </button>
          );
        })}
      </div>

      <p className="hint">{count} / {PICK_COUNT} picked</p>

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
