# Rust Bud — Game Handoff

> Read this every session before touching anything in `game/`.
> This is the game's source of truth. Root `HANDOFF.md` points here.

Last updated: 2026-06-29

---

## What Rust Bud Is

A web-based Rust learning platform with four products:

| Product | Subfolder | Status |
|---|---|---|
| Exercise Pages | `game/exercises/` | In progress — 1 built, 3 drafted |
| Flashcard Decks | `game/flashcards/` | In progress — landing + Variables deck built |
| Resources | `game/resources/` | Not yet built |
| Game Levels | `game/levels/` | Level 1 built (old style, needs reskin) |

Site name: **Rust Buddy**
GitHub: https://github.com/1feems/rust-bud (pushed ✅)
Deployment: Vercel — **not yet connected** ← NEXT STEP

---

## Read Order Every Session

1. This file — you're reading it
2. `AGENT-ARCHITECTURE.md` — platform map, source assets, agent routing
3. `_design/DESIGN_SYSTEM.md` — all UI tokens. Never invent styles.
4. The relevant product doc for what you're building (see below)

---

## What's Built

| File | Product | Status |
|---|---|---|
| `game/index.html` | Home page | ✅ Pushed — Ferris logo, hero, 3 product cards (Exercises, Flashcards, Resources) |
| `game/exercises/index.html` | Exercise landing | ✅ Pushed — 4 topic cards (Variables, Numbers, Chars & Bools, Statements & Expressions) |
| `game/exercises/variables.html` | Exercise page | ✅ Pushed — canonical template for all exercise pages |
| `game/exercises/numbers.html` | Exercise page | Draft — not yet committed |
| `game/exercises/chars-bools.html` | Exercise page | Draft — not yet committed |
| `game/exercises/statements-expressions.html` | Exercise page | Draft — not yet committed |
| `game/flashcards/index.html` | Flashcard landing | ✅ Pushed — 15 deck cards, Bauhaus icons, term counts |
| `game/flashcards/variables.html` | Flashcard deck | ✅ Pushed — 11 cards, lime gradient, CSS 3D flip |
| `game/levels/level-01-data-types-functions.html` | Game level | ✅ Pushed — old style, reskin later |

---

## What's Next — In Order

### Phase 4 — Deploy to Vercel ← DO THIS FIRST

1. **Connect Vercel**
   - Go to vercel.com → Add New Project → Import `1feems/rust-bud`
   - Framework: Other (static HTML, no build step)
   - Root directory: `/` (repo root)
   - Click Deploy
   - Every `git push origin main` auto-redeploys after this

### Phase 5 — Build Remaining Exercise Pages

Build these three pages using `exercises/variables.html` as the template. Each page follows the exact same structure — only the title, exercises, and code change.

2. **`game/exercises/numbers.html`** — Numbers exercise page
3. **`game/exercises/chars-bools.html`** — Chars & Bools exercise page
4. **`game/exercises/statements-expressions.html`** — Statements & Expressions exercise page

After each page: commit + push so it's live on Vercel immediately.

### Phase 6 — Build Remaining Flashcard Decks

Build one deck per exercise topic, in the same order as exercise pages.

5. **`game/flashcards/numbers.html`** — Numbers deck, Orange gradient
6. **`game/flashcards/chars-bools.html`** — Chars & Bools deck, Cyan gradient
7. **`game/flashcards/statements-expressions.html`** — Statements & Expressions deck, Pink gradient
8. **Continue** — one deck per topic as exercise pages are completed

Before building any deck: check `VOCABULARY.md` for source terms. 10–12 terms per deck.
`CARD-INVENTORY.md` still needs to be created — maps VOCABULARY.md terms to each deck topic.

### Phase 7 — Resources Page

9. **`game/resources/index.html`** — study guide landing page (layout like sqlnoir.com/blog)
   - Cards link to topic study guides
   - Not yet designed — brainstorm when ready

---

## Design System

**Colors (5 deck gradients — locked):**

| Color | Gradient | Deck assignment |
|---|---|---|
| Lime | `#A8D92F → #C5E94E → #EFF8A7` | Variables (01) |
| Orange | `#FF7657 → #F97316 → #E85D04` | Numbers (02) |
| Cyan | `#14A6C8 → #35BFDA → #A8EDF0` | Chars & Bools (03) |
| Pink | `#DE4775 → #EA6689 → #F6A56F` | Statements & Expressions (04) |
| Gold | `#D99700 → #EDB51F → #FFDF86` | Functions (05) |
| Repeats Lime → | — | Ownership (06), etc. |

Back panel = pale gradient version of front color.
Page background = `#FFFFFF`. Cards pop against white.
Card radius: 20px. Font: Inter throughout.

Full tokens: `_design/DESIGN_SYSTEM.md`
Flashcard-specific: `_design/rust-flashcards-visual-design.md`

---

## Flashcard Build Status

| Step | Status |
|---|---|
| Design locked | ✅ Done |
| Color palette locked (5 colors) | ✅ Done |
| Variables deck built + pushed | ✅ Done |
| CARD-INVENTORY.md | 🔲 Not yet created |
| Remaining 14 decks | 🔲 Not started |
| V2 study mode (flip + Know it / Still learning) | 🔲 Future feature |

**V2 flashcard study mode (future):** Single card centered, flip on click, "Know it" / "Still learning" buttons below, progress bar at top. Build after all decks are done.

---

## Notes for Next Agent

- Exercise page template: `exercises/variables.html` — copy this exactly, change only the title, exercises, and code snippets
- Flashcard deck template: `flashcards/variables.html` — copy this exactly, change gradient class and card content
- Exercise card descriptions on landing page (`exercises/index.html`): placeholder text — user will provide final copy
- `rust-flashcards-visual-design.md` still needs the 5-color palette written in (low priority)
- `design 1.webp`, `layout1.jpg`, `card ex.png` referenced in docs but not found locally — add when available
- All game agents read `AGENT-ARCHITECTURE.md` before starting
- Commit + push after every file — nothing is live until pushed to GitHub
