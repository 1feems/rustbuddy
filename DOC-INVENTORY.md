# Rust Buddy — Doc Inventory

Last updated: 2026-07-16
Source of truth for every doc in the Rust Buddy platform. Read this to know what exists, what each doc is for, and what is missing.

---

## Session Docs (game/ root)

| Doc | What it is | Used for |
|---|---|---|
| `GAME-CONTEXT.md` | Platform overview, folder map, design tokens summary | Read first every session before touching anything in game/ |
| `GAME-HANDOFF.md` | Session state — what is built, what is next, decisions made | Read every session to pick up where the last session ended |
| `DOC-INVENTORY.md` | This file — index of all docs in the platform | Know what docs exist and where to find them |

---

## Reference Docs (game/_docs/)

| Doc | What it is | Used for |
|---|---|---|
| `AGENT-ARCHITECTURE.md` | Pipeline diagram, agent routing, read order per agent | Understand how agents connect and which agent handles which request type |
| `ASSET-LIST.md` | List of all HTML pages and their build status | Track what pages exist and what still needs to be built. **Note: outdated — many pages listed as not built are now live. Needs updating.** |
| `COPY.md` | Source of truth for all page-level copy — titles, descriptions, card text | Any agent writing or editing page copy must pull from here. Do not invent new titles or descriptions. |
| `Creative-Cards-DESIGN.md` | Design spec for the product feature cards section | Reference when building or restyling product card components |
| `EXERCISE-PAGE-DESIGN.md` | Exercise page layout spec — tabs, panels, up to 8 exercises for complex topics, content rules | Required reading before building or auditing any exercise page |
| `EXERCISE-AUDIT-TEMPLATE.md` | Reusable template for exercise audits — fill in one copy per topic | Used by the Exercise Audit Agent. Completed audits saved to `exercises/audits/[NN]-[topic]-audit.md` |
| `EXERCISE-WIREFRAME.md` | Early wireframe reference for exercise page layout | Historical reference only. The canonical template is now `game/exercises/html/variables.html`. |
| `GAME-LEVELS-DESIGN.md` | Design spec for the 7 interactive game levels | Reference when building game level pages — each level builds one piece of a Solana payment contract |
| `KEY-TERMS.md` | All key terms per exercise page — source for the Terms to Know tab | Required reading when building or updating the Terms to Know tab on any exercise page |
| `STYLE-GUIDE.md` | Voice, tone, reading level, and copy rules for all game pages | Required reading before writing any copy on any page. 10th grade plain English. No em dashes. |

---

## Agent Cards (game/_docs/agent-cards/)

| Doc | What it is | Used for |
|---|---|---|
| `rust-game-agent.md` | Game coordinator agent — routes requests to sub-agents | Starting point for any build or update request on the Rust Buddy platform |
| `practice-exercise-agent.md` | Exercise agent — reads transcript, builds exercise .md files | Building new exercise pages or improving existing ones from the FreeCodeCamp transcript |
| `flashcard-agent.md` | Flashcard agent — builds flashcard deck HTML pages | Building new flashcard decks |

---

## Design Docs (game/_design/)

| Doc | What it is | Used for |
|---|---|---|
| `DESIGN_SYSTEM_updated.md` | All design tokens — colors, typography, spacing, layout rules | Required reading before writing any CSS or HTML. Never invent values outside this file. **Note: referenced in agent cards as DESIGN_SYSTEM.md — name needs to be reconciled.** |

---

## Missing Docs (referenced but do not exist)

| Doc | Where it is referenced | What it should contain |
|---|---|---|
| `game/exercises/EXERCISE-STYLE-GUIDE.md` | `practice-exercise-agent.md` | The 7-part exercise format rules — one concept per exercise, constraint types, instruction language. Needs to be created. |
| `game/flashcards/FLASHCARD-CONTEXT.md` | `GAME-HANDOFF.md` | Flashcard deck structure, card format, build rules. Needs to be created. |
| `exercise-audit-agent.md` | Audit agent card — checklist, read order, output format, rules | Run before any exercise audit. References `EXERCISE-AUDIT-TEMPLATE.md` for output structure. |

---

## Notes

- All Rust Buddy docs now live inside `game/`. Nothing exercise or platform related belongs at the Buddy Tech root level.
- `GAME-HANDOFF.md` is session state, not a reference doc — it changes every session.
- An `AGENTS.md` for Rust Buddy does not yet exist. It should be created to serve as the top-level entry point for any agent starting work on this platform.
