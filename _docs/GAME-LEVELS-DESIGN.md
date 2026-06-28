# Rust Game Levels — Design Spec

Date: 2026-06-10
Status: Approved — ready for implementation plan

---

## Problem

Static exercises do not work for this learner. Reading about `u64` and writing it into a blank once does not build retention. The user needs to practice by doing something real — not drilling isolated concepts but building toward an actual goal where each concept has a job.

---

## What This Is

A set of 7 interactive concept levels, each teaching one Rust concept by having the user build one piece of a real Solana subscription payment contract. By the final level, the user has a working mini Anchor program they built themselves.

This is not a lesson. It is not a drill. It is a game where the win condition is a compiling contract.

---

## Design References

- Visual style: `game/rust-flashcards-visual-design.md` — all color tokens, typography, card component, and spacing from that document apply here
- Layout inspiration: sqlnoir.com/cases/001-The-Vanishing-Briefcase — left context panel + right working area
- Vocabulary source: `lessons/solana/rust-for-solana/VOCABULARY.md`
- Contract source: Ackee School `lessons/solana/ackee-school/lesson-2-rust-101/` and `lesson-5-dev-debug/`

---

## Level Map

| Level | Concept | Gradient | What you build |
|---|---|---|---|
| 1 | Data Types + Functions | `--grad-blue` | Define subscription types (`u64`, `bool`, `Pubkey`). Write `is_payment_valid()`. |
| 2 | Modules | `--grad-grey` | Move the payment function into `payments.rs`. Call it from main with `payments::`. |
| 3 | Module System | `--grad-lime` | Wire 3 modules using `use`, `pub use`, and `crate::`. Clean the import paths. |
| 4 | Ownership | `--grad-purple` | Pass the subscriber account to two functions. Fix the move error with `&`. |
| 5 | Mutable Borrowing | `--grad-violet` | Update `last_payment_at` inside a function. Resolve the borrow conflict. |
| 6 | Reading Errors | `--grad-pink` | Given a broken contract snippet and its compiler error, find and fix the bug. |
| 7 | (stretch) | `--grad-gold` | TBD — Anchor account types intro. Only built once levels 1–6 are complete. |

Scope for first build: Levels 1–6.

---

## Level Page Anatomy

Each level is one HTML page. Layout is two-column, matching the SQLnoir pattern with the flashcard design skin.

```
┌────────────────────────────────────────────────────────────┐
│  Level 1 — STORE THE MONEY              [blue gradient]    │
│  Concepts: Data Types · Functions                          │
└────────────────────────────────────────────────────────────┘

Left panel (40%)                  Right panel (60%)
──────────────────                ────────────────────────────
The story:                        [Starter code block]
"A subscriber wants to            [Open in Rust Playground →]
pay. The contract needs
to store the amount,              [Hint — collapsed by default]
whether they're active,
and their wallet address.         [What "done" looks like]
Your job: pick the right
types and write the
validation function."

Cheat sheet:
┌───────┐ ┌───────┐ ┌───────┐
│  u64  │ │ bool  │ │  fn   │
└───────┘ └───────┘ └───────┘
(tap to flip — shows definition)
```

### Left Panel

- Story context — 3–5 sentences explaining what you're building and why. Plain English, 10th grade. No Rust jargon without definition.
- Cheat sheet — 3–6 mini flashcards showing only the terms needed for this level. These are the same card component from the flashcard deck (same clip shape, same gradient, same flip mechanic). Terms pulled from `VOCABULARY.md`.

### Right Panel

- Starter code — a Rust snippet with blanks or broken pieces. Not a complete example — just enough to start.
- "Open in Rust Playground" link — pre-filled URL so the user can run and edit the code immediately.
- Hint — collapsed by default. Reveals one sentence pointing in the right direction. Does not give the answer.
- Win condition — one sentence describing what correct output or compiling code looks like.

### Level Header

Uses the flashcard card component shape as the header banner — same clip-path, same gradient for the concept category, term label in bottom-left, level number in top-left tab. This matches the flashcard visual language exactly.

---

## Visual Design

All tokens come from `game/rust-flashcards-visual-design.md`. Do not invent new styles.

| Element | Spec |
|---|---|
| Page background | `--color-page-bg` (`#F1EFEA`) |
| Font | `--font-ui` (Space Grotesk, Satoshi, Inter fallback) |
| Level header gradient | Gradient assigned to concept category (see level map above) |
| Card component | Exact flashcard component — same dimensions, same clip-path, same flip |
| Code block | Monospace, dark background, readable contrast |
| Left/right split | 40/60 on desktop, stacked on mobile |

---

## Code Checking

| Levels | Method |
|---|---|
| 1–6 (pure Rust) | Rust Playground — play.rust-lang.org. Pre-filled via URL. User edits and hits Run. |
| Level 7+ (Anchor) | Solana Playground — beta.solpg.io. Introduced when Anchor concepts begin. |

Each level page links directly to a pre-filled Playground URL. The starter code is encoded in the URL so the user does not need to copy-paste.

---

## Vocabulary / Cheat Sheet

Source: `lessons/solana/rust-for-solana/VOCABULARY.md`

Each level defines which terms appear in its cheat sheet. Terms are pulled from the relevant lesson section. The user does not need to memorize anything before starting — the terms are right there on the page.

| Level | Cheat sheet terms |
|---|---|
| 1 | `u64`, `bool`, `&str`, `fn`, `->`, return type |
| 2 | `mod`, `pub fn`, `::`, file-backed module |
| 3 | `use`, `crate::`, `pub use`, nested path |
| 4 | Owner, Move, Borrow `&T`, Scope, Drop |
| 5 | Mutable borrow `&mut T`, borrowing rules |
| 6 | No cheat sheet — reading the error IS the challenge |

---

## Where It Lives

This is one page (`/levels`) inside the My Rust Journey site.
Site spec: `docs/superpowers/specs/2026-06-10-my-rust-journey-site-design.md`

The game levels live at `/levels` on their own standalone website — separate from buddy-tech and rust-journey docs. The site also hosts `/flashcards` and a home page with both product cards.

**For now (building):** HTML files in `game/` folder inside buddy-tech repo.
**When ready:** Move to the My Rust Journey site repo and deploy via GitHub Pages or Netlify.

File naming: `game/level-01-data-types-functions.html` through `game/level-06-reading-errors.html`

---

## Screens

### Screen 1 — Level Select

The entry point. Shows all 6 levels as cards on the warm grey canvas. Same grid layout as the flashcard deck (3 columns desktop, 2 tablet, 1 mobile).

Each level card uses the flashcard card component: gradient panel, clip-path, level number in the top-left tab (where `Rust` sits on a flashcard), concept name in the footer strip (where `ZEUS` sits). No stats, no marketing copy.

```
Warm grey canvas (#F1EFEA)

         Rust Game Levels

┌────────────┐  ┌────────────┐  ┌────────────┐
│ 01         │  │ 02         │  │ 03         │
│╲           │  │╲  ░░░░░░  │  │╲  ░░░░░░  │
│            │  │            │  │            │
│    icon    │  │    🔒      │  │    🔒      │
│            │  │            │  │            │
│        ╱   │  │        ╱   │  │        ╱   │
├───────╱────┤  ├───────╱────┤  ├───────╱────┤
│ DATA TYPES │  │ MODULES    │  │ MOD SYSTEM │
└────────────┘  └────────────┘  └────────────┘
  [available]     [locked]        [locked]
```

Level card states:

| State | Visual |
|---|---|
| Available | Full gradient, concept name, icon — clickable |
| Completed | Full gradient + checkmark badge top-right corner |
| Locked | Greyed out (`--grad-grey`), lock icon in panel — not clickable |

Navigation rule: Level 1 is always available. Each level unlocks when the user marks the previous one complete. No automated checking — user self-reports via "Mark as done" button on the level page.

---

### Screen 2 — Level Page

Two-column layout on desktop. Single column on mobile.

```
Desktop (≥768px):

┌──────────────────────────────────────────────────────┐
│  01  DATA TYPES + FUNCTIONS           [blue gradient] │
│      Concepts: u64 · bool · fn · ->                  │
└──────────────────────────────────────────────────────┘

Left panel (40%)              Right panel (60%)
──────────────────            ──────────────────────────
STORY                         CODE
"A subscriber wants to        ┌──────────────────────┐
pay. The contract needs       │ fn is_payment_valid( │
to store the amount..."       │   amount: __,        │
                              │   price: __,         │
CHEAT SHEET                   │ ) -> __ {            │
┌─────┐ ┌─────┐ ┌─────┐       │   amount __ price    │
│ u64 │ │ fn  │ │bool │       │ }                    │
└─────┘ └─────┘ └─────┘       └──────────────────────┘

                              [Open in Rust Playground →]

                              [+ Hint]

                              DONE WHEN
                              "Function returns true
                              when amount >= price,
                              false otherwise."

                              [Mark as done →]
```

Mobile stacking order (top to bottom):
1. Level header (full width gradient banner)
2. Story context
3. Cheat sheet cards (2-column grid, same mini card component)
4. Code block
5. Open in Rust Playground link
6. Hint (collapsed accordion)
7. Done when (win condition)
8. Mark as done button

---

## Interaction States

### Level Card (Select Screen)

| State | Trigger | Visual change |
|---|---|---|
| Default available | Page load | Full gradient, icon, concept name |
| Hover | Mouse over | Lift `2px`, shadow deepens (`150ms ease-out`) — same as flashcard hover |
| Completed | User clicks "Mark as done" on level page | Checkmark badge appears top-right, gradient stays full |
| Locked | Previous level not completed | `--grad-grey`, lock icon, cursor `not-allowed` |

### Mini Flashcard (Cheat Sheet)

Same flip mechanic as the flashcard deck — no new behavior.

| State | Trigger | Visual change |
|---|---|---|
| Front | Default | Gradient panel, icon, term name |
| Flipped | Click or tap | 420ms flip, pale back gradient, shows meaning + when + example |
| Focus | Keyboard Tab | `2px` focus ring using `--color-focus` |

### Hint Button

| State | Trigger | Visual change |
|---|---|---|
| Collapsed | Default | `[+ Hint]` label, no content visible |
| Expanded | Click | Rotates `+` to `−`, hint text slides in (`200ms ease-out`) |
| Expanded again | Click | Collapses back |

Only one hint per level. The hint gives direction, not the answer.

### Playground Link

Opens in a new tab. No state change on the page itself. Link stays visible after click — user returns to the level page to continue.

### Mark as Done Button

| State | Trigger | Visual change |
|---|---|---|
| Default | Page load | Primary button, full color |
| Clicked | User click | Button label changes to "Level Complete ✓", button disables, level card on select screen updates to completed state |

Completion is stored in Supabase — same database already used by this project. Progress survives browser clears and works across devices. This matters because the whole point of the game is building toward something across 6 levels — losing progress breaks that.

Schema (one table):

```
game_progress
  id          uuid primary key
  level       int          -- 1–6
  completed   boolean      -- true once marked done
  completed_at timestamptz -- when they finished it
```

No login required in V1 — use a single fixed user row tied to the project. Add auth later if this becomes multi-user.

---

## What This Is Not

- Not a replacement for the lesson pages — those still exist for reference
- Not a full Anchor program — the contract grows level by level but is not deployable until later levels (stretch)
- Not a quiz — the user writes real code, not multiple choice
- Not a tutorial with step-by-step instructions — the cheat sheet gives vocabulary, the story gives context, the user figures out the code

---

## Success Criteria

- User can complete Level 1 without opening a lesson page
- The mini flashcard cheat sheet answers vocabulary questions inline
- The Rust Playground link opens with starter code already in the editor
- Completing all 6 levels gives the user a subscription contract scaffold they wrote themselves
- The visual design is indistinguishable from the flashcard deck — same product family
