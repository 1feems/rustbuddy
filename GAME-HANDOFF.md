# Rust Buddy — Game Handoff

> Read this every session before touching anything in `game/`.
> Read `GAME-CONTEXT.md` first for full platform context and learner profile.

Last updated: 2026-07-16 (session 25)

---

## Current State

All exercise pages and flashcard decks are live at rustbuddy.vercel.app.

**Exercises live:** Variables, Numbers, Chars & Bools, Statements & Expressions, Functions, Ownership, Borrowing, String vs &str, Slices, Tuples, Structs, Enums, Option, Flow Control

**Flashcard decks live:** Values, Symbols, Types, Functions, Ownership, Borrowing (Strings through Flow not yet built)

**Repo:** github.com/1feems/rustbuddy (private). Files are at ROOT — no `game/` prefix. Always run `git remote -v` before committing.

---

## What Was Done This Session

- Ownership exercises audited and updated: 7 exercises total (added Scope and Drop as exercise 4)
- Overview description, Quick Reference, and Terms to Know updated with Scope and Drop
- KEY-TERMS.md ownership section: added Clone, Scope, Drop
- EXERCISE-PAGE-DESIGN.md: updated to allow up to 8 exercises for complex topics
- EXERCISE-AUDIT-TEMPLATE.md created: reusable template for all future exercise audits
- exercise-audit-agent.md updated: references template, adds save path, adds template rule
- AGENTS.md and DOC-INVENTORY.md created at game root
- GAME-CONTEXT.md rewritten and moved to game root
- All _docs/ files confirmed in game/_docs/ (not buddy tech root)

---

## What's Next — Priority Order

### 1. Audit: Borrowing exercises

Use the Exercise Audit Agent workflow. All docs and paths are listed below — do not search for them.

**File to audit:** `exercises/md/07-borrowing.md`
**HTML to audit:** `exercises/borrowing.html`
**Transcript path:** `/Users/feems/Desktop/buddy tech/pipeline/transcripts/solana/rust-for-solana/raw/freecodecamp-learn-rust-complete-course.txt`
**Transcript range:** Borrowing concept starts at line ~5195. Instructor exercises start at ~5561. Read lines 5195 to ~5950 to cover the full concept and all practice exercises.

**Read these docs in order before starting the audit:**

| # | File | Why |
|---|---|---|
| 1 | `GAME-CONTEXT.md` | Learner profile — non-technical founder, 10th grade plain English, Solana payment contract goal |
| 2 | `_docs/EXERCISE-PAGE-DESIGN.md` | Exercise structure rules — up to 8 for complex topics, build exercise is always last |
| 3 | `_docs/COPY.md` | Blockchain context for build exercise, page descriptions |
| 4 | `_docs/STYLE-GUIDE.md` | No em dashes, plain English, task language rules |
| 5 | `_docs/KEY-TERMS.md` | Borrowing section — terms for the Terms to Know tab |
| 6 | `_docs/EXERCISE-AUDIT-TEMPLATE.md` | The template to fill in — use this as the audit output |
| 7 | `_docs/agent-cards/exercise-audit-agent.md` | Full audit checklist and rules |
| 8 | Transcript lines 5195 to 5950 | Source of truth for what borrowing covers and what the instructor practiced |
| 9 | `exercises/md/07-borrowing.md` | The file being audited |
| 10 | `exercises/borrowing.html` | The live HTML — check it matches the md |

**Save completed audit to:** `exercises/audits/07-borrowing-audit.md`

**Do not update any files until findings are presented and approved.**

---

### 2. Functions exercise — pending decisions

`exercises/functions.html` and `exercises/md/04-functions.md` need two decisions before going final:

- **Ex 5:** task currently reuses the same function from the explainer. Needs a new task function (see ownership audit approach — describe the problem without revealing the fix).
- **Ex 6:** decide whether to keep "fill in the signature" or give learner only `main()` and have them write the full function from scratch.

Once decided, update both `.md` and `.html` and push.

---

### 3. V2 Flashcard Study Mode

Single card centered, flip on click, "Know it" / "Still learning" buttons, progress bar. All decks are built — this is a UI feature, no content work needed.

---

## Docs Index

| File | Purpose |
|---|---|
| `GAME-CONTEXT.md` | Learner profile, product objectives, folder map — read first every session |
| `AGENTS.md` | Agent inventory — routing table, what each agent reads and produces |
| `DOC-INVENTORY.md` | Full index of all docs in the platform with descriptions |
| `_design/DESIGN_SYSTEM_updated.md` | Master UI spec — all tokens, dimensions, colors. Never invent values outside this file. |
| `_design/styles.css` | CSS custom properties |
| `_design/mobile.css` | Mobile styles |
| `_docs/COPY.md` | Source of truth for all page-level copy — titles, descriptions, deck colors |
| `_docs/STYLE-GUIDE.md` | Voice, tone, reading level, copy rules — no em dashes, 10th grade |
| `_docs/EXERCISE-PAGE-DESIGN.md` | Exercise page layout spec — tabs, up to 8 exercises, content rules |
| `_docs/EXERCISE-AUDIT-TEMPLATE.md` | Reusable audit template — fill one copy per topic |
| `_docs/KEY-TERMS.md` | All key terms per topic — source for Terms to Know tab |
| `_docs/GAME-LEVELS-DESIGN.md` | Design spec for game levels |
| `_docs/agent-cards/exercise-audit-agent.md` | Audit agent — checklist, read order, rules, template reference |
| `_docs/agent-cards/practice-exercise-agent.md` | Exercise build agent — full workflow |
| `_docs/agent-cards/flashcard-agent.md` | Flashcard agent — full workflow |
| `_docs/agent-cards/rust-game-agent.md` | Coordinator agent — routes requests |

---

## Platform Rules (always apply)

- No em dashes anywhere on the site. Use commas or rephrase.
- 10th grade plain English. Define every term before using it.
- Exercise page template: `exercises/ownership.html` — canonical template for all exercise pages
- Flashcard deck template: `flashcards/values.html` — canonical template for all flashcard decks
- All copy must match `_docs/COPY.md` — do not invent new titles or descriptions
- Commit and push after every completed file — nothing is live until pushed to GitHub
- Always run `git remote -v` before committing to confirm the correct repo
