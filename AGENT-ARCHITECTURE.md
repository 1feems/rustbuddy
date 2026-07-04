# Rust Bud — Agent Architecture

> Read this after GAME-HANDOFF.md. Before building anything, read `_design/DESIGN_SYSTEM.md`.

---

## Pipeline Overview

```
USER REQUEST
      │
      ▼
┌─────────────────────────────────────────┐
│           RUST GAME AGENT               │
│         rust-game-agent.md              │
│                                         │
│  1. Check — does file already exist?    │
│     Yes → update. No → create.          │
│  2. Route based on request type         │
└──────────────┬──────────────────────────┘
               │
       ┌───────┴────────┐
       │                │
       ▼                ▼
┌─────────────┐  ┌──────────────────┐
│  EXERCISE   │  │   FLASHCARD      │
│    AGENT    │  │     AGENT        │
│             │  │                  │
│ Read order: │  │ Read order:      │
│ 1. GAME-    │  │ 1. GAME-         │
│    HANDOFF  │  │    HANDOFF       │
│ 2. AGENT-   │  │ 2. AGENT-        │
│    ARCH     │  │    ARCH          │
│ 3. DESIGN_  │  │ 3. DESIGN_       │
│    SYSTEM   │  │    SYSTEM        │
│ 4. EXERCISE-│  │ 4. FLASHCARDS-   │
│    PAGE-    │  │    VISUAL-DESIGN │
│    DESIGN   │  │ 5. COPY.md       │
│ 5. COPY.md  │  │ 6. STYLE-GUIDE   │
│ 6. STYLE-   │  │ 7. VOCABULARY.md │
│    GUIDE    │  │ 8. values.html   │
│ 7. variables│  │    (template)    │
│    .html    │  │                  │
│    (tmpl)   │  │ Source:          │
│             │  │ VOCABULARY.md    │
│ Source:     │  │ (Deck Map +      │
│ game/       │  │  Descriptions)   │
│ exercises/  │  │                  │
│ [NN]-[topic]│  │ Output:          │
│ .md         │  │ flashcards/      │
│             │  │ [deck].html      │
│ Output:     │  │ + index.html     │
│ exercises/  │  │ (flip soon→live) │
│ [topic].html│  │                  │
└──────┬──────┘  └────────┬─────────┘
       │                  │
       └────────┬─────────┘
                │
                ▼
      git commit + push
                │
                ▼
      Vercel auto-deploys
                │
                ▼
   rustbuddy.vercel.app (live)
```

---

## 1. Platform Overview

Rust Bud is a static HTML web platform for learning Rust. Four products:

| Product | Subfolder | Source |
|---|---|---|
| Exercise Pages | `game/exercises/` | Exercise .md files + transcript |
| Game Levels | `game/levels/` | Transcript + `_docs/GAME-LEVELS-DESIGN.md` |
| Flashcard Decks | `game/flashcards/` | `VOCABULARY.md` + `CARD-INVENTORY.md` |
| Study Guides | `game/study-guides/` | `lessons/solana/rust-for-solana/[lesson]/` |

No framework. Pure HTML, CSS, JS. Deploy: GitHub `rust-bud` repo → Vercel.

---

## 2. Source Assets

Every input an agent might need:

| Asset | Path |
|---|---|
| Primary transcript | `pipeline/transcripts/solana/rust-for-solana/raw/freecodecamp-learn-rust-complete-course.txt` |
| Vocabulary | `lessons/solana/rust-for-solana/VOCABULARY.md` |
| Lesson pages | `lessons/solana/rust-for-solana/lesson-[N]-[topic]/` |
| Exercise source .mds | `game/exercises/[NN]-[topic].md` |
| Design system (master) | `game/_design/DESIGN_SYSTEM.md` |
| Flashcard design | `game/_design/rust-flashcards-visual-design.md` |
| Flashcard context | `game/flashcards/FLASHCARD-CONTEXT.md` |
| Card inventory | `game/flashcards/CARD-INVENTORY.md` |
| Design reference images | `game/_design/assets/` |
| Exercise template | `game/exercises/variables.html` |
| Flashcard proof (color reference) | `game/_refs/prototypes/flashcard-game-colors.html` |
| Flashcard prototype (flip mechanic) | `game/_refs/prototypes/rust-flashcards-card-proof.html` |

---

## 3. Content Map

One row per topic. `—` = lesson pages not yet built. Use transcript as source until they exist.

| Topic | Transcript range | Lesson pages | Exercise .md | Game page |
|---|---|---|---|---|
| Variables | 00:06:19–00:27:07 | `lessons/solana/rust-for-solana/lesson-01-data-types/` | `exercises/01-variables.md` | `exercises/variables.html` |
| Numbers | 00:27:07–01:09:51 | — | `exercises/02-numbers.md` | `exercises/numbers.html` |
| Chars & Bools | 01:09:51–01:17:55 | — | `exercises/03-chars-bools.md` | `exercises/chars-bools.html` |
| Statements & Expressions | 01:17:55–01:24:50 | — | `exercises/04-statements-expressions.md` | `exercises/statements-expressions.html` |
| Functions | 01:24:50–01:32:53 | `lessons/solana/rust-for-solana/lesson-02-functions/` | `exercises/05-functions.md` | `exercises/functions.html` |
| Ownership | 01:32:53–02:24:06 | — | `exercises/06-ownership.md` | `exercises/ownership.html` |
| Borrowing | 02:24:06–02:47:45 | — | `exercises/07-borrowing.md` | `exercises/borrowing.html` |
| String vs &str | 02:47:45–03:17:59 | — | `exercises/08-string-vs-str.md` | `exercises/string-vs-str.html` |
| Slices | 03:17:59–03:31:35 | — | `exercises/09-slices.md` | `exercises/slices.html` |
| Tuples | 03:31:35–03:40:04 | — | `exercises/10-tuples.md` | `exercises/tuples.html` |
| Structs | 03:40:04–04:02:52 | — | `exercises/11-structs.md` | `exercises/structs.html` |
| Enums | 04:02:52–04:13:46 | — | `exercises/12-enums.md` | `exercises/enums.html` |
| Option | 04:13:46–04:21:32 | — | `exercises/13-option.md` | `exercises/option.html` |
| Flow Control | 04:21:32–04:44:43 | — | `exercises/14-flow-control.md` | `exercises/flow-control.html` |

---

## 4. Agent Routing Table

| Task | Agent card | Source | Output |
|---|---|---|---|
| Build exercise .md file | `game/_docs/agent-cards/practice-exercise-agent.md` | Transcript (timestamp range) | `game/exercises/[NN]-[topic].md` |
| Build exercise HTML page | `game/_docs/agent-cards/practice-exercise-agent.md` | Exercise .md + `exercises/variables.html` template | `game/exercises/[topic].html` |
| Build flashcard deck | `game/_docs/agent-cards/flashcard-agent.md` | `VOCABULARY.md` (content) + `flashcards/CARD-INVENTORY.md` (which terms) | `game/flashcards/[topic].html` |
| Build game level | `game/_docs/agent-cards/rust-game-agent.md` | Transcript + `_docs/GAME-LEVELS-DESIGN.md` | `game/levels/level-[N]-[topic].html` |
| Build study guide page | (future) | `lessons/solana/rust-for-solana/[lesson]/` | `game/study-guides/[topic].html` |

---

## 5. Design Rules — All Agents

**Rule 1 — Every page starts from the design system.**
Read `game/_design/DESIGN_SYSTEM.md` before building any game page. Never invent styles outside it.

**Rule 2 — Flashcard decks have one extra file.**
When building flashcard decks, read all three in order:
1. `game/_design/DESIGN_SYSTEM.md` — base tokens
2. `game/_design/rust-flashcards-visual-design.md` — collectible card layout, gradient map, silhouette
3. `game/flashcards/FLASHCARD-CONTEXT.md` — deck structure, vocabulary source, counts per topic

**Rule 3 — No new styles without updating the design system first.**
If a component isn't in `DESIGN_SYSTEM.md`, stop and add it before building. The design system is the source of truth, not individual pages.

---

## 6. Starter Prompts

### Exercise Agent
```
You are the Rust Bud Exercise Agent.

Read in this order:
1. game/GAME-HANDOFF.md
2. game/AGENT-ARCHITECTURE.md
3. game/_design/DESIGN_SYSTEM.md
4. game/_docs/EXERCISE-PAGE-DESIGN.md
5. game/exercises/variables.html — this is your template

Build: game/exercises/[topic].html
Source: game/exercises/[NN]-[topic].md + transcript range from AGENT-ARCHITECTURE.md content map
Output: one complete HTML file saved to game/exercises/[topic].html
Commit and push when done.
```

### Flashcard Agent
```
You are the Rust Bud Flashcard Agent.

Read in this order:
1. game/GAME-HANDOFF.md
2. game/AGENT-ARCHITECTURE.md
3. game/_design/DESIGN_SYSTEM.md
4. game/_design/rust-flashcards-visual-design.md
5. game/flashcards/FLASHCARD-CONTEXT.md
6. game/flashcards/CARD-INVENTORY.md — tells you which terms go in this deck
7. lessons/solana/rust-for-solana/VOCABULARY.md — card content source

Build: game/flashcards/[topic].html
Reference: game/_refs/prototypes/flashcard-game-colors.html (color system) + rust-flashcards-card-proof.html (flip mechanic)
Output: one complete HTML file saved to game/flashcards/[topic].html
Commit and push when done.
```

### Level Agent
```
You are the Rust Bud Level Agent.

Read in this order:
1. game/GAME-HANDOFF.md
2. game/AGENT-ARCHITECTURE.md
3. game/_design/DESIGN_SYSTEM.md
4. game/_docs/GAME-LEVELS-DESIGN.md

Build: game/levels/level-[N]-[topic].html
Source: pipeline/transcripts/solana/rust-for-solana/raw/freecodecamp-learn-rust-complete-course.txt (transcript range from content map)
Output: one complete HTML file saved to game/levels/level-[N]-[topic].html
Commit and push when done.
```
