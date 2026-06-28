# Rust Exercise Page — Design Spec

Date: 2026-06-24
Status: Approved — ready for Codex build

---

## What This Is

An interactive exercise page for each Rust topic (Borrowing, Ownership, Functions, etc.). One page per topic. Users work through exercises, try code in an embedded Rust Playground, check answers, and reference a terms cheat sheet — all in one place.

Inspired by the SQLNoir case format: sqlnoir.com/cases/001-The-Vanishing-Briefcase

---

## Page Structure

### Header

- Topic name (e.g. "Borrowing")
- Back link → My Rust Journey index

### Top Navigation — 3 tabs

```
[ Exercises ]  [ Answers ]  [ Terms to Know ]
```

Only one tab is active at a time. Default: Exercises.

---

## Tab 1 — Exercises

### Sub-navigation

Numbered exercise buttons across the top of the tab:

```
Ex 1  ·  Ex 2  ·  Ex 3  ·  Ex 4
```

Clicking a number loads that exercise. Active exercise is highlighted.

### Layout — Side by Side

Two panels, always visible together:

```
┌──────────────────────────┬───────────────────────────┐
│  Ex 1 · Ex 2 · Ex 3 · Ex 4                           │
├──────────────────────────┼───────────────────────────┤
│                          │                           │
│  LEFT PANEL              │  RIGHT PANEL              │
│  Exercise text           │  Rust Playground iframe   │
│                          │                           │
│  - Scenario              │  Pre-loaded with this     │
│  - Concept explainer     │  exercise's starter code  │
│  - Broken code to read   │                           │
│  - Task instruction      │  User edits and runs      │
│                          │  code here                │
│                          │                           │
└──────────────────────────┴───────────────────────────┘
```

- Left panel: exercise content from the `.md` exercise files
- Right panel: Rust Playground iframe, pre-loaded with the starter code for the active exercise
- When user clicks Ex 2, both panels update — new exercise text on left, new code loaded in iframe on right
- No stacked/toggle option — side by side only

### Rust Playground iframe

URL format:
```
https://play.rust-lang.org/?code=URL_ENCODED_STARTER_CODE
```

Or for cleaner URLs, store starter code as GitHub Gists and use:
```
https://play.rust-lang.org/?gist=GIST_ID
```

The iframe updates when the user switches exercises via the sub-nav.

---

## Tab 2 — Answers

Shows the answer for whichever exercise is currently selected in the sub-nav.

```
┌──────────────────────────────────────────────────────┐
│  Ex 1 · Ex 2 · Ex 3 · Ex 4                          │
├──────────────────────────────────────────────────────┤
│                                                      │
│  Answer — Exercise 2                                 │
│                                                      │
│  [corrected code block]                              │
│                                                      │
│  Why: one-line explanation of what was wrong         │
│  and what the fix does                               │
│                                                      │
└──────────────────────────────────────────────────────┘
```

- Same sub-nav as Exercises tab — switching exercises here also updates the answer shown
- User must actively click this tab to see the answer — keeps it out of the way during practice

---

## Tab 3 — Terms to Know

A cheat sheet of the key vocabulary terms for this topic. Pulled from `VOCABULARY.md` — the relevant deck for this topic.

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│  Terms to Know — Borrowing                           │
│                                                      │
│  & ............. borrow without taking ownership     │
│  &mut .......... borrow and be allowed to modify     │
│  Borrowing rule 1 .. one mutable OR many immutable   │
│  Borrowing rule 2 .. references must always be valid │
│  Dangling reference . pointer to freed memory        │
│  ...                                                 │
│                                                      │
└──────────────────────────────────────────────────────┘
```

- No sub-nav needed — one cheat sheet per topic, always the same regardless of which exercise is selected
- Terms pulled from the matching deck in `VOCABULARY.md`

---

## Content Source

Exercise text comes from the built `.md` files in `lessons/solana/rust-for-solana/practice/exercises/`.

Each topic page maps to one exercise file:

| Page | Exercise file | Vocab deck |
|---|---|---|
| Borrowing | `03-borrowing.md` | Deck 4 |
| Ownership | `02-ownership.md` | Deck 3 |
| Functions | `01-functions.md` | Deck 2 |
| Variables | `01-variables-v2.md` | Deck 1 |
| String vs &str | `04-string-vs-str.md` | Deck 4 |
| Slices | `05-slices.md` | Deck 4 |
| Tuples | `06-tuples.md` | Deck 1 |
| Structs | `07-structs.md` | Deck 6 |
| Enums | `08-enums.md` | Deck 6 |
| Option | `09-option.md` | Deck 6 |
| Flow Control | `10-flow-control.md` | Deck 1 |

---

## Design Rules

- Follows `DESIGN_SYSTEM.md` if it exists — check before inventing styles
- Dark background, same feel as game levels already built
- Tab active state must be visually clear
- Sub-nav active exercise must be visually clear
- Left and right panels equal width (50/50) on desktop
- On mobile: stack vertically (exercise text on top, iframe below)
- iframe height: fill the available panel height — user should not need to scroll to see the playground

---

## What This Is NOT

- Not the flashcard deck — that is a separate product (`game/` folder)
- Not the game levels — those are in `game/level-0X-*.html`
- Exercise pages live in their own section of the My Rust Journey site
