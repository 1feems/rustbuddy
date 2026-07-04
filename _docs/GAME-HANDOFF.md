# Rust Buddy — Game Handoff

> Read this every session before touching anything in `game/`.
> This is the game's source of truth. Root `HANDOFF.md` points here.

Last updated: 2026-07-04 (session 7)

---

## What This Is

**Rust Buddy** is the first product built on Buddy Tech — an agent-orchestrated technical communications studio. Rust Buddy is a Buddy Tech client: it has an asset brief (interactive exercises and flashcard decks), a content source (the Rust for Solana transcript from HerDAO Rust School), and a deployment target (rustbuddy.vercel.app).

The game agents (Rust Game Agent, Exercise Agent, Flashcard Agent) are fully self-contained in this repo. They do not depend on the Buddy Tech root pipeline to operate. Their agent cards, design docs, copy, and style guide all live under `game/`.

For the full picture of how Rust Buddy fits within Buddy Tech and the client model, read `SYSTEM-OVERVIEW.md` at the Buddy Tech root.

---

## What's Next

### 1. Link styles.css to Every HTML Page

Add `<link rel="stylesheet" href="../_design/styles.css">` to the `<head>` of every page in `exercises/`, `flashcards/`, `resources/`, and `index.html`. Until this is done the design tokens have no effect on the live site.

After linking: commit and push.

### 2. Flashcard Decks — Build Remaining 7

Build one HTML file per deck. Use `flashcards/values.html` as the template — copy exactly, swap gradient class and card content only.

**Term source:** `lessons/solana/rust-for-solana/VOCABULARY.md`
- Filter by the `Flashcard Deck` column (4th column on every term row)
- The `## Flashcard Deck Map` section at the top maps each deck to its exercise and lists key terms
- Do not invent terms or pull from anywhere else

| Deck | File | Gradient | Terms | Notes |
|---|---|---|---|---|
| STRINGS | `flashcards/strings.html` | Lime | 16 | — |
| SLICES | `flashcards/slices.html` | Orange | 8 | — |
| TUPLES | `flashcards/tuples.html` | Cyan | 13 | — |
| STRUCTS | `flashcards/structs.html` | Pink | 19 | — |
| ENUMS | `flashcards/enums.html` | Yellow | 8 | — |
| OPTION | `flashcards/option.html` | Lime | 6 | — |
| FLOW | `flashcards/flow.html` | Orange | 29 | Trim to ~16 before building |

After each file is built: update `flashcards/index.html` to flip that deck card from `class="soon"` to `class="live"`, then commit and push.

### Later

- V2 flashcard study mode: single card centered, flip on click, "Know it" / "Still learning" buttons, progress bar. Build after all decks are done.
- Exercise pages for remaining topics (Borrowing, String vs &str, Slices, Structs, Enums, etc.) — source `.md` files exist in `game/exercises/`
- Game levels reskin (`game/levels/`) — old style, low priority

---

## Docs Index

| File | Purpose |
|---|---|
| `_design/DESIGN_SYSTEM.md` | Full UI spec — dimensions, clip-paths, nav, landing hero |
| `_design/styles.css` | CSS custom properties — edit here to change any design value |
| `_design/DESIGN_TOKENS.md` | Token reference — what each token does and where it's used |
| `_docs/COPY.md` | All page-level copy — labels, titles, descriptions, deck colors, file refs |
| `_docs/STYLE-GUIDE.md` | Voice, tone, reading level, and copy rules for all game pages |
| `_docs/EXERCISE-PAGE-DESIGN.md` | Exercise page layout spec — tabs, 6-exercise pattern, content source paths |
| `_docs/GAME-LEVELS-DESIGN.md` | Game levels design |
| `flashcards/FLASHCARD-CONTEXT.md` | Flashcard structural context and build rules |
| `_docs/AGENT-ARCHITECTURE.md` | Platform map, agent routing, pipeline visual |
| `_docs/agent-cards/practice-exercise-agent.md` | Exercise agent — full build workflow |
| `_docs/agent-cards/flashcard-agent.md` | Flashcard agent — full build workflow |
| `_docs/agent-cards/rust-game-agent.md` | Game coordinator — routes requests to sub-agents |

---

## Notes for Next Agent

- Exercise page template: `exercises/variables.html` — copy exactly, change only title, exercises, and code snippets
- Flashcard deck template: `flashcards/values.html` — copy exactly, change gradient class and card content
- No em dashes anywhere on the site
- Hero titles are always one line — no `<br>` tags
- All copy must match `_docs/COPY.md` — do not invent new page labels or titles
- Commit + push after every completed file — nothing is live until pushed to GitHub
