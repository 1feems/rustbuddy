# Flashcard Context

> Read this before touching any flashcard file. Full picture of what this is, who it's for, and how it connects to the rest of the project.

---

## What This Is

A collectible-style Rust flashcard deck. One term per card. Flip to see the definition. Grouped into 8 decks by topic.

This is NOT a vocabulary app. It looks and feels like a physical collectible card — same silhouette, same clip cuts, same matte printed gradient. See `rust-flashcards-visual-design.md` for the full design spec.

---

## Why This Exists

Rust School has useful vocabulary but long reading gets hard and boring. The learner needs a faster study loop:

1. See a term
2. Try to remember what it means
3. Flip the card
4. Learn when to use it
5. Repeat

The deck should be useful to any Rust learner — not just blockchain learners. Decks 1–7 are general Rust. Deck 8 (Anchor + Solana) is the only crypto-specific deck.

---

## Who It's For

Two audiences:

**1. The user (non-technical founder)**
Learning Rust to write a Solana subscription payment contract. Needs 10th grade plain English — no assumed knowledge.

**2. General Rust learners (future)**
People outside crypto who want to learn Rust. The deck will be shareable. Deck 8 (Anchor + Solana) is the only crypto-specific deck — all others apply to any Rust learner.

---

## The 8 Decks

Full term counts and pending gaps are in `lessons/solana/rust-for-solana/VOCABULARY.md`.

| Deck | Topics | Status |
|---|---|---|
| 1. The Basics | Variables, mutability, data types, statements, expressions | ⚠️ Gaps — needs ~4 more terms |
| 2. Functions | Functions, parameters, return types, scope | ⚠️ Gaps — needs ~10 more terms |
| 3. Ownership | Ownership, move, copy, clone, drop | ⚠️ Gaps — needs ~15 more terms |
| 4. Borrowing | References, borrow, mutable borrow, lifetimes, String vs &str | ⚠️ Gaps — needs ~15 more terms |
| 5. Modules | mod, pub, paths, crate, use | ✅ Full at 23 terms |
| 6. Structs + Enums | Structs, impl, enums, match, Option, Result | ⚠️ Gaps — needs ~7 more terms |
| 7. Error + Traits + Generics | Result, ?, traits, generics, lifetimes | ⚠️ Light on generics |
| 8. Anchor + Solana | Anchor, PDAs, accounts, constraints | ✅ Full at 22 terms |

**Target:** 20–25 terms per deck. Do not build the full deck until gaps are filled.

---

## What's Pending Before Building

**Step 1 — Fill vocabulary gaps**
Decks 1–4 need more terms. Source: Kimi transcript extract from `freecodecamp-learn-rust-complete-course.txt` (in progress). Once `transcript-extract.md` is reviewed, add missing terms to `VOCABULARY.md`.

**Step 2 — Assign icons**
Every card needs a unique geometric icon. Do this before building the full deck — not after. Style: bold Bauhaus-style flat shapes, two-color fills. Reference: `game/icons.jpg`. Rules in `rust-flashcards-visual-design.md` section 7.

**Step 3 — Build full deck**
Once vocabulary is complete and icons are assigned, Codex builds the full HTML deck.

**Do not skip to Step 3.** Building cards with placeholder icons or missing terms creates rework.

---

## Files

| File | Purpose |
|---|---|
| `FLASHCARD-CONTEXT.md` | This file — read first |
| `rust-flashcards-visual-design.md` | Full design spec — card anatomy, gradients, typography, icons |
| `rust-flashcards-card-proof.html` | Working proof — one card, correct design |
| `icons.jpg` | Icon style reference (Bauhaus geometric) |
| `ChatGPT Image Jun 10, 2026, 04_27_38 PM.png` | Card structure reference |
| `archive/design 1.webp` | Gradient + font style reference |
| `archive/layout1.jpg` | Page layout reference |

Vocabulary source: `lessons/solana/rust-for-solana/VOCABULARY.md`

---

## How Cards Connect to Game Levels

The flashcard cheat sheet appears inside each game level (left panel). When a user is on Level 1 (Data Types), they see a mini version of Deck 1 cards as a reference. Same flip mechanic, same design — just smaller.

This means:
- Deck order matches game level order
- Card terms must match the cheat sheet terms used in game levels
- Do not add terms to a deck that aren't also in the relevant game level's cheat sheet

---

## Design Rules (summary — full spec in `rust-flashcards-visual-design.md`)

- Collectible card silhouette — NOT a software vocabulary card
- White outer shell, white footer — never colored
- Gradient only on the clipped panel — never the full card
- Top-left `Rust` label = small, like a year stamp
- Term in the footer replaces `ZEUS` from the reference
- Icons are geometric SVG — no emoji, no UI glyphs, no clip art
- Page background: warm light grey `#F1EFEA`, 3-column grid, no dashboard chrome

---

## Who Builds What

| Task | Agent |
|---|---|
| Fill vocabulary gaps from transcript | Kimi (Hermes) |
| Review vocabulary + decide final terms | User + Claude |
| Assign icons to terms | Claude + User |
| Build full deck HTML | Codex |
| Update VOCABULARY.md | Claude |
