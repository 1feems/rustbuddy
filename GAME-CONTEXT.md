# Rust Buddy — Game Context

> Read this at the start of every session before touching anything in `game/`.
> Then read `GAME-HANDOFF.md` for current session state and what to build next.

Last updated: 2026-07-16

---

## What Is Rust Buddy

Rust Buddy is a free, static HTML learning platform that teaches Rust to people building on Solana. It lives in `game/` and deploys to rustbuddy.vercel.app via Vercel (GitHub repo: `1feems/rustbuddy`).

It is a product of Buddy Tech — an agent-orchestrated content studio. Buddy Tech builds it. Learners use it.

---

## The Learner

**Who:** A non-technical founder learning Rust for the first time. No programming background assumed.

**Goal:** Build and deploy a Solana subscription payment contract where an agent can receive and distribute funds.

**Need:** Every concept must connect to that contract. Abstract Rust mechanics without a real-world purpose do not land. 10th grade plain English throughout — define every term before using it.

---

## The Four Products

| Product | Subfolder | Purpose |
|---|---|---|
| Exercise Pages | `exercises/` | Teach one Rust concept at a time through constrained practice |
| Flashcard Decks | `flashcards/` | Drill key terms and definitions per topic |
| Resources | `resources/` | Concise reference pages for looking things up |
| Game Levels | `levels/` | Interactive levels — build a real Solana contract piece by piece |

---

## Product Objectives

### Exercises

Teach one Rust concept per page through 6 graded exercises. The learner fixes broken code in the Rust Playground, reads concept explainers, and checks answers.

- Exercises 1 to 5: pure Rust, generic variable names
- Exercise 6: apply the concept inside a simplified Solana payment contract (wallet, plan, lamports, treasury)
- One new concept per exercise. Never stack two concepts in one exercise.
- Every term defined before it appears in code.
- Content sourced from the FreeCodeCamp Rust transcript — no invented concepts.

**Learner outcome:** After completing a topic's exercises, the learner can use that concept confidently in Rust and understands how it applies to a payment contract.

### Flashcards

One deck per topic. Each card has a term on the front and a definition, usage note, and code example on the back. Flip mechanic. 8 to 16 cards per deck.

**Learner outcome:** The learner can recall the key terms for a topic without looking them up.

### Resources

Concise reference pages — syntax cheat sheets, vocabulary pages, concept summaries. Not lessons. Not exercises. Things to reach for when you forget something.

**Learner outcome:** Quick answers without leaving the platform.

### Game Levels

Interactive levels where the learner builds one piece of a Solana subscription payment contract per level. By the final level, the learner has a compiling mini Anchor program they wrote themselves.

**Learner outcome:** The learner has written and understood a real working contract, not just practiced isolated syntax.

---

## Read Order Every Session

1. **This file** — platform context, learner profile, product objectives
2. `GAME-HANDOFF.md` — session state: what is built, what is next, decisions made
3. `DOC-INVENTORY.md` — index of all docs, what each is for, what is missing
4. `_docs/AGENT-ARCHITECTURE.md` — agent routing and pipeline
5. `_design/DESIGN_SYSTEM_updated.md` — all UI tokens. Never invent styles outside this file.
6. The relevant product doc for what you are building (see `DOC-INVENTORY.md`)

---

## Folder Map

```
game/
├── GAME-CONTEXT.md              ← this file — read first every session
├── GAME-HANDOFF.md              ← session state: what is built, what is next
├── DOC-INVENTORY.md             ← index of all docs in this platform
│
├── _docs/                       ← all reference and design docs
│   ├── AGENT-ARCHITECTURE.md    ← pipeline map, agent routing
│   ├── COPY.md                  �� source of truth for all page-level copy
│   ├── STYLE-GUIDE.md           ← voice, tone, writing rules
│   ├── EXERCISE-PAGE-DESIGN.md  ← exercise page layout spec
│   ├── KEY-TERMS.md             ← terms for the Terms to Know tab
│   ├── GAME-LEVELS-DESIGN.md    ← game levels design spec
│   ├── ASSET-LIST.md            ← page inventory (note: needs updating)
│   └── agent-cards/             ← agent cards for all Rust Buddy agents
│       ├── rust-game-agent.md
│       ├── practice-exercise-agent.md
│       └── flashcard-agent.md
│
├── _design/                     ← design files
│   ├── DESIGN_SYSTEM_updated.md ← master design tokens — all agents read this
│   └── mobile.css               ← mobile styles
│
├── _refs/                       ← reference images and prototypes (not pushed to GitHub)
│
├── exercises/                   ← exercise content and built HTML pages
│   ├── md/                      ← source .md files for each exercise page (01 to 14)
│   └── html/                    ← built HTML exercise pages
│       └── variables.html       ← canonical template — copy for all new exercise pages
│
├── flashcards/                  ← flashcard decks
│   └── values.html              ← canonical template — copy for all new flashcard decks
│
├── levels/                      ← game level HTML pages
│
├── resources/                   ← resource pages
│
├── index.html                   ��� home page
│
└── archive/                     ← old files, do not use
```

---

## Design System — Key Tokens

All styling lives in `_design/DESIGN_SYSTEM_updated.md`. Never invent values outside it.

| Token | Value |
|---|---|
| Page background | `#FFFFFF` |
| Dark surface | `#1E1E1A` |
| Primary accent | `#FF7657` orange |
| Secondary accent | `#C5E94E` lime |
| Ink | `#171714` |
| Muted text | `#77766F` |
| Font | Inter |
| Card radius | 20px |

**Flashcard deck colors (5, locked) — cycle in this order:**

| # | Color | Front gradient |
|---|---|---|
| 1 | Lime | `#A8D92F, #C5E94E, #EFF8A7` |
| 2 | Orange | `#FF7657, #F97316, #E85D04` |
| 3 | Cyan | `#14A6C8, #35BFDA, #A8EDF0` |
| 4 | Pink | `#DE4775, #EA6689, #F6A56F` |
| 5 | Gold | `#D99700, #EDB51F, #FFDF86` |
