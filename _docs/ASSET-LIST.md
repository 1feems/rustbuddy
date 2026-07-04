# Rust Bud — Asset List

Last updated: 2026-06-26
Source of truth for everything that exists in this project.

---

## HTML Pages

| File | What it is | Status |
|---|---|---|
| `level-01-data-types-functions.html` | Game Level 1 — Data Types + Functions | ✅ Built (old style — needs reskin to DESIGN_SYSTEM.md) |
| `index.html` | Rust: Exercises — topic card grid (entry point) | 🔲 Not built |
| `variables.html` | Exercise page — Variables (10 exercises) | ✅ Built |
| `functions.html` | Exercise page — Functions | 🔲 Not built |
| `ownership.html` | Exercise page — Ownership | 🔲 Not built |
| `borrowing.html` | Exercise page — Borrowing | 🔲 Not built |
| `string-vs-str.html` | Exercise page — String vs &str | 🔲 Not built |
| `slices.html` | Exercise page — Slices | 🔲 Not built |
| `tuples.html` | Exercise page — Tuples | 🔲 Not built |
| `structs.html` | Exercise page — Structs | 🔲 Not built |
| `enums.html` | Exercise page — Enums | 🔲 Not built |
| `option.html` | Exercise page — Option | 🔲 Not built |
| `flow-control.html` | Exercise page — Flow Control | 🔲 Not built |
| `level-02-modules.html` | Game Level 2 — Modules | 🔲 Not built |
| `level-03-module-system.html` | Game Level 3 — Module System | 🔲 Not built |
| `level-04-ownership.html` | Game Level 4 — Ownership | 🔲 Not built |
| `level-05-mutable-borrow.html` | Game Level 5 — Mutable Borrowing | 🔲 Not built |
| `level-06-reading-errors.html` | Game Level 6 — Reading Errors | 🔲 Not built |

---

## Exercise Content Files (`game/exercises/`)

| File | Topic | Status |
|---|---|---|
| `01-variables-v2.md` | Variables | ✅ Built — Track A + Track B, 10 exercises each |
| `01-functions.md` | Functions | ✅ Built — not yet practiced |
| `02-ownership.md` | Ownership | ✅ Built — not yet practiced |
| `03-borrowing.md` | Borrowing | ✅ Built — 8 exercises Track A + Track B |
| `04-string-vs-str.md` | String vs &str | ✅ Built |
| `05-slices.md` | Slices | ✅ Built |
| `06-tuples.md` | Tuples | ✅ Built |
| `07-structs.md` | Structs | ✅ Built |
| `08-enums.md` | Enums | ✅ Built |
| `09-option.md` | Option | ✅ Built |
| `10-flow-control.md` | Flow Control | ✅ Built |

---

## Design & Context Docs (`game/`)

| File | What it is | Use it when |
|---|---|---|
| `GAME-CONTEXT.md` | **Read first every session** — what Rust Bud is, folder map, what's built, what's next | Start of every session |
| `DESIGN_SYSTEM.md` | **Site-wide design tokens** — colors, type, surfaces, spacing (Creative Cards) | Before building any UI |
| `EXERCISE-WIREFRAME.md` | Approved wireframes — index page + exercise page layouts | Before building exercise pages |
| `EXERCISE-PAGE-DESIGN.md` | Detailed exercise page spec (older doc — EXERCISE-WIREFRAME is canonical for layout) | Extra detail reference |
| `GAME-LEVELS-DESIGN.md` | Full game levels spec — level map, content per level, anatomy | Before building game levels |
| `FLASHCARD-CONTEXT.md` | Flashcard session guide — what it is, why, 8 decks, pending steps | Before touching flashcard work |
| `rust-flashcards-visual-design.md` | Flashcard visual design — card anatomy, gradients, type, icons | Before building flashcard UI |
| `Creative-Cards-DESIGN.md` | Source reference — design tokens pulled from here into DESIGN_SYSTEM.md | Reference only |

---

## Reference Assets (`game/`)

| File | What it is |
|---|---|
| `icons.jpg` | Bauhaus geometric icon style reference (for flashcard icons) |
| `ChatGPT Image Jun 10, 2026, 04_27_38 PM.png` | Flashcard card structure reference |
| `favicons.png` | File-type sprite sheet — do NOT use for card icons |
| `Case-Files-Play-interactive-SQL-detective-scenarios-SQLNoir-06-26-2026_03_06_PM.png` | SQLNoir Case Files screenshot — layout reference for Rust: Exercises index page |
| `ui.rtf` | UI notes (reference) |
| `archive/design 1.webp` | Gradient + font style reference for flashcards |
| `archive/layout1.jpg` | Page layout reference for flashcards |

---

## Design Prototypes (`docs/design/prototypes/`)

| File | What it is | Status |
|---|---|---|
| `rust-flashcards-card-proof.html` | Single card — correct design, working flip mechanic | ✅ Built — needs visual review vs `game/archive/design 1.webp` |
| `rust-flashcards-card-grid.html` | Card grid layout proof | ✅ Built |

---

## What's Next (priority order)

1. Build `game/index.html` — Rust: Exercises topic card grid
2. Build remaining exercise pages (functions → flow-control)
3. Set up GitHub repo + Vercel deploy
4. Fill vocabulary gaps for flashcard Decks 1–4
5. Build remaining game levels (2–6)
6. Build flashcard full deck once vocab is complete
