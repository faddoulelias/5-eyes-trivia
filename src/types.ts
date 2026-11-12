export type Kind = 'qa' | 'blank' | 'emoji' | 'charades' | 'picture';

/** One card as written in src/data/questions.json. */
export interface QA {
  /** The question (or emoji clue, or "Act it out") */
  q: string;
  /** The answer revealed at the end */
  a: string;
  /** Optional picture key from src/images.ts */
  img?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  kind: Kind;
  /** easy (200), medium (400), hard (600) — 12 cards each; a match draws 2 per tier */
  tiers: readonly [readonly QA[], readonly QA[], readonly QA[]];
}

export interface Team {
  name: string;
  color: string;
  score: number;
}

export interface Cell {
  q: string;
  a: string;
  img?: string;
  value: number;
  done: boolean;
  /** team index that scored, -1 if nobody, null while unplayed */
  by: number | null;
}

/**
 * ready    – charades only: the actor peeks at the word before the clock starts
 * question – the team whose turn it is answers
 * steal    – the other team gives its guess
 * reveal   – the answer is shown and the table decides who got it
 * done     – points awarded
 */
export type Phase = 'ready' | 'question' | 'steal' | 'reveal' | 'done';

export interface Current {
  col: number;
  row: number;
  phase: Phase;
  /** team whose turn it is */
  team: number;
}

export type Screen = 'home' | 'teams' | 'pick' | 'board' | 'end';

export interface State {
  screen: Screen;
  teams: [Team, Team];
  picked: string[];
  /** board[col][row]; null when no match is in progress */
  board: Cell[][] | null;
  turn: number;
  cur: Current | null;
  /** IDs of cards already played on this device, oldest first (see cardId). */
  seen: string[];
}
