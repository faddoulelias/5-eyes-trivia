import type { Category, Kind, QA } from './types';
import deck from './data/questions.json';

// The cards live in src/data/questions.json (see src/data/README.md).
// Vite bundles the JSON into the site at build time, so nothing is fetched
// while playing. scripts/check-deck.mjs validates the file on every build.

interface DeckFile {
  categories: {
    id: string;
    name: string;
    icon: string;
    kind: Kind;
    levels: Record<'200' | '400' | '600', QA[]>;
  }[];
}

export const CATEGORIES: readonly Category[] = (deck as DeckFile).categories.map((c) => ({
  id: c.id,
  name: c.name,
  icon: c.icon,
  kind: c.kind,
  tiers: [c.levels['200'], c.levels['400'], c.levels['600']],
}));

export const byId = (id: string): Category => {
  const c = CATEGORIES.find((x) => x.id === id);
  if (!c) throw new Error(`Unknown category ${id}`);
  return c;
};
