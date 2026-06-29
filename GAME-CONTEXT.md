# Rust Bud — Game Context

> Read this at the start of every session before touching anything in `game/`.
> For full session state and what to build next, read `GAME-HANDOFF.md`.

Last updated: 2026-06-29

---

## What Is Rust Bud

**Rust Buddy** is a static HTML web platform for learning Rust to build Solana smart contracts. It lives in `game/` and is deployed at https://github.com/1feems/rust-bud via Vercel.

Four products:

| Product | Subfolder | Status |
|---|---|---|
| Exercise Pages | `game/exercises/` | In progress — Variables built, 3 drafted |
| Flashcard Decks | `game/flashcards/` | In progress — landing + Variables deck built |
| Resources | `game/resources/` | Not yet built |
| Game Levels | `game/levels/` | Level 1 built (needs reskin) |

---

## Read Order Every Session

1. **This file** — you're reading it
2. `GAME-HANDOFF.md` — session state: what's built, what's next, decisions made
3. `AGENT-ARCHITECTURE.md` — platform map, source assets, agent routing, starter prompts
4. `_design/DESIGN_SYSTEM.md` — all UI tokens. Never invent styles outside this file.
5. The relevant product doc for what you're building (see `AGENT-ARCHITECTURE.md` section 4)

---

## Folder Map

```
game/
├── GAME-CONTEXT.md              ← this file — read first
├── GAME-HANDOFF.md              ← session state: what's built, what's next
├── AGENT-ARCHITECTURE.md        ← platform map, source assets, agent routing
│
├── _design/                     ← all design files
│   ├── DESIGN_SYSTEM.md         ← master design tokens — all agents read this first
│   ├── rust-flashcards-visual-design.md  ← flashcard card design spec
│   └── assets/                  ← design reference images
│       ├── rust.png             ← Ferris crab logo
│       ├── landing page.png     ← landing page layout reference
│       ├── icons.jpg            ← Bauhaus geometric icon style reference
│       └── ChatGPT Image Jun 10, 2026, 04_27_38 PM.png
│
├── _docs/                       ← internal spec and context docs (not pushed to GitHub)
│
├── _refs/                       ← reference files and prototypes (not pushed to GitHub)
│
├── exercises/                   ← exercise source .md files + built HTML pages
│   ├── 01-variables.md          ← source content for variables.html
│   ├── 02-numbers.md through 14-flow-control.md
│   ├── index.html               ← exercise landing page — 4 topic cards
│   ├── variables.html           ← canonical template — copy for all exercise pages
│   ├── numbers.html             ← draft
│   ├── chars-bools.html         ← draft
│   └── statements-expressions.html  ← draft
│
├── flashcards/                  ← flashcard product
│   ├── FLASHCARD-CONTEXT.md     ← deck structure, design spec, build status
│   ├── index.html               ← flashcard landing page — 15 deck cards
│   └── variables.html           ← Variables deck — 11 cards, lime gradient, flip mechanic
│
├── levels/                      ← game level HTML pages
│   └── level-01-data-types-functions.html  ← built, needs reskin
│
├── resources/                   ← study guide landing (not yet built)
│
├── index.html                   ← home page — Ferris logo, hero, 3 product cards
│
└── archive/                     ← old files, do not use
```

---

## Design System — Key Tokens

All styling lives in `_design/DESIGN_SYSTEM.md`. Never invent values outside it.

| Token | Value |
|---|---|
| Page background | `#FFFFFF` |
| Dark surface | `#1E1E1A` |
| Primary accent | `#FF7657` orange |
| Secondary accent | `#DFFF65` lime |
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

Back panel = pale gradient version of front color.
Page background = `#FFFFFF`. Cards pop against white.
Full card design spec: `_design/rust-flashcards-visual-design.md`
