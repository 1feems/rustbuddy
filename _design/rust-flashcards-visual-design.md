# Rust Flashcards — Visual Design

Last updated: 2026-06-29
Status: Locked. Do not change without user approval.

---

## Card Design

Flashcards use a full-gradient front and pale-gradient back. The card background is dark (`#1E1E1A`). There is no white shell or clip path. The design is intentionally bold and clean, not a software vocabulary card.

**What a card looks like:**
- Front: solid gradient from top to bottom, term centered in large text, deck label at bottom
- Back: pale version of the same gradient, definition text and code example

---

## Card Dimensions

| Property | Value |
|---|---|
| Width | `240px` |
| Height | `340px` |
| Border radius | `20px` |
| Card shell | `#1E1E1A` |

---

## The 5 Deck Colors

Cards cycle through these five colors in deck order. Each color has a front gradient and a pale back gradient.

### Lime (Deck 01 — Variables)

```css
/* Front */
background: linear-gradient(135deg, #A8D92F 0%, #C5E94E 40%, #EFF8A7 100%);

/* Back */
background: linear-gradient(135deg, #F0FAD0 0%, #F8FDE8 100%);
```

### Orange (Deck 02 — Numbers)

```css
/* Front */
background: linear-gradient(135deg, #FF7657 0%, #F97316 50%, #E85D04 100%);

/* Back */
background: linear-gradient(135deg, #FFE8E0 0%, #FFF5F0 100%);
```

### Cyan (Deck 03 — Chars & Bools)

```css
/* Front */
background: linear-gradient(135deg, #14A6C8 0%, #35BFDA 40%, #A8EDF0 100%);

/* Back */
background: linear-gradient(135deg, #D0F3FA 0%, #EDFBFD 100%);
```

### Pink (Deck 04 — Statements & Expressions)

```css
/* Front */
background: linear-gradient(135deg, #DE4775 0%, #EA6689 40%, #F6A56F 100%);

/* Back */
background: linear-gradient(135deg, #FAD5E0 0%, #FDF0F5 100%);
```

### Gold (Deck 05 — Functions)

```css
/* Front */
background: linear-gradient(135deg, #D99700 0%, #EDB51F 50%, #FFDF86 100%);

/* Back */
background: linear-gradient(135deg, #FFF0C0 0%, #FFFBE8 100%);
```

Colors repeat from Lime for decks 06 through 15.

---

## Front Card Layout

```text
┌────────────────────────────┐
│  01   •   Tap to flip   →  │   card number + hint, small, top
│                            │
│                            │
│           let              │   term, large centered (monospace for keywords)
│                            │
│                            │
│        Variables           │   deck category, small, bottom
└────────────────────────────┘
```

Typography:
- Card number / hint: 11px, muted opacity
- Term: 42px, weight 900, letter-spacing -0.03em (monospace font for code keywords)
- Category: 13px, weight 600, uppercase, muted opacity

---

## Back Card Layout

```text
┌────────────────────────────┐
│  Definition                │   label, small caps
│                            │
│  Plain English explanation │   body text, 14px
│  of what the term means.   │
│                            │
│  fn main() {               │   code example, monospace
│    let x = 5;              │
│  }                         │
│                            │
│           let              │   term name, bottom
└────────────────────────────┘
```

---

## Flip Mechanic

CSS 3D flip on click. Toggle a `.flipped` class on the card wrapper.

```css
.card-scene {
  perspective: 800px;
}

.card-inner {
  transform-style: preserve-3d;
  transition: transform 420ms cubic-bezier(0.4, 0, 0.2, 1);
}

.card-inner.flipped {
  transform: rotateY(180deg);
}

.card-face {
  backface-visibility: hidden;
}

.card-back {
  transform: rotateY(180deg);
}
```

---

## Icons (Bauhaus Style)

Each deck has one Bauhaus geometric icon displayed on the landing page card. Icons are inline SVG using simple shapes: circles, squares, lines, rectangles. Bold and flat, not decorative. See `_design/assets/icons.jpg` for style reference.

Do not use emoji, thin line icons, or UI glyphs. The icon represents the concept, not the word.

---

## Page Background

Flashcard pages use `#FFFFFF` white. Cards pop against the white background.

---

## Font

Inter throughout. No other fonts.

---

## What Not To Do

- Do not use a white shell or clip-path silhouette (that was the old design, replaced)
- Do not use purple gradients (not part of the locked 5-color palette)
- Do not use Space Grotesk or Satoshi (old font references, replaced by Inter)
- Do not use `#F1EFEA` as background (old design, replaced by `#FFFFFF`)
- Do not add stats, metadata, or marketing copy to cards
- Do not center a large label inside the gradient panel (term goes in the card center or bottom, not panel-only)
