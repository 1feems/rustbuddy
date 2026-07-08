# Rust Buddy — Game Handoff

> Read this every session before touching anything in `game/`.
> This is the game's source of truth. Root `HANDOFF.md` points here.

Last updated: 2026-07-08 (session 11)

---

## What This Is

**Rust Buddy** is the first product built on Buddy Tech — an agent-orchestrated technical communications studio. Rust Buddy is a Buddy Tech client: it has an asset brief (interactive exercises and flashcard decks), a content source (the Rust for Solana transcript from HerDAO Rust School), and a deployment target (rustbuddy.vercel.app).

The game agents (Rust Game Agent, Exercise Agent, Flashcard Agent) are fully self-contained in this repo. They do not depend on the Buddy Tech root pipeline to operate. Their agent cards, design docs, copy, and style guide all live under `game/`.

For the full picture of how Rust Buddy fits within Buddy Tech and the client model, read `SYSTEM-OVERVIEW.md` at the Buddy Tech root.

---

## Current State

All 13 exercise pages and all 13 flashcard decks are built and live at rustbuddy.vercel.app.

**Exercises** (all live): Variables, Symbols, Types, Functions, Ownership, Borrowing, Strings, Slices, Tuples, Structs, Enums, Option, Flow

**Flashcard Decks** (all live): Values, Symbols, Types, Functions, Ownership, Borrowing, Strings, Slices, Tuples, Structs, Enums, Option, Flow

---

## What's Next

### 1. V2 Flashcard Study Mode

Single card centered, flip on click, "Know it" / "Still learning" buttons, progress bar. All decks are done — this is ready to build.

### 2. Game Levels Reskin

`game/levels/` — old style, low priority.

---

## Docs Index

| File | Purpose |
|---|---|
| `_design/DESIGN_SYSTEM.md` | Full UI spec — dimensions, clip-paths, nav, landing hero |
| `_design/styles.css` | CSS custom properties — edit here to change any design value |
| `_design/DESIGN_TOKENS.md` | Token reference — what each token does and where it's used |
| `_docs/COPY.md` | All page-level copy — labels, titles, descriptions, deck colors, file refs |
| `_docs/STYLE-GUIDE.md` | Voice, tone, reading level, and copy rules for all game pages |
| `_docs/EXERCISE-PAGE-DESIGN.md` | Exercise page layout spec — tabs, 6-exercise pattern, content source paths |
| `_docs/GAME-LEVELS-DESIGN.md` | Game levels design |
| `flashcards/FLASHCARD-CONTEXT.md` | Flashcard structural context and build rules |
| `_docs/AGENT-ARCHITECTURE.md` | Platform map, agent routing, pipeline visual |
| `_docs/agent-cards/practice-exercise-agent.md` | Exercise agent — full build workflow |
| `_docs/agent-cards/flashcard-agent.md` | Flashcard agent — full build workflow |
| `_docs/agent-cards/rust-game-agent.md` | Game coordinator — routes requests to sub-agents |

---

## Notes for Next Agent

- Exercise page template: `exercises/ownership.html` — copy exactly, change only title, exercises, and code snippets
- Flashcard deck template: `flashcards/values.html` — copy exactly, change gradient class and card content
- No em dashes anywhere on the site
- Hero titles are always one line — no `<br>` tags
- All copy must match `_docs/COPY.md` — do not invent new page labels or titles
- Commit + push after every completed file — nothing is live until pushed to GitHub
