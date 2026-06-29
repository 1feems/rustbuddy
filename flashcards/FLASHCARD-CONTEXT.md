# Flashcard Context

> Read this before touching any flashcard file.

Last updated: 2026-06-29

---

## What This Is

A set of Rust flashcard decks. One term per card. Tap to flip and see the definition. One deck per exercise topic, so the flashcards reinforce whatever the learner just practiced in the exercise page.

---

## Design

Cards use full-gradient fronts and pale-gradient backs. No white shell, no clip paths. See `_design/rust-flashcards-visual-design.md` for the full spec.

**Card layout — front:**
- Card number + "Tap to flip" at top
- Term centered (monospace for keywords)
- Deck category label at bottom

**Card layout — back:**
- "Definition" label at top
- Plain English definition
- Code example
- Term name at bottom

**Card dimensions:** `240px wide, 340px tall`
**Card shell:** `#1E1E1A` dark
**Flip:** CSS 3D transform on click, 420ms ease

---

## The 15 Decks

One deck per exercise topic. Colors cycle Lime, Orange, Cyan, Pink, Gold and repeat.

| # | Deck | Exercise page | Color | Status |
|---|---|---|---|---|
| 01 | Variables | `exercises/variables.html` | Lime | Built |
| 02 | Numbers | `exercises/numbers.html` | Orange | Not built |
| 03 | Chars & Bools | `exercises/chars-bools.html` | Cyan | Not built |
| 04 | Statements & Expressions | `exercises/statements-expressions.html` | Pink | Not built |
| 05 | Functions | `exercises/functions.html` | Gold | Not built |
| 06 | Ownership | `exercises/ownership.html` | Lime | Not built |
| 07 | Borrowing | `exercises/borrowing.html` | Orange | Not built |
| 08 | String vs &str | `exercises/string-vs-str.html` | Cyan | Not built |
| 09 | Slices | `exercises/slices.html` | Pink | Not built |
| 10 | Tuples | `exercises/tuples.html` | Gold | Not built |
| 11 | Structs | `exercises/structs.html` | Lime | Not built |
| 12 | Enums | `exercises/enums.html` | Orange | Not built |
| 13 | Option | `exercises/option.html` | Cyan | Not built |
| 14 | Flow Control | `exercises/flow-control.html` | Pink | Not built |
| 15 | Anchor + Solana | Contract capstone | Gold | Not built |

---

## Card Back Format

Every card back uses three sections in this order:

**What it is** — plain English definition of the term.
**When to use it** — the situation where you would reach for this term.
**Example:** `code here` — one short inline example.

Do not use "Definition" as the label. Use "What it is" and "When to use it."
Both fields come from VOCABULARY.md columns: "What it means" and "When it's used."

---

## Content Source

Terms come from `lessons/solana/rust-for-solana/VOCABULARY.md`. 10 to 12 terms per deck.

`CARD-INVENTORY.md` will map which terms from VOCABULARY.md go into each deck. This file has not been created yet. Build it before building any deck beyond Variables.

---

## Build Order

Build decks in the same order as exercise pages. Do not build a deck for a topic that does not have an exercise page yet.

Template: `flashcards/variables.html` — copy it for each new deck, change the gradient class, card count, and card content only.

---

## Files

| File | Purpose |
|---|---|
| `FLASHCARD-CONTEXT.md` | This file |
| `index.html` | Flashcard landing page — 15 deck cards with Bauhaus icons |
| `variables.html` | Variables deck — canonical template for all decks |
| `CARD-INVENTORY.md` | Maps VOCABULARY.md terms to each deck (not yet created) |
| `_design/rust-flashcards-visual-design.md` | Full card design spec |
