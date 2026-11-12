import { CATEGORIES, byId } from './questions';
import type { Cell, Screen, State, Team } from './types';

export const PICK_COUNT = 6;
export const TIER_VALUES = [200, 400, 600] as const;
export const PER_TIER = 2;
// Team colours: all light enough for ink text, none matching the sky-blue page.
export const COLORS = ['#ff5d8f', '#ffd23f', '#7ce38b', '#b48cff', '#ff9a3c', '#ffffff'];

// v2: team colours changed with the Confetti pop theme.
const STORAGE_KEY = 'out-loud.v2';

export const initialState = (): State => ({
  screen: 'home',
  teams: [
    { name: 'Team A', color: COLORS[0], score: 0 },
    { name: 'Team B', color: COLORS[1], score: 0 },
  ],
  picked: [],
  board: null,
  turn: 0,
  cur: null,
  seen: [],
});

/** Stable identity of a card across matches and deck edits. */
export const cardId = (categoryId: string, q: string, a: string): string => `${categoryId}|${q}|${a}`;

/** How many cards in a category have not been played yet on this device. */
export function unseenCount(categoryId: string, seen: readonly string[]): number {
  const played = new Set(seen);
  return byId(categoryId).tiers.flat().filter(([q, a]) => !played.has(cardId(categoryId, q, a))).length;
}

export function loadState(): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const fresh = initialState();
      const saved = { ...fresh, ...(JSON.parse(raw) as State) };
      // A colour saved under an older palette may clash with the page: reset it.
      saved.teams = saved.teams.map((t, i) =>
        COLORS.includes(t.color) ? t : { ...t, color: fresh.teams[i].color },
      ) as [Team, Team];
      return saved;
    }
  } catch {
    /* storage unavailable or corrupt: start fresh */
  }
  return initialState();
}

export function saveState(s: State): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    /* ignore */
  }
}

/** True while a match has unplayed cards (a finished match is not resumable). */
export const inProgress = (s: State): boolean =>
  s.board !== null && s.board.some((col) => col.some((cell) => !cell.done));

function shuffle<T>(items: readonly T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Draws PER_TIER cards per tier: unplayed cards first, in random order. When a
 * tier runs out of unplayed cards, the ones played longest ago come back first.
 */
function buildBoard(picked: string[], seen: readonly string[]): Cell[][] {
  const playedAt = new Map(seen.map((id, i) => [id, i]));
  return picked.map((catId) =>
    byId(catId).tiers.flatMap((tier, t) => {
      const age = ([q, a]: (typeof tier)[number]) => playedAt.get(cardId(catId, q, a));
      const fresh = shuffle(tier.filter((card) => age(card) === undefined));
      const replay = tier.filter((card) => age(card) !== undefined).sort((x, y) => age(x)! - age(y)!);
      return [...fresh, ...replay]
        .slice(0, PER_TIER)
        .map(([q, a, img]): Cell => ({ q, a, img, value: TIER_VALUES[t], done: false, by: null }));
    }),
  );
}

/** Closes the open card: `scorer` is a team index, or -1 when nobody got it. */
function resolve(s: State, scorer: number): State {
  const { cur, board } = s;
  if (!cur || !board) return s;
  const { value, q, a } = board[cur.col][cur.row];
  // A card counts as played once it is resolved; cards left unplayed in an
  // abandoned match go back into the pool.
  const id = cardId(s.picked[cur.col], q, a);
  const seen = [...s.seen.filter((x) => x !== id), id];
  const teams = s.teams.map((t, i) =>
    i === scorer ? { ...t, score: t.score + value } : t,
  ) as [Team, Team];
  const next = board.map((col, c) =>
    col.map((cell, r) =>
      c === cur.col && r === cur.row ? { ...cell, done: true, by: scorer } : cell,
    ),
  );
  return { ...s, teams, board: next, seen, cur: { ...cur, phase: 'done' } };
}

export type Action =
  | { type: 'go'; screen: Screen }
  | { type: 'setTeam'; index: number; patch: Partial<Team> }
  | { type: 'togglePick'; id: string }
  | { type: 'randomPick' }
  | { type: 'start' }
  | { type: 'open'; col: number; row: number }
  | { type: 'startClock' }
  | { type: 'judge'; correct: boolean }
  | { type: 'adjust'; index: number; delta: number }
  | { type: 'advance' }
  | { type: 'award'; scorer: number }
  | { type: 'close' }
  | { type: 'resetSeen' }
  | { type: 'quit' };

export function reducer(s: State, a: Action): State {
  switch (a.type) {
    case 'go':
      return { ...s, screen: a.screen };

    case 'setTeam': {
      const teams = s.teams.map((t, i) => (i === a.index ? { ...t, ...a.patch } : t)) as [Team, Team];
      return { ...s, teams };
    }

    // Manual correction for a mis-tapped result; scores never go below zero.
    case 'adjust': {
      const teams = s.teams.map((t, i) =>
        i === a.index ? { ...t, score: Math.max(0, t.score + a.delta) } : t,
      ) as [Team, Team];
      return { ...s, teams };
    }

    case 'togglePick': {
      if (s.picked.includes(a.id)) return { ...s, picked: s.picked.filter((x) => x !== a.id) };
      if (s.picked.length >= PICK_COUNT) return s;
      return { ...s, picked: [...s.picked, a.id] };
    }

    case 'randomPick':
      return { ...s, picked: shuffle(CATEGORIES).slice(0, PICK_COUNT).map((c) => c.id) };

    case 'start': {
      if (s.picked.length !== PICK_COUNT) return s;
      const teams = s.teams.map((t, i) => ({
        ...t,
        name: t.name.trim() || `Team ${'AB'[i]}`,
        score: 0,
      })) as [Team, Team];
      return { ...s, teams, board: buildBoard(s.picked, s.seen), turn: 0, cur: null, screen: 'board' };
    }

    case 'open': {
      if (!s.board || s.cur || s.board[a.col][a.row].done) return s;
      const charades = byId(s.picked[a.col]).kind === 'charades';
      return {
        ...s,
        cur: { col: a.col, row: a.row, team: s.turn, phase: charades ? 'ready' : 'question' },
      };
    }

    case 'startClock':
      return s.cur?.phase === 'ready' ? { ...s, cur: { ...s.cur, phase: 'question' } } : s;

    // Charades: the actor knows the word, so each guess is judged on the spot.
    case 'judge': {
      const { cur } = s;
      if (!cur || (cur.phase !== 'question' && cur.phase !== 'steal')) return s;
      if (cur.phase === 'question' && !a.correct) return { ...s, cur: { ...cur, phase: 'steal' } };
      return resolve(s, !a.correct ? -1 : cur.phase === 'question' ? cur.team : 1 - cur.team);
    }

    // Everything else: nobody sees the answer until both teams have had their
    // say, because the host is usually playing too.
    case 'advance': {
      const { cur } = s;
      if (cur?.phase === 'question') return { ...s, cur: { ...cur, phase: 'steal' } };
      if (cur?.phase === 'steal') return { ...s, cur: { ...cur, phase: 'reveal' } };
      return s;
    }

    case 'award':
      return s.cur?.phase === 'reveal' ? resolve(s, a.scorer) : s;

    case 'close': {
      if (!s.cur || !s.board || s.cur.phase !== 'done') return s;
      const finished = s.board.every((col) => col.every((cell) => cell.done));
      return { ...s, cur: null, turn: 1 - s.turn, screen: finished ? 'end' : 'board' };
    }

    case 'resetSeen':
      return { ...s, seen: [] };

    case 'quit':
      return { ...s, board: null, cur: null, screen: 'home' };
  }
}
