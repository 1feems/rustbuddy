# Rust Buddy — Agent Inventory

> Single source of truth for every agent on the Rust Buddy platform.
> Lists each agent's job, goal, and the exact docs it reads — nothing more.

Last updated: 2026-07-16

---

## How to Use This

Read `GAME-CONTEXT.md` first for platform context and learner profile. Then use the routing table below to find the right agent for your task. Each agent entry tells you its goal, what it reads, and what it produces.

---

## Routing Table

| Task | Agent |
|---|---|
| Build a new exercise page | Practice Exercise Agent |
| Build a new flashcard deck | Flashcard Agent |
| Build both for a topic | Rust Game Agent |
| Audit an existing exercise page | Exercise Audit Agent |
| Update design, build pages, fix UX or mobile | Design Agent |
| Sync an approved `.md` to its HTML page | Web Update Agent |

---

## Active Agents

---

### Rust Game Agent

**Card:** `_docs/agent-cards/rust-game-agent.md`

**Job:** Coordinator. Receives a topic request and routes it to the right sub-agent or agents.

**Goal:** Ensure the right agent is called for the right job. Check what already exists before dispatching. Never build what is already built.

**Reads:**
- `GAME-CONTEXT.md`
- `GAME-HANDOFF.md`
- `DOC-INVENTORY.md`
- `_docs/AGENT-ARCHITECTURE.md`

**Produces:** Dispatch instructions to Practice Exercise Agent, Flashcard Agent, or both.

---

### Practice Exercise Agent

**Card:** `_docs/agent-cards/practice-exercise-agent.md`

**Job:** Builds new exercise `.md` files from the FreeCodeCamp transcript.

**Goal:** Produce a 6-exercise page where concepts are taught in the order the instructor used, one concept per exercise, every term defined before it appears, and exercise 6 connects the concept to a Solana payment contract. A beginner should be able to complete exercises 1 to 5 and attempt exercise 6 without needing outside help.

**Reads:**
- `GAME-CONTEXT.md`
- `GAME-HANDOFF.md`
- `_docs/EXERCISE-PAGE-DESIGN.md`
- `_docs/COPY.md`
- `_docs/STYLE-GUIDE.md`
- `_docs/KEY-TERMS.md`
- FreeCodeCamp transcript — relevant timestamp range only (`pipeline/transcripts/solana/rust-for-solana/raw/freecodecamp-learn-rust-complete-course.txt`)
- `exercises/html/variables.html` — canonical HTML template

**Produces:** `exercises/md/[NN]-[topic].md`

---

### Flashcard Agent

**Card:** `_docs/agent-cards/flashcard-agent.md`

**Job:** Builds flashcard deck HTML pages from the vocabulary source.

**Goal:** Produce a self-contained HTML flashcard deck that lets the learner drill the key terms for a topic. Every card has a term, a plain English definition, a usage note, and a code example. Design follows the locked visual spec exactly.

**Reads:**
- `GAME-CONTEXT.md`
- `GAME-HANDOFF.md`
- `_design/DESIGN_SYSTEM_updated.md`
- `_design/rust-flashcards-visual-design.md`
- `_docs/COPY.md`
- `_docs/STYLE-GUIDE.md`
- `lessons/solana/rust-for-solana/VOCABULARY.md`
- `flashcards/values.html` — canonical HTML template

**Produces:** `flashcards/[topic].html`

---

### Design Agent

**Card:** Not yet built — `_docs/agent-cards/design-agent.md`

**Job:** Updates the design of the website, builds new pages, identifies UX gaps, and fixes mobile view issues.

**Goal:** Ensure every page matches the design system, works on mobile, and has no layout or UX problems. When building new pages, use the canonical template and never invent values outside the design system.

**Reads:**
- `GAME-CONTEXT.md`
- `GAME-HANDOFF.md`
- `_design/DESIGN_SYSTEM_updated.md`
- `_design/mobile.css`
- `_docs/EXERCISE-PAGE-DESIGN.md`
- `_docs/EXERCISE-WIREFRAME.md`
- `_docs/Creative-Cards-DESIGN.md`
- `_docs/GAME-LEVELS-DESIGN.md`
- `exercises/html/variables.html` — canonical exercise template

**Produces:** Updated or new HTML pages, CSS changes.

---

## Missing Agents (not yet built)

---

### Exercise Audit Agent

**Card:** Not yet built — `_docs/agent-cards/exercise-audit-agent.md`

**Job:** Reviews existing exercise `.md` files against the transcript source and learner objectives. Identifies missing concepts, weak exercises, copy that doesn't match the style guide, and difficulty jumps the learner cannot handle.

**Goal:** After an audit, the exercise file should teach every concept the transcript covers for that topic, in the right order, at the right difficulty, with no gaps between exercises 5 and 6. The learner should never feel dropped into exercise 6 without enough preparation.

**Will read:**
- `GAME-CONTEXT.md`
- `_docs/EXERCISE-PAGE-DESIGN.md`
- `_docs/STYLE-GUIDE.md`
- `_docs/COPY.md`
- `_docs/KEY-TERMS.md`
- FreeCodeCamp transcript — relevant timestamp range only
- The exercise `.md` file being audited

**Will produce:** Updated exercise `.md` file with gaps filled, weak exercises strengthened, and copy brought in line with the style guide.

---

### Web Update Agent

**Card:** Not yet built — `_docs/agent-cards/web-update-agent.md`

**Job:** Takes an approved exercise `.md` file and applies its changes to the matching built HTML page.

**Goal:** Keep the `.md` source and the live `.html` page in sync. The HTML page should always reflect what is in the `.md` file. No content drift between source and built page.

**Will read:**
- `GAME-CONTEXT.md`
- `_design/DESIGN_SYSTEM_updated.md`
- `_docs/EXERCISE-PAGE-DESIGN.md`
- The exercise `.md` file (source of truth for content)
- The exercise `.html` file (what needs to be updated)
- `exercises/html/variables.html` — canonical template for structure reference

**Will produce:** Updated `exercises/html/[topic].html`

---

## Platform Rules (all agents)

- No em dashes anywhere. Use commas or rephrase.
- 10th grade plain English. Define every term before using it.
- No invented concepts. Exercise content must trace back to the FreeCodeCamp transcript.
- Copy comes from `_docs/COPY.md`. Do not invent titles or descriptions.
- Styles come from `_design/DESIGN_SYSTEM_updated.md`. Do not invent CSS values.
- Commit and push after every completed file. Nothing is live until pushed to GitHub.

---

## Known Issues (fix when encountered)

| Issue | Location |
|---|---|
| Agent cards reference `DESIGN_SYSTEM.md` | Correct file is `_design/DESIGN_SYSTEM_updated.md` |
| Agent cards reference `docs/agent-cards/` | Correct path is `_docs/agent-cards/` |
| `EXERCISE-STYLE-GUIDE.md` referenced but missing | Should be created at `exercises/EXERCISE-STYLE-GUIDE.md` |
| `FLASHCARD-CONTEXT.md` referenced but missing | Should be created at `flashcards/FLASHCARD-CONTEXT.md` |
| `ASSET-LIST.md` is outdated | Many pages listed as not built are now live |
