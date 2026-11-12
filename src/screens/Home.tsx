import type { ScreenProps } from '../App';
import Mascot from '../components/Mascot';
import { CATEGORIES } from '../questions';
import { PICK_COUNT, PER_TIER, TIER_VALUES, inProgress as matchInProgress } from '../game';

const ROUNDS = PICK_COUNT * PER_TIER * TIER_VALUES.length;
const CARD_COUNT = CATEGORIES.reduce((n, c) => n + c.tiers.flat().length, 0);

const STEPS = [
  ['Name your teams', 'Two teams, two colours, one screen. Whoever holds it can play too: answers stay hidden.'],
  ['Pick your themes', `Choose ${PICK_COUNT} of ${CATEGORIES.length} themes. Each one puts six cards on the board.`],
  ['Play out loud', 'Read the card, shout the answer. The other team adds a steal guess, then the answer is revealed and you pick who got it.'],
] as const;

export default function Home({ state, dispatch }: ScreenProps) {
  const inProgress = matchInProgress(state);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-art" aria-hidden>
          <svg className="burst" viewBox="0 0 200 200">
            <polygon
              fill="#FF5D8F"
              stroke="#12263A"
              strokeWidth="4"
              strokeLinejoin="round"
              points="100,4 118,38 152,18 150,58 190,60 166,92 196,118 158,128 170,166 132,154 118,192 100,158 82,192 68,154 30,166 42,128 4,118 34,92 10,60 50,58 48,18 82,38"
            />
          </svg>
          <Mascot size={150} mood="cheer" />
          <span className="bubble">Say it loud!</span>
        </div>
        <p className="eyebrow">Two teams · One screen · No sign-up</p>
        <h1>
          Khamse bi 3younak
          <br />
          <em lang="ar" dir="rtl">خمسة بعيونك</em>
        </h1>
        <p className="lede">
          Trivia night, played out loud: {ROUNDS} rounds, one shared screen, and answers you have to shout.
        </p>
        <div className="row center">
          {inProgress && (
            <button className="btn primary big" onClick={() => dispatch({ type: 'go', screen: 'board' })}>
              Resume match
            </button>
          )}
          <button
            className={`btn big ${inProgress ? 'ghost' : 'primary'}`}
            onClick={() => dispatch({ type: 'go', screen: 'teams' })}
          >
            {inProgress ? 'New match' : 'Start playing'}
          </button>
        </div>
      </section>

      <section className="stats">
        <div><b>{CATEGORIES.length}</b><span>Themes</span></div>
        <div><b>{ROUNDS}</b><span>Rounds per match</span></div>
        <div><b>{CARD_COUNT}</b><span>Cards in the deck</span></div>
        <div><b>5</b><span>Card formats</span></div>
      </section>

      <section>
        <h2>How to play</h2>
        <ol className="steps">
          {STEPS.map(([title, text], i) => (
            <li key={title}>
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2>More than just questions</h2>
        <ul className="formats">
          <li><b>💬 Open Q&amp;A</b><span>Answer out loud. No multiple choice.</span></li>
          <li><b>✍️ Finish the line</b><span>Fill in the missing word.</span></li>
          <li><b>🧩 Emoji puzzles</b><span>Name the movie from the emoji.</span></li>
          <li><b>📸 Picture rounds</b><span>Name the flag, landmark or dish.</span></li>
          <li><b>🎭 Charades</b><span>Act it out. No words allowed.</span></li>
        </ul>
      </section>
    </div>
  );
}
