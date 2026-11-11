import { useMemo } from 'react';
import type { ScreenProps } from '../App';
import { Scoreboard } from './Board';
import Mascot from '../components/Mascot';

const CONFETTI = ['#FF5D8F', '#FFD23F', '#7CE38B', '#B48CFF', '#FFFFFF'];

export default function End({ state, dispatch }: ScreenProps) {
  const [a, b] = state.teams;
  const winner = a.score === b.score ? null : a.score > b.score ? a : b;

  const confetti = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        color: CONFETTI[i % CONFETTI.length],
        round: i % 3 === 0,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 3,
      })),
    [],
  );

  return (
    <div className="panel end">
      <div className="confetti" aria-hidden>
        {confetti.map((c, i) => (
          <span
            key={i}
            style={{
              left: `${c.left}%`,
              background: c.color,
              borderRadius: c.round ? '50%' : 3,
              animationDelay: `${c.delay}s`,
              animationDuration: `${c.duration}s`,
            }}
          />
        ))}
      </div>

      <p className="eyebrow">Final score</p>
      <Mascot size={130} mood="cheer" />
      <h1>
        <span style={{ background: winner?.color }}>{winner ? `${winner.name} wins!` : "It's a tie!"}</span>
      </h1>

      <Scoreboard teams={state.teams} turn={null} />

      <div className="row center">
        <button className="btn primary" onClick={() => dispatch({ type: 'go', screen: 'pick' })}>
          Rematch
        </button>
        <button className="btn ghost" onClick={() => dispatch({ type: 'quit' })}>
          Home
        </button>
      </div>
    </div>
  );
}
