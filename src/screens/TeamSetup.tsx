import type { ScreenProps } from '../App';
import { COLORS } from '../game';

export default function TeamSetup({ state, dispatch }: ScreenProps) {
  const clash = state.teams[0].color === state.teams[1].color;

  return (
    <div className="panel">
      <p className="eyebrow">Step 1 of 2</p>
      <h1>Name your teams</h1>

      <div className="team-forms">
        {state.teams.map((team, i) => (
          <fieldset key={i} className="team-form" style={{ background: team.color }}>
            <label htmlFor={`team-${i}`}>Team {i + 1}</label>
            <input
              id={`team-${i}`}
              value={team.name}
              maxLength={20}
              placeholder={`Team ${'AB'[i]}`}
              onChange={(e) => dispatch({ type: 'setTeam', index: i, patch: { name: e.target.value } })}
            />
            <div className="swatches" role="radiogroup" aria-label={`Team ${i + 1} colour`}>
              {COLORS.map((c) => (
                <button
                  key={c}
                  role="radio"
                  aria-checked={team.color === c}
                  aria-label={`Colour ${c}`}
                  className="swatch"
                  style={{ background: c }}
                  onClick={() => dispatch({ type: 'setTeam', index: i, patch: { color: c } })}
                />
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      {clash && <p className="hint warn">Pick two different colours so the board is readable.</p>}

      <div className="row center">
        <button className="btn ghost" onClick={() => dispatch({ type: 'go', screen: 'home' })}>
          Back
        </button>
        <button className="btn primary" disabled={clash} onClick={() => dispatch({ type: 'go', screen: 'pick' })}>
          Next: pick themes
        </button>
      </div>
    </div>
  );
}
