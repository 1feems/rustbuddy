# Rust Bud — Build Plan

Last updated: 2026-06-26

Simple ordered list of what to build. Work top to bottom.
Do not skip phases — each phase builds on the last.

---

## Phase 1 — Exercise Pages

The core product. One HTML page per topic. SQLNoir-style layout.
Design: `game/DESIGN_SYSTEM.md` · Wireframe: `game/EXERCISE-WIREFRAME.md`

| Step | File | What | Status |
|---|---|---|---|
| 1 | `game/KEY-TERMS.md` | Aggregate terms doc — all 11 topics | ✅ Done |
| 2 | `game/variables.html` | Variables exercise page — canonical template | ✅ Done |
| 3 | `game/functions.html` | Functions exercise page | 🔲 Next |
| 4 | `game/index.html` | Rust: Exercises topic card grid (entry point) | 🔲 Next |
| 5 | `game/ownership.html` | Ownership exercise page | 🔲 |
| 6 | `game/borrowing.html` | Borrowing exercise page | 🔲 |
| 7 | `game/string-vs-str.html` | String vs &str exercise page | 🔲 |
| 8 | `game/slices.html` | Slices exercise page | 🔲 |
| 9 | `game/tuples.html` | Tuples exercise page | 🔲 |
| 10 | `game/structs.html` | Structs exercise page | 🔲 |
| 11 | `game/enums.html` | Enums exercise page | 🔲 |
| 12 | `game/option.html` | Option exercise page | 🔲 |
| 13 | `game/flow-control.html` | Flow Control exercise page | 🔲 |

**Template:** `variables.html` is the canonical template. For each new topic: copy it, update the title, swap the `exercises` JS array (from `game/exercises/` .md file), swap the Terms table (from `game/KEY-TERMS.md`). Do not change layout or CSS.

**Exercise 5 rule:** Every topic's Exercise 5 is a contract build exercise. Each one adds to the same Solana subscription contract progressively. See `EXERCISE-WIREFRAME.md` for the full through-line.

---

## Phase 2 — GitHub + Vercel

Do this next session — before building functions.html or index.html.
After setup, all pages are reviewed at a live Vercel URL. No more local file references needed.

**variables.html local reference (until Vercel is live):**
`file:///Users/feems/Desktop/buddy%20tech/game/variables.html`

| Step | What | Status |
|---|---|---|
| 1 | Create GitHub repo `rust-bud` | 🔲 Next session |
| 2 | Push `game/` folder as repo root | 🔲 |
| 3 | Connect Vercel to repo — zero config, static HTML | 🔲 |
| 4 | Confirm deploy works on live URL | 🔲 |

---

## Phase 3 — Game Levels

7 levels, each teaching one Rust concept by building a piece of a Solana contract.
Spec: `game/GAME-LEVELS-DESIGN.md`

| Step | File | Concept | Status |
|---|---|---|---|
| 1 | `level-01-data-types-functions.html` | Data types + Functions | ✅ Built (old style — needs reskin) |
| 2 | `level-02-modules.html` | Modules | 🔲 |
| 3 | `level-03-module-system.html` | Module system | 🔲 |
| 4 | `level-04-ownership.html` | Ownership | 🔲 |
| 5 | `level-05-mutable-borrow.html` | Mutable borrowing | 🔲 |
| 6 | `level-06-reading-errors.html` | Reading compiler errors | 🔲 |

---

## Phase 4 — Flashcard Deck

Do not start until vocabulary is complete.
Context: `game/FLASHCARD-CONTEXT.md`

| Step | What | Status |
|---|---|---|
| 1 | Fill vocab gaps — Decks 1–4 | 🔲 Waiting |
| 2 | Assign icons to every term | 🔲 |
| 3 | Build full HTML deck | 🔲 |

---

## Duplication Rule

After `variables.html` is approved, every other exercise page is a duplicate:
1. Copy `variables.html` → rename to topic (e.g. `functions.html`)
2. Replace the `exercises` JS array with content from the matching `game/exercises/` .md file
3. Replace the Terms table with the matching section from `game/KEY-TERMS.md`
4. Update the page title and header (`Rust: Functions`, etc.)

Do not reinvent the layout — the template is already done.
