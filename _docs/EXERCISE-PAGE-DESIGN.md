# Rust Exercise Page — Design Spec

Date: 2026-06-29 (updated)
Status: Live — canonical template is `game/exercises/variables.html`

---

## What This Is

An interactive exercise page for each Rust topic (Borrowing, Ownership, Functions, etc.). One page per topic. Users work through exercises, try code in an embedded Rust Playground, check answers, and reference a terms cheat sheet — all in one place.

Inspired by the SQLNoir case format: sqlnoir.com/cases/001-The-Vanishing-Briefcase

---

## Page Structure

### Header

Two-part layout:
- **Left:** `Rust Buddy / Exercises / [Topic]` breadcrumb — site name, exercises link, current topic label
- **Right:** nav links — Exercises · Flashcards · Resources (uppercase, small)

### Top Navigation — 4 tabs

```
[ Overview ]  [ Exercises ]  [ Answers ]  [ Terms to Know ]
```

Only one tab is active at a time. Default: Exercises.

---

## Tab 0 — Overview

Shown first in the tab bar. Not the default active tab — Exercises is default.

Content layout:
```
Topic label (small caps, muted)
Headline (large, bold)
One-sentence description

──── divider ────

Quick Reference  (small caps label)
┌─────────────────────────────────────────┐
│  Concept         │  What it means       │
│  let x = 5       │  Declare a variable  │
│  ...             │  ...                 │
└─────────────────────────────────────────┘
```

- 2-column table: Concept / What it means (no third column)
- No em dashes in any cell — use commas or rephrase

---

## Tab 1 — Exercises

### Exercise count and structure — every page

Most exercise pages have **6 exercises**. Complex topics (Ownership, Borrowing, Structs) may have up to **8 exercises** when the concept requires more steps to reach the final build exercise.

| Exercise | Track | Context |
|---|---|---|
| 1 to (last-1) | Track A — pure Rust | Generic variable names: `x`, `y`, `result`, `s` |
| Last | Track B — blockchain/contract | Contract names: `wallet`, `amount`, `lamports`, `plan`, `treasury` |

The last exercise is always the **Build exercise** — a standalone challenge where the learner applies everything they practiced to write a piece of a payment contract. It does not have broken code to fix; it has a scaffold or blank canvas and a spec.

**Title format for the build exercise:**
- `Build: [Topic]` — e.g. `Build: Subscription Variables`, `Build: Borrowing in a Contract`
- Or `Contract Build: [Topic]` — e.g. `Contract Build: Annotate a Payment`

Do not exceed 8 exercises. Do not merge Track A and B into the same exercise.

---

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

### Left Panel Content Order

```
Exercise X of Y  (small kicker)
Exercise Title   (large)
Explainer text   (concept explanation, Solana context)
─── divider ───
YOUR TASK        (small caps label)
Task body:
  1. Scenario context sentence (what the contract/situation is)
  2. "Right now it fails because..." (own paragraph)
  3. Numbered steps — direct instructions, no "The code wants to:" bridge
Clear the Playground on the right and paste this code to begin.  (muted hint)
[dark code block — starter code]
Fix instruction  (bold sentence — what to change)
Expected Output  (monospace box)
```

**Task language rules:**
- Scenario sentence: describes the situation — "A payment contract tracks...", "A function adds..."
- No "The code below wants to..." or "The code wants to:" — code does not want things
- No em dashes in task text
- Steps are direct imperative instructions: "Store x as i32", "Remove the semicolon"

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

All answers listed in one full-width scrollable view. No sub-nav on this tab.

```
┌──────────────────────────────────────────────────────┐
│  Exercise 1 — Title                                  │
│  [corrected code block]                              │
│  WHY   one-line explanation                          │
├──────────────────────────────────────────────────────┤
│  Exercise 2 — Title                                  │
│  [corrected code block]                              │
│  WHY   one-line explanation                          │
└──────────────────────────────────────────────────────┘
```

- User must actively click this tab to see answers — keeps them out of the way during practice
- Answers build lazily — only rendered when user first opens the tab

---

## Tab 3 — Terms to Know

A 3-column table for the topic's key vocabulary.

```
┌──────────────┬───────────────────────────┬────────────────────────────┐
│  Term        │  What it means            │  When you use it           │
├──────────────┼───────────────────────────┼────────────────────────────┤
│  let         │  Creates a new variable   │  Every time you store a... │
│  mut         │  Allows a variable to...  │  When your program needs...│
└──────────────┴───────────────────────────┴────────────────────────────┘
```

- 3 columns: Term / What it means / When you use it
- No em dashes — use commas or rephrase
- No sub-nav needed — one table per topic, always the same
- Terms pulled from the matching section in `VOCABULARY.md` or `KEY-TERMS.md`

---

## Content Source

Exercise text comes from the built `.md` files in `game/exercises/`.

Each topic page maps to one exercise file:

| # | Page | Exercise file | Flashcard deck |
|---|---|---|---|
| 01 | Variables | `game/exercises/01-variables.md` | VALUES |
| 02 | Numbers | `game/exercises/02-numbers.md` | VALUES |
| 03 | Chars & Bools | `game/exercises/03-chars-bools.md` | TYPES |
| 04 | Statements & Expressions | `game/exercises/04-statements-expressions.md` | FLOW |
| 05 | Functions | `game/exercises/05-functions.md` | FUNCTIONS |
| 06 | Ownership | `game/exercises/06-ownership.md` | OWNERSHIP |
| 07 | Borrowing | `game/exercises/07-borrowing.md` | BORROWING |
| 08 | String vs &str | `game/exercises/08-string-vs-str.md` | STRINGS |
| 09 | Slices | `game/exercises/09-slices.md` | SLICES |
| 10 | Tuples | `game/exercises/10-tuples.md` | TUPLES |
| 11 | Structs | `game/exercises/11-structs.md` | STRUCTS |
| 12 | Enums | `game/exercises/12-enums.md` | ENUMS |
| 13 | Option | `game/exercises/13-option.md` | OPTION |
| 14 | Flow Control | `game/exercises/14-flow-control.md` | FLOW |

---

## Design Rules

- Canonical template: `game/exercises/variables.html` — copy this file for every new exercise page
- White background (`#FFFFFF`). Primary accent: `#FF7657` (orange). Border: `#171714`.
- Tab active state: orange background, white text
- Sub-nav active exercise: orange pill
- Left and right panels equal width (50/50) on desktop
- Playground hint above every starter code block: "Clear the Playground on the right and paste this code to begin." — muted, 12px
- No em dashes anywhere in content
- 10th grade plain English throughout

---

## What This Is NOT

- Not the flashcard deck — that is a separate product (`game/` folder)
- Not the game levels — those are in `game/level-0X-*.html`
- Exercise pages live in their own section of the My Rust Journey site
