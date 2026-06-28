# Rust Bud — Game Context

> Read this at the start of every session before touching anything in `game/`.
> For full session state, read `GAME-HANDOFF.md`. For agent routing, read `AGENT-ARCHITECTURE.md`.

Last updated: 2026-06-28

---

## What Is Rust Bud

**Rust Bud** is a static HTML web platform for learning Rust to build Solana smart contracts. It lives in `game/` and will be its own GitHub repo (`rust-bud`) deployed on Vercel.

Four products:

| Product | Subfolder | Status |
|---|---|---|
| Exercise Pages | `game/exercises/` | In progress — `variables.html` is canonical template |
| Game Levels | `game/levels/` | Level 1 built (needs reskin to DESIGN_SYSTEM) |
| Flashcard Decks | `game/flashcards/` | Design locked — not yet built |
| Study Guides | `game/study-guides/` | Placeholder — not yet built |

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
├── BUILD-PLAN.md                ← ordered task checklist
│
├── _design/                     ← all design files
│   ├── DESIGN_SYSTEM.md         ← master design — all agents read this first
│   ├── rust-flashcards-visual-design.md  ← flashcard-only design (on top of master)
│   └── assets/                  ← design reference images
│       ├── landing page.png     ← landing page layout reference (hero + card blocks)
│       ├── ChatGPT Image Jun 10, 2026, 04_27_38 PM.png  ← card silhouette reference
│       └── icons.jpg            ← Bauhaus geometric icon style
│
├── _docs/                       ← spec and context docs
│   ├── EXERCISE-PAGE-DESIGN.md
│   ├── EXERCISE-WIREFRAME.md
│   ├── GAME-LEVELS-DESIGN.md
│   ├── Creative-Cards-DESIGN.md
│   ├── KEY-TERMS.md
│   └── ASSET-LIST.md
│
├── _refs/                       ← reference files
│   ├── favicons.png
│   ├── Rust-Playground-06-26-2026_04_49_PM.png
│   ├── error-Rust-Variables-Rust-Bud-06-26-2026_04_54_PM.png
│   ├── UI Design Doc Guide.pdf
│   └── prototypes/
│       ├── flashcard-game-colors.html   ← color system proof (all 5 deck colors)
│       ├── rust-flashcards-card-proof.html  ← flip mechanic proof
│       └── rust-flashcards-card-grid.html   ← card grid layout proof
│
├── exercises/                   ← exercise source .md files + built HTML pages
│   ├── 01-variables.md through 14-flow-control.md
│   ├── variables.html           ← canonical template — use for all exercise pages
│   ├── numbers.html             ← draft
│   ├── chars-bools.html         ← draft
│   └── statements-expressions.html  ← draft
│
├── flashcards/                  ← flashcard product
│   ├── FLASHCARD-CONTEXT.md     ← deck structure, vocabulary source, counts per topic
│   └── CARD-INVENTORY.md        ← (not yet built) maps VOCABULARY.md terms to each deck
│
├── levels/                      ← game level HTML pages
│   └── level-01-data-types-functions.html  ← built, needs reskin
│
├── study-guides/                ← placeholder — not yet built
│
└── archive/                     ← old files, do not use
```

---

## Design System — Key Tokens

All styling lives in `_design/DESIGN_SYSTEM.md`. Never invent values outside it.

| Token | Value |
|---|---|
| Page background | `#FFFFFF` |
| Dark surface / cards | `#1E1E1A` |
| Primary accent | `#FF7657` orange |
| Secondary accent | `#DFFF65` lime |
| Text | `#171714` |
| Font | Inter |
| Card radius | 20px |

**Flashcard deck colors (5, locked):**

| Color | Front gradient |
|---|---|
| Orange | `#FF7657 → #F97316 → #E85D04` |
| Cyan | `#14A6C8 → #35BFDA → #6BD5E6 → #A8EDF0` |
| Pink | `#DE4775 → #EA6689 → #F0868A → #F6A56F` |
| Lime | `#A8D92F → #C5E94E → #DAF06F → #EFF8A7` |
| Gold | `#D99700 → #EDB51F → #F3C84F → #FFDF86` |

Back panel = pale gradient of front color. Card shell = `#1E1E1A` dark.
