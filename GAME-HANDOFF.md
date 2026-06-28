# Rust Bud — Game Handoff

> Read this every session before touching anything in `game/`.
> This is the game's source of truth. Root `HANDOFF.md` points here.

Last updated: 2026-06-28

---

## What Rust Bud Is

A web-based Rust learning platform with four products:

| Product | Subfolder | Status |
|---|---|---|
| Exercise Pages | `game/exercises/` | In progress |
| Game Levels | `game/levels/` | Level 1 built (needs reskin) |
| Flashcard Decks | `game/flashcards/` | Design locked — not yet built |
| Study Guides | `game/study-guides/` | Placeholder — not yet built |

Site name: **Rust Bud**
Deployment: Local → GitHub (`rust-bud` repo, not yet created) → Vercel

---

## Read Order Every Session

1. This file — you're reading it
2. `AGENT-ARCHITECTURE.md` — platform map, source assets, agent routing
3. `_design/DESIGN_SYSTEM.md` — all UI tokens. Never invent styles.
4. The relevant product doc for what you're building (see below)

---

## Current Session State (2026-06-28)

### What was decided this session

**Folder reorganization approved** — spec at:
`docs/superpowers/specs/2026-06-28-rust-bud-game-folder-reorganization.md`

Not yet implemented. Implementation plan coming next.

**Design system locked:**
- Master: `game/_design/DESIGN_SYSTEM.md` — applies to all game pages
- Flashcard: `game/_design/rust-flashcards-visual-design.md` — collectible card design on top of master
- Card shell: `#1E1E1A` dark (not white)
- Font: Inter throughout
- Card radius: 20px

**Flashcard color palette locked (5 colors):**

| Color | Gradient | Assign to |
|---|---|---|
| Orange | `#FF7657 → #F97316 → #E85D04` | TBD |
| Cyan | `#14A6C8 → #35BFDA → #6BD5E6 → #A8EDF0` | TBD |
| Pink | `#DE4775 → #EA6689 → #F0868A → #F6A56F` | TBD |
| Lime | `#A8D92F → #C5E94E → #DAF06F → #EFF8A7` | TBD |
| Gold | `#D99700 → #EDB51F → #F3C84F → #FFDF86` | TBD |

Purple does not fit the site palette — not used.
Back panel = pale gradient version of front color.
Page background = `#FFFFFF` white (cards pop against it).

**Flashcard deck structure redesign:**
Old decks (Basics, Functions, Ownership...) do not align with exercise pages.
New direction: one deck per exercise topic, 10–12 cards each. Reinforces the same concept in both the exercise page and the flashcard deck.

**VOCABULARY.md stays as-is** — content source only: term | what it means | when it's used. Do not restructure it.

**New doc: `game/flashcards/CARD-INVENTORY.md`** — maps which terms from VOCABULARY.md go in which deck. Flashcard Agent reads both: VOCABULARY.md for card content, CARD-INVENTORY.md for deck organization.

| New Deck | Aligns with exercise page | Size |
|---|---|---|
| Variables | `exercises/variables.html` | 10–12 |
| Numbers | `exercises/numbers.html` | 10–12 |
| Chars & Bools | `exercises/chars-bools.html` | 10–12 |
| Statements & Expressions | `exercises/statements-expressions.html` | 10–12 |
| Functions | `exercises/functions.html` | 10–12 |
| Ownership | `exercises/ownership.html` | 10–12 |
| Borrowing | `exercises/borrowing.html` | 10–12 |
| String vs &str | `exercises/string-vs-str.html` | 10–12 |
| Slices | `exercises/slices.html` | 10–12 |
| Tuples | `exercises/tuples.html` | 10–12 |
| Structs | `exercises/structs.html` | 10–12 |
| Enums | `exercises/enums.html` | 10–12 |
| Option | `exercises/option.html` | 10–12 |
| Flow Control | `exercises/flow-control.html` | 10–12 |
| Anchor + Solana | Contract capstone | 10–12 |

Old VOCABULARY.md deck structure (8 decks) → being reorganized to match above.
Modules deck (23 terms, currently complete) → split into Part A + Part B or redistributed.

**Landing page reference added:**
`game/archive/landing page.png` — shows hero text left, description right, numbered card blocks below.
After reorganization: moves to `game/_design/assets/`.
This is the layout for both the exercise index and the flashcard landing page.

**Card proof HTML** (working flip mechanic with new design):
`/tmp/flashcard-game-colors.html` — local only, not committed.
Needs to be saved to `game/_refs/prototypes/` during reorganization.

---

## What's Built

| File | Product | Status |
|---|---|---|
| `game/index.html` | Home page | ✅ Built — Ferris logo, hero tagline, 3 product cards (Exercises, Flashcards, Resources) |
| `game/exercises/index.html` | Exercise landing | ✅ Built — 4 cards (Variables, Numbers, Chars & Bools, Statements & Expressions) |
| `game/exercises/variables.html` | Exercise page | ✅ Built — canonical template |
| `game/exercises/numbers.html` | Exercise page | Draft — not committed |
| `game/exercises/chars-bools.html` | Exercise page | Draft — not committed |
| `game/exercises/statements-expressions.html` | Exercise page | Draft — not committed |
| `game/flashcards/index.html` | Flashcard landing | ✅ Built — 15 deck cards with Bauhaus icons, term counts |
| `game/levels/level-01-data-types-functions.html` | Game level | ✅ Built — old style, needs reskin |
| `game/_refs/prototypes/rust-flashcards-card-proof.html` | Flashcard proof | ✅ Built |
| `game/_refs/prototypes/rust-flashcards-card-grid.html` | Flashcard grid | ✅ Built |
| `game/_refs/prototypes/flashcard-game-colors.html` | Flashcard color system | ✅ Built — all 5 deck colors |

---

## What's Next — In Order

### Phase 1 — Folder Reorganization ✅ COMPLETE (2026-06-28)
1. **Folder reorganization done** — per spec `docs/superpowers/specs/2026-06-28-rust-bud-game-folder-reorganization.md`
   - ✅ `_design/`, `_docs/`, `_refs/prototypes/` created
   - ✅ `flashcards/`, `levels/`, `study-guides/` product subfolders created
   - ✅ All HTML pages moved to product subfolders
   - ✅ `AGENT-ARCHITECTURE.md` written
   - ✅ `flashcard-game-colors.html` (Gold color added) → `_refs/prototypes/`
   - ✅ Prototype HTML files moved from `docs/design/prototypes/` → `_refs/prototypes/`
   - ✅ `game/practice/` moved to `lessons/solana/rust-for-solana/practice/`
   - ✅ Root `HANDOFF.md` updated — 3-line pointer to game docs
   - ✅ `flashcard-agent.md` updated with new file paths
   - ⚠️ `rust-flashcards-visual-design.md` still needs 5-color palette update (do next session)
   - ⚠️ `design 1.webp`, `layout1.jpg`, `card ex.png` referenced in docs but NOT found locally — add when available

### Phase 2 — Landing Pages + Home Page ✅ COMPLETE (2026-06-28)
2. ✅ **`game/exercises/index.html`** — 4 exercise cards (expands as more exercise pages are built)
3. ✅ **`game/flashcards/index.html`** — 15 flashcard deck cards with Bauhaus icons + term counts
4. ✅ **`game/index.html`** — Home page: Ferris logo, "Learn Rust. One challenge at a time.", 3 product cards
   - Site name on home page: **Rust Buddy**
   - Nav: Exercises / Flashcards / Resources (Resources replaces Levels — study guide material lives there)
   - Exercise card descriptions: placeholder text — user will provide final copy

### Phase 3 — Flashcard Decks
5. **Build `game/flashcards/variables.html`** — Variables deck, first full deck ← NEXT
   - Approach: all cards laid out in a row with flip mechanic, no interactivity yet — demo first
   - Use Lime gradient (`#A8D92F → #C5E94E → #EFF8A7`) — Variables is deck-lime
   - Source terms: `lessons/solana/rust-for-solana/VOCABULARY.md` Deck 1 (Basics), curate 10–12 Variables terms
   - Read `game/_refs/prototypes/rust-flashcards-card-proof.html` for flip mechanic
   - Read `game/_refs/prototypes/flashcard-game-colors.html` for color system
   - Read `game/_design/rust-flashcards-visual-design.md` for card structure
6. **Create `game/flashcards/CARD-INVENTORY.md`** — map VOCABULARY.md terms to per-topic decks (10–12 each)
   - Note: Tuples, Option, Flow Control decks are thin — add terms when those exercise pages are built
7. **Build remaining flashcard decks** — one per exercise topic as exercise pages are completed
8. **Build `game/resources/index.html`** — study guide landing page (like sqlnoir.com/blog)

---

## Design Reference Files

| File | What it shows | Location after reorg |
|---|---|---|
| `design 1.webp` | Primary card visual reference | `game/_design/assets/` |
| `layout1.jpg` | Page layout / card grid composition | `game/_design/assets/` |
| `landing page.png` | Landing page layout reference | `game/_design/assets/` |
| `ChatGPT Image Jun 10, 2026...png` | Card silhouette + structure | `game/_design/assets/` |
| `card ex.png` | Approved applied layout | `game/_design/assets/` |
| `icons.jpg` | Bauhaus icon style | `game/_design/assets/` |

---

## Flashcard Build Status

| Step | Status |
|---|---|
| Design locked | ✅ Done (this session) |
| Color palette locked (5 colors) | ✅ Done (this session) |
| Deck structure redesigned (per topic) | 🔲 VOCABULARY.md not yet updated |
| Icon assignment (one icon per term) | 🔲 Not started |
| First full deck HTML | 🔲 Not built |

**First deck to build:** Variables — after folder reorganization and landing pages are done.
Icon assignment must be confirmed with user before any HTML is generated.
CARD-INVENTORY.md must be created before any deck HTML is built.
Tuples, Option, Flow Control decks: add terms when those exercise pages are built — do not force terms now.

---

## Agent Notes

- All game agents read `AGENT-ARCHITECTURE.md` before starting
- Design system: `_design/DESIGN_SYSTEM.md` — every page reads this first
- Flashcard agents also read: `_design/rust-flashcards-visual-design.md` + `flashcards/FLASHCARD-CONTEXT.md`
- Exercise agents also read: `_docs/EXERCISE-PAGE-DESIGN.md` + use `exercises/variables.html` as template
- Commit + push after every file — nothing is live until pushed
