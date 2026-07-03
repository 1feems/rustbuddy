# Rust Bud — Game Handoff

> Read this every session before touching anything in `game/`.
> This is the game's source of truth. Root `HANDOFF.md` points here.

Last updated: 2026-07-03 (session 5)

---

## What Rust Bud Is

A web-based Rust learning platform with four products:

| Product | Subfolder | Status |
|---|---|---|
| Home | `game/index.html` | ✅ Live on Vercel |
| Exercise Pages | `game/exercises/` | ✅ Live — 6 pages built |
| Flashcard Decks | `game/flashcards/` | ✅ Live — landing + 7 decks built |
| Resources | `game/resources/` | ✅ Live — landing + 2 resource pages |
| Game Levels | `game/levels/` | ✅ Pushed — old style, reskin later |

Site name: **Rust Buddy**
GitHub: https://github.com/1feems/rustbuddy (was rust-bud, redirects)
Live site: https://rustbuddy.vercel.app/flashcards/index.html
Deployment: Vercel — **connected and live** — auto-deploys on every push to `main`

---

## Read Order Every Session

1. This file — you're reading it
2. `AGENT-ARCHITECTURE.md` — platform map, source assets, agent routing
3. `_design/DESIGN_SYSTEM.md` — all UI tokens. Never invent styles.
4. `_docs/COPY.md` — all page copy. Never write new copy without checking here first.
5. The relevant product doc for what you're building (see below)

---

## What's Built

### Site-wide

| File | Status | Notes |
|---|---|---|
| `game/index.html` | ✅ Live | Full redesign (session 3) — colored portrait cards, notch clip-path, lime nav, orange logo |
| `_design/DESIGN_SYSTEM.md` | ✅ Updated | Complete rewrite (session 3) — card dimensions, clip-path, gradients, spacing, nav, landing hero |
| `_docs/COPY.md` | ✅ New | Created session 3 — all page labels, titles, subtexts for home + all three landings |

### Exercises

| File | Status |
|---|---|
| `game/exercises/index.html` | ✅ Live — updated nav, hero, copy (session 3) |
| `game/exercises/variables.html` | ✅ Live — canonical template |
| `game/exercises/numbers.html` | ✅ Live |
| `game/exercises/chars-bools.html` | ✅ Live |
| `game/exercises/statements-expressions.html` | ✅ Live |
| `game/exercises/functions.html` | ✅ Live |
| `game/exercises/ownership.html` | ✅ Live |

### Flashcards

| File | Color | Terms | Status |
|---|---|---|---|
| `game/flashcards/index.html` | — | — | ✅ Live — 6 decks live, 7 soon |
| `game/flashcards/values.html` | Lime | 16 | ✅ Live |
| `game/flashcards/symbols.html` | Purple | 8 | ✅ Live (session 5) |
| `game/flashcards/types.html` | Orange | 9 | ✅ Live (session 5) |
| `game/flashcards/functions.html` | Cyan | 10 | ✅ Live (session 5) |
| `game/flashcards/ownership.html` | Pink | 8 | ✅ Live (session 5) |
| `game/flashcards/borrowing.html` | Yellow | 8 | ✅ Live (session 5) |

### Resources

| File | Status |
|---|---|
| `game/resources/index.html` | ✅ Live — updated nav, hero, copy (session 3) |
| `game/resources/rust-101.html` | ✅ Live |
| `game/resources/vocabulary.html` | ✅ Live |

---

## What's Next

### Flashcard Decks — Build Remaining 7

Build one HTML file per deck. Use `game/flashcards/values.html` as the template — copy exactly, swap gradient class and card content only. For the symbols deck pattern (monospace card titles), use `flashcards/symbols.html` as reference.

**Term source:** `lessons/solana/rust-for-solana/VOCABULARY.md`
- Filter by the `Flashcard Deck` column (4th column on every term row)
- The `## Flashcard Deck Map` section at the top maps each deck to its exercise and lists key terms
- Do not invent terms or pull from anywhere else

| Deck | File | Gradient | Terms | Notes |
|---|---|---|---|---|
| STRINGS | `flashcards/strings.html` | Lime | 16 | — |
| SLICES | `flashcards/slices.html` | Orange | 8 | — |
| TUPLES | `flashcards/tuples.html` | Cyan | 13 | — |
| STRUCTS | `flashcards/structs.html` | Pink | 19 | — |
| ENUMS | `flashcards/enums.html` | Yellow | 8 | — |
| OPTION | `flashcards/option.html` | Lime | 6 | — |
| FLOW | `flashcards/flow.html` | Orange | 29 | Trim to ~16 before building |

After each file is built: update `game/flashcards/index.html` to flip that deck card from `class="soon"` to `class="live"`, then commit and push from inside `game/`.

### Future

- **Rebuild COPY.md** — restructure as a full sitemap + copy doc (1.0 Home, 2.0 Exercises, 2.1 Variables, etc.). Every page gets its own numbered section with all copy. Flashcard deck descriptions live here and in `VOCABULARY.md`. Pushed to GitHub so copy can be updated without touching HTML.
- **CSS/HTML design tokens doc** — lists all design tokens (colors, font styles, spacing, gradients per deck). Lets styles be changed from GitHub and pushed to Vercel without digging through HTML files. Do after COPY.md rebuild.
- V2 flashcard study mode: single card centered, flip on click, "Know it" / "Still learning" buttons, progress bar. Build after all decks are done.
- Exercise pages for remaining topics (Borrowing, String vs &str, Slices, Structs, Enums, etc.) — source `.md` files exist in `game/exercises/`
- Game levels reskin (`game/levels/`) — old style, low priority

---

## Design System

All tokens are in `_design/DESIGN_SYSTEM.md`. Summary of critical values:

**Colors:**
- Logo "Rust Buddy": always `#FF7657` (orange), never black
- Nav + label pills: `#C5E94E` (lime), black text
- Page background: `#FFFFFF`
- Primary text: `#171714`
- Muted text: `#77766F`

**Home cards:** 300×480px fixed, notch clip-path (see DESIGN_SYSTEM.md for exact path), 32px padding

**Landing pages:** All three share identical nav, hero, and padding — lime pill label, no border-bottom, `padding: 24px 40px 28px` hero, `clamp(36px, 4vw, 58px)` title, cards section `padding: 24px 40px 80px`

**Flashcard deck gradients:**

| Color | CSS class | Gradient | Deck |
|---|---|---|---|
| Lime | `.lime` | `#A8D92F → #C5E94E → #EFF8A7` | Values (01) |
| Purple | `.purple` | `#7B5EA7 → #9B7EC8 → #BDA8E0` | Symbols (02) |
| Orange | `.orange` | `#FF7657 → #F97316 → #E85D04` | Types (03) |
| Cyan | `.cyan` | `#14A6C8 → #35BFDA → #A8EDF0` | Functions (04) |
| Pink | `.pink` | `#DE4775 → #EA6689 → #F6A56F` | Ownership (05) |
| Yellow | `.yellow` | `#E8C800 → #F5DC3A → #FFFD74` | Borrowing (06) |
| Repeats from Lime → | — | Strings (07), etc. |

Full details: `_design/DESIGN_SYSTEM.md`
Flashcard-specific: `_design/rust-flashcards-visual-design.md`

---

## Docs Index

| File | Purpose |
|---|---|
| `_design/DESIGN_SYSTEM.md` | All UI tokens — colors, typography, spacing, card dimensions, nav, landing hero |
| `_docs/COPY.md` | All page copy — labels, titles, subtexts for every page |
| `_docs/EXERCISE-PAGE-DESIGN.md` | Exercise page layout spec |
| `_docs/GAME-LEVELS-DESIGN.md` | Game levels design |
| `_docs/ASSET-LIST.md` | Asset inventory |
| `_docs/KEY-TERMS.md` | Glossary source |
| `flashcards/FLASHCARD-CONTEXT.md` | Flashcard term source and deck context |
| `AGENT-ARCHITECTURE.md` | Platform map, agent routing |

---

## Notes for Next Agent

- Exercise page template: `exercises/variables.html` — copy exactly, change only title, exercises, and code snippets
- Flashcard deck template: `flashcards/variables.html` — copy exactly, change gradient class and card content
- No em dashes anywhere on the site
- Hero titles are always one line — no `<br>` tags
- All copy must match `_docs/COPY.md` — do not invent new page labels or titles
- Commit + push after every completed file — nothing is live until pushed to GitHub
