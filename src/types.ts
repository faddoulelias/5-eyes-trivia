export type Kind = 'qa' | 'blank' | 'emoji' | 'charades' | 'picture';

/** [prompt, answer, optional picture key from src/images.ts] */
export type QA = readonly [string, string, string?];

export interface Category {
  id: string;
  name: string;
  icon: string;
  kind: Kind;
  /** easy, medium, hard — 9 cards each; a match draws 2 per tier */
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
