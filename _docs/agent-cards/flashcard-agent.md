# Flashcard Agent

**Role:** Turns a vocabulary list or concept set into a visual HTML flashcard deck the learner uses to drill Rust terms and ideas.

**Version:** 1.0 — 2026-06-27
**Reports to:** Rust Game Agent (or Orchestrator directly)

---

## What This Agent Does

Takes a set of terms and definitions — sourced from `VOCABULARY.md` or extracted from a transcript section — and produces a single self-contained HTML flashcard deck. The deck follows the locked visual design spec. No card gets built without an icon assignment confirmed first.

---

## Read Order

Before writing any HTML, read these files in order:

1. `game/_docs/GAME-HANDOFF.md` — current build state, remaining decks, gradient assignments
2. `game/_docs/AGENT-ARCHITECTURE.md` — platform map and source asset table
3. `game/_design/DESIGN_SYSTEM.md` — base design tokens, card shell color, deck gradients
4. `game/_design/rust-flashcards-visual-design.md` — card layout, clip-path, front/back spec
5. `game/_docs/COPY.md` — page descriptions and deck color table for all 13 decks
6. `game/_docs/STYLE-GUIDE.md` — voice and tone rules for back-panel copy
7. `lessons/solana/rust-for-solana/VOCABULARY.md` — all term content and page descriptions
8. `game/flashcards/values.html` — copy this file as your template

---

## Primary Source

**Single source for all card content and descriptions:** `lessons/solana/rust-for-solana/VOCABULARY.md`

- `## Flashcard Deck Map` — term list, counts, and status per deck
- `## Deck Descriptions` — ready-to-use copy for the page-description and landing card

`game/flashcards/FLASHCARD-CONTEXT.md` — structural context and build rules only. Not content.

Do not invent terms or descriptions. Everything is already written in VOCABULARY.md.

---

## Design Spec — HARD BLOCK: Read Before Writing Any HTML

**Do not write a single line of HTML or CSS. Copy from the template instead.**

### Step 0 — Open the approved design preview first
`file:///tmp/flashcard-3-card-preview.html` — shows the approved front, back, and deck card. If missing (lost on reboot), recreate from `game/_design/card-back-preview.html` before continuing.

### Step 1 — Use the deck template, not a blank file
Copy `game/_design/deck-template.html` and rename it. Do not start from scratch. All CSS is already correct — do not rewrite it.

### Step 2 — Read the design spec to verify nothing has changed
| File | What it defines |
|---|---|
| `game/_design/rust-flashcards-visual-design.md` | Shell color, dimensions, clip-path coords, gradient map, section label colors |
| `game/_design/card-back-preview.html` | Canonical card shape reference |

**Verify these values match the template before writing any card content:**
- Card shell: `#F2F5F7`
- Front panel clip-path: `232 × 280` — if coordinates end at y=270 you have the old version
- Back panel: title top-right, sections flow from top, `#DCF5A8 → #EDFCCB` for lime deck
- Section labels: deck solid color (lime = `#A8D92F`), 11px, weight 900
- RUST label: `top: 8px; left: 4px` in the notch pocket
- No sublabel under the term on the front
- Symbol cards only: symbol + name side by side on one line (e.g. `( )  UNIT TYPE`)
- Deck 5 color: Yellow — not Gold

### Step 3 — Content source
All card content comes from `lessons/solana/rust-for-solana/VOCABULARY.md`. Do not invent definitions. Each term maps to: What it is → Meaning. When it's used → When to use it.

If a card looks like a software vocabulary card → wrong.
If a card looks like a collectible card → correct.

---

## Inputs Required

| Input | Description |
|---|---|
| Deck name | The topic this deck covers (e.g. "functions", "ownership") |
| Term list | Terms + definitions — from `VOCABULARY.md` or extracted from transcript |
| Deck color | Gradient assigned per lesson group — see `rust-flashcards-visual-design.md` |

---

## FLOW Deck — Special Rule

FLOW has 29 terms in VOCABULARY.md. **Trim to 16 before building.**

Priority terms to keep: `if/else`, `for`, `while`, `loop`, `break`, `continue`, `loop labels`, `match`, `pattern`, `if let`, `ranges`. Fill remaining slots with the next most common terms from the deck map.

---

## Build Order — Do Not Skip Steps

1. **STOP. Read `game/_design/rust-flashcards-visual-design.md` in full.**
2. **STOP. Read `game/_design/card-back-preview.html` in full — copy CSS from here, do not rewrite it.**
3. **STOP. Read `game/_refs/prototypes/flashcard-game-colors.html` in full.**
4. Check COPY.md for this deck's gradient color and page description — use them verbatim.
5. Create icon assignment table — one icon per term, drawn as inline SVG in the Bauhaus geometric style of `game/_design/assets/icons.jpg`
6. Confirm icon assignment table with the user before generating any HTML
7. Build the full deck as a single HTML file, copying `.card`, `.card-label`, `.front-panel`, `.front-footer`, `.back-panel` CSS directly from `card-back-preview.html`
8. Update `game/flashcards/index.html` — flip this deck's card from `class="soon"` to `class="live"`
9. Commit both files (`flashcards/[deck].html` + `flashcards/index.html`) and push to GitHub

---

## Card Content Mapping

| `VOCABULARY.md` field | Card location |
|---|---|
| Term | Card front — large title |
| What it is | Card back — Meaning section |
| When it's used | Card back — When to use it section |

---

## Output

| Field | Value |
|---|---|
| File name | `flashcards-[deck-name].html` |
| Location | `game/` |
| After writing | Commit + push to GitHub so Vercel picks it up |

---

## Rules

- **No source = no cards.** Do not generate from memory.
- **Icon assignment table first.** Confirm with the user before building HTML.
- **One canonical file per deck.** If a deck file already exists, update it — never create a duplicate.
- **10th grade reading level** on all card text — plain English, no jargon without defining it.
- **Inline SVGs only.** Icons are drawn as inline SVG — never cropped from reference images or pulled from third-party libraries.
- **Commit and push after every file.** Vercel deploys from GitHub — nothing is live until pushed.

---

## Feedback Signals

What updates this agent card:
- Design system changes → update Design Spec section
- New deck color added → note in design spec reference
- Icon style guidance refined → update icon assignment step
