# Rust Flashcards — Visual Design

Last updated: 2026-06-30
Status: Locked. Do not change without user approval.

---

## Card Design

Collectible-card style. White (hint-of-blue-white) card shell with a gradient front panel cut by a clip-path notch shape. Bold and clean — not a software vocabulary card.

**What a card looks like:**
- Shell: `#F5F8FA` (hint of blue, not pure white)
- Front: gradient panel (clip-path notch) centered — Rust logo SVG white inside — RUST label in the notch tab pocket — term name + sublabel in white footer strip
- Back: same shell, same clip-path shape (taller panel, full card height), pale gradient, term title + Meaning / When to use / Example sections

The clip-path shape is mandatory. Do not remove it or swap to `polygon()`.

---

## Card Dimensions

| Property | Value |
|---|---|
| Width | `260px` |
| Height | `360px` |
| Border radius | `8px` |
| Shell padding | `14px` |
| Card shell | `#F2F5F7` |
| Front panel | `232 × 280px` (260−28 wide, extended to reduce white gap above footer) |
| Back panel | `232 × 332px` (260−28 wide, 360−28 tall) |
| Footer height | `62px` |

---

## Clip-Path — Do Not Touch

The notch shape uses `clip-path: path()`. Coordinates are exact pixel values for each panel's dimensions. Do not scale, round, or rewrite these values.

**Front panel (232 × 280):**
```css
clip-path: path('M 41 0 L 218 0 a 14 14 0 0 1 14 14 L 232 236 Q 232 252 225 259 L 205 274 Q 204 280 196 280 L 14 280 a 14 14 0 0 1 -14 -14 L 0 35 L 12 35 Q 18 35 21 29 L 32 6 Q 36 0 41 0 Z');
```

**Back panel (232 × 332):**
```css
clip-path: path('M 41 0 L 218 0 a 14 14 0 0 1 14 14 L 232 286 Q 232 302 225 309 L 205 326 Q 204 332 196 332 L 14 332 a 14 14 0 0 1 -14 -14 L 0 35 L 12 35 Q 18 35 21 29 L 32 6 Q 36 0 41 0 Z');
```

Shape: stepped notch at top-left (creates a white tab pocket for the RUST label) + diagonal cut at bottom-right.

---

## RUST Label

Sits in the white tab pocket cut by the notch at top-left. Stays in place on both front and back.

```css
.card-label {
  position: absolute;
  top: 8px; left: 4px;
  font-size: 9px; font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(11,13,18,0.5);
  z-index: 10;
}
```

---

## The 5 Deck Colors

Five gradient colors, one per deck group. Front gradient goes on the panel. Back gradient is the pale version for the back panel.

### Lime (Deck 01 — Values & Numbers)

```css
/* Front panel */
background: linear-gradient(135deg, #A8D92F 0%, #C5E94E 34%, #DAF06F 68%, #EFF8A7 100%);

/* Back panel */
background: linear-gradient(135deg, #DCF5A8 0%, #EDFCCB 100%);
```

### Orange (Deck 02 — Types & Output)

```css
/* Front panel */
background: linear-gradient(135deg, #FF7657 0%, #F97316 50%, #E85D04 100%);

/* Back panel */
background: linear-gradient(135deg, #FFE8E0 0%, #FFF5F0 100%);
```

### Cyan (Deck 03 — Functions)

```css
/* Front panel */
background: linear-gradient(135deg, #14A6C8 0%, #35BFDA 40%, #A8EDF0 100%);

/* Back panel */
background: linear-gradient(135deg, #D0F3FA 0%, #EDFBFD 100%);
```

### Pink (Deck 04 — Ownership)

```css
/* Front panel */
background: linear-gradient(135deg, #DE4775 0%, #EA6689 40%, #F6A56F 100%);

/* Back panel */
background: linear-gradient(135deg, #FAD5E0 0%, #FDF0F5 100%);
```

### Yellow (Deck 05 — Borrowing)

```css
/* Front panel */
background: linear-gradient(135deg, #E8C800 0%, #F5DC3A 40%, #FFFD74 100%);

/* Back panel */
background: linear-gradient(135deg, #FFFACC 0%, #FFFDE8 100%);
```

Colors repeat from Lime for decks 06 through 13.

---

## Front Card Layout

```text
┌──────────────────────────────┐
│ RUST                         │   label in notch tab pocket, top-left
│  ┌────────────────────────┐  │
│  │                        │  │
│  │    [Rust logo SVG]     │  │   gradient panel (clip-path)
│  │                        │  │
│  └────────────────────────┘  │
│  STRUCT                      │   term only — nothing below it
└──────────────────────────────┘
```

Typography:
- Term: `28px`, weight 900, `letter-spacing: -0.04em`, uppercase, `#0B0D12`
- Card label: `9px`, weight 800, `letter-spacing: 0.08em`, uppercase, `rgba(11,13,18,0.5)`

**No sublabel under the term.** Nothing below the term in the footer.

**Symbol cards only:** symbol and name side by side in the footer as one line. Example: `( )  UNIT TYPE`. No sublabel underneath.

---

## Back Card Layout

```text
┌──────────────────────────────┐
│ RUST                         │   label in notch tab pocket
│  ┌────────────────────────┐  │
│  │               STRUCT   │   term title, bold, top-right
│  │  ─────────────         │  │
│  │  Meaning               │  │   section label (#A8D92F, 11px)
│  │  plain English text    │  │
│  │                        │  │   ← extra space before divider
│  │  ─────────────         │  │
│  │  When to use it        │  │
│  │  plain English text    │  │
│  │                        │  │
│  │  ─────────────         │  │
│  │  Example               │  │
│  │  struct Foo { ... }    │  │   monospace code
│  └────────────────────────┘  │
└──────────────────────────────┘
```

Back panel padding: `42px 18px 18px`.

Typography (back card):
- Back title: `26px`, weight 900, letter-spacing -0.04em, uppercase, `#0B0D12`, `text-align: right`
- Section label: `11px`, weight 900, letter-spacing 0.06em, uppercase, deck solid color (lime = `#A8D92F`)
- Section body: `11.5px`, weight 400, line-height 1.35, `#0B0D12`
- Code: `11px`, `"SF Mono", "Fira Code", monospace`
- Section spacing: `padding-top: 14px; margin-top: 14px` (extra room before each divider)
- `_` symbol card name: Underscore. Footer shows `_ UNDERSCORE` on one line.

---

## Flip Mechanic

CSS 3D flip on click. Toggle `.flipped` on the card wrapper.

```css
.card-scene { perspective: 800px; }
.card-inner {
  transform-style: preserve-3d;
  transition: transform 420ms cubic-bezier(0.4, 0, 0.2, 1);
}
.card-inner.flipped { transform: rotateY(180deg); }
.card-face { backface-visibility: hidden; }
.card-back { transform: rotateY(180deg); }
```

---

## Icons (Bauhaus Style)

Each deck on the landing page shows one Bauhaus geometric icon. Inline SVG only. Simple shapes: circles, squares, lines, rectangles. Bold and flat, not decorative.

See `_design/assets/icons.jpg` for style reference. Do not use emoji, thin-line icons, or UI glyphs.

---

## Font

Inter throughout. No other fonts.

---

## What Not To Do

- Do not remove the clip-path — the notch shape is the core visual identity
- Do not use `polygon()` instead of `path()` — the exact coordinates only work with `path()`
- Do not scale clip-path coordinates yourself — recalculate against exact panel pixel dimensions
- Do not use `#FFFFFF` pure white as the card shell — use `#F2F5F7`
- Do not use the Gold color (#D99700 range) — the 5th deck color is Yellow (#FFFD74 range)
- Do not use purple gradients — not in the 5-color palette
- Do not use Space Grotesk or Satoshi — Inter only
- Do not add stats, metadata, or marketing copy to cards
