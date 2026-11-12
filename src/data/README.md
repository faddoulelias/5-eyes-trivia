# The question deck

All cards live in [`questions.json`](questions.json). Edit that file, then run `npm run check` (or just `npm run build`) to validate it.

## Format

```json
{
  "categories": [
    {
      "id": "geo",
      "name": "Geog­ra­phy",
      "icon": "🌍",
      "kind": "qa",
      "levels": {
        "200": [ { "q": "What is the capital of Japan?", "a": "Tokyo" }, ... ],
        "400": [ ... ],
        "600": [ ... ]
      }
    }
  ]
}
```

**Theme fields**

| Field | Meaning |
| --- | --- |
| `id` | Short, unique, never shown. Played-card history is keyed on it, so don't rename it casually. |
| `name` | Shown on the theme picker and the board. `­` is an invisible "break here if needed" mark for long words on phones. |
| `icon` | One emoji. |
| `kind` | Sets the card's label and timer: `qa` (answer out loud), `blank` (finish the line), `emoji` (name the movie), `picture` (every card has a picture), `charades` (actor sees the answer, 60 s clock). |
| `levels` | Exactly 12 cards each under `"200"`, `"400"` and `"600"`. A match draws 2 per level. |

**Card fields**

| Field | Meaning |
| --- | --- |
| `q` | The question. For emoji themes, the emoji; for charades, `"Act it out"`. |
| `a` | The answer, revealed at the end. |
| `img` | Optional. A picture key from `src/images.ts`. If present, the card shows that photo. |

## Rating the levels

Rate for the people who pick the theme (a Football card is rated for football fans).

- **200**: most people at the table know it. Famous faces and landmarks are 200.
- **400**: about half the table knows it.
- **600**: only a keen fan of that theme knows it.

When unsure, go one level easier. Lebanese content belongs only in the `levant` theme.

## Adding a picture card

1. Add a line to [`scripts/image-sources.json`](../../scripts/image-sources.json): a new key and the English Wikipedia article whose main photo you want, e.g. `"place-eiffel": "Eiffel Tower"`. To pick an exact photo instead, use `{ "file": "Some file.jpg" }` with a Wikimedia Commons file name.
2. Run `npm run images`. It looks up the photo and its licence credit and rewrites `src/images.ts`.
3. Add the card with `"img": "your-key"`.

Check the photo in the game: it shouldn't show the answer (no name on a shirt, no sign).

## What `npm run check` catches

- invalid JSON, unknown or missing fields, empty questions or answers
- a level without exactly 12 cards
- a picture key that isn't in `src/images.ts`, or the same picture used twice
- the same question appearing twice
- (warning only) Lebanese-looking cards outside the `levant` theme

Editing or removing a card is safe. Played-card history is matched on theme + question + answer, so an edited card simply counts as new.
