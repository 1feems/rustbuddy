# Rust Flashcards — Visual Design Document

Date: 2026-06-10  
Status: Canonical design direction for card proof and one-page build

## 1. Design Target

The current implementation must not look like a generic vocabulary app card.

Three reference files define this design. All three must be read before touching the proof or the one-page build.

**Card structure reference** — layout, silhouette, clip cuts, label placement, footer:
```text
game/ChatGPT Image Jun 10, 2026, 04_27_38 PM.png
```

**Gradient and font style reference** — matte printed gradients, heavy bold type feel:
```text
game/archive/design 1.webp
```

**Page layout reference** — overall page composition, dark background, card grid spacing:
```text
game/archive/layout1.jpg
```

The card structure comes from the ChatGPT image. The gradient treatment and font weight come from design 1.webp. The page composition comes from layout1.jpg.

Reference mapping (design 1.webp → Rust flashcard):

| Reference Element | Rust Flashcard Element |
|---|---|
| `2024` label | `Rust` label |
| 3D object | Rust concept symbol |
| `ZEUS` title | Rust term |
| Stats and metadata | Removed |
| White footer/title strip | Preserved |

If a card looks like a software vocabulary card, it is wrong.

If a card looks like a collectible card from the same family as `design 1.webp`, it is correct.

## 2. Required Card Silhouette

Preserve:

- collectible card silhouette;
- white outer shell;
- top-left tab cut;
- bottom-right diagonal cut;
- white footer strip;
- tall collectible ratio.

Do not:

- redesign the card into a modern dashboard card;
- make the card square;
- color the outer shell;
- color the footer;
- add stats or metadata;
- center the term inside the colored panel.

## 3. Card Anatomy

Front card:

```text
white shell
┌─────────────────────────┐
│ Rust                    │  small label in white tab
│   clipped color panel   │
│                         │
│       concept symbol    │  main visual subject
│                         │
│                  cut ───│
│ STRUCT                  │  term in white footer
└─────────────────────────┘
```

Back card:

```text
white shell
┌─────────────────────────┐
│ Rust                    │
│ clipped pale panel      │
│ STRUCT                  │
│ MEANING                 │
│ text                    │
│ WHEN TO USE IT          │
│ text                    │
│ EXAMPLE                 │
│ code/text               │
└─────────────────────────┘
```

## 4. Sizing

The card ratio should visually match `design 1.webp`.

Use these V1 dimensions:

| Token | Value |
|---|---:|
| `--card-w` | `260px` |
| `--card-h` | `360px` |
| `--shell-pad` | `10px` |
| `--footer-h` | `62px` |
| `--radius-card` | `6px` |
| `--radius-panel` | `10px` |

Footer rule:

- Footer is approximately 15–18% of total card height.
- Footer remains white.
- Footer contains only the Rust term.

## 5. Color And Gradients

Page background:

```css
--page-bg: #f1efea;
```

Shell and ink:

```css
--card-shell: #ffffff;
--ink: #0b0d12;
```

Gradient treatment:

- Apply gradients only to the clipped colored panel.
- Do not apply gradients to the full card.
- Do not apply gradients to the footer.
- Do not apply gradients to the outer shell.

Gradient style:

- matte;
- printed;
- low saturation;
- multiple gradient stops;
- soft transitions;
- visible enough to read as gradient, not flat fill.

Avoid:

- flat fills;
- neon gradients;
- SaaS gradients;
- glassmorphism;
- glow effects;
- grey card fronts.

Primary purple gradient — use the multi-layer version from the proof, not a flat linear:

```css
--grad-purple:
  radial-gradient(circle at 50% 38%, rgba(255,255,255,.20) 0%, rgba(255,255,255,0) 31%),
  linear-gradient(145deg, #6b57df 0%, #8064e4 32%, #9b72df 66%, #c6a3ef 100%);
```

The radial layer adds a subtle highlight at the top of the panel — this is what gives it the printed/matte depth that separates it from a flat fill.

Panel depth overlay — apply as `::after` on the color panel:

```css
.card-panel::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(145deg, rgba(255,255,255,.10), transparent 34%),
    linear-gradient(315deg, rgba(0,0,0,.12), transparent 48%);
  pointer-events: none;
}
```

This adds a light catch at the top-left and a subtle shadow at the bottom-right — the same depth the reference card has.

Additional gradients may be created by category, but each must follow the same multi-layer treatment (radial highlight + linear base + ::after overlay). Do not add grey front-card gradients.

## 6. Typography

Use the same family direction as the reference: bold, condensed-feeling display text with compact labels.

Font stack:

```css
font-family: "Space Grotesk", "Satoshi", "Neue Montreal", Inter, system-ui, sans-serif;
```

Type scale for `260px × 360px` cards:

| Element | Size | Weight | Line Height | Letter Spacing |
|---|---:|---:|---:|---:|
| Top label `Rust` | `9px` | `800` | `1` | `0` |
| Front term | `30px` | `900` | `.9` | `-0.04em` |
| Back title | `28px` | `900` | normal | `-0.04em` |
| Back section heading | `10px` | `900` | normal | `0` |
| Back body/code | `12px` | regular | `1.35` | `0` |

Rules:

- `Rust` label should feel like the small `2024` label.
- `Rust` label must not look like a large title.
- Front title replaces `ZEUS`.
- Back text should be readable but compact.
- Do not use oversized reading-card body text.

## 7. Icon Treatment

**Per-concept geometric icons — one icon per Rust term.**

Style reference: `game/icons.jpg` — bold Bauhaus-style geometric shapes, flat two-color fills (dark teal + green in the reference image, but rendered white/off-white on the card gradient panel).

Each card gets a unique icon that relates to its concept. Icon assignment must be done before the full deck is built.

Icon rendering:

- Draw icons as original inline SVG — do not crop or use `icons.jpg` directly (third-party iStock image, style reference only).
- Use simple geometric shapes: circles, triangles, squares, half-circles, wedges, lines.
- Style from the reference: bold, flat, two-shape maximum per icon.
- Card color: `rgba(255, 253, 245, 0.94)` — off-white, not pure white.
- Scale to approximately 48% of the colored panel width.
- `filter: drop-shadow(0 18px 20px rgba(0,0,0,.22))` — gives depth.
- Center in the panel.
- It should feel like an object on a collectible card, not a UI glyph.

`game/favicons.png` is a file-type sprite sheet — do not use for card icons.

Avoid:

- thin line icons;
- emoji;
- full-color clip art;
- random shapes with no concept connection;
- icons plus text inside the panel.

## 8. Page Layout

The page is a centered gallery of cards.

Use:

- warm light-grey background `#F1EFEA`;
- 3-column centered gallery on desktop;
- large spacing between cards;
- card grid as the primary page content.

Do not use:

- dashboard feel;
- sidebar;
- search;
- filters;
- hero section;
- CTA section;
- product metrics;
- marketing footer.

Gallery CSS:

```css
.gallery {
  max-width: 920px;
  margin: 0 auto;
  padding: 48px 40px;
  display: grid;
  grid-template-columns: repeat(3, var(--card-w));
  gap: 40px 36px;
  justify-content: center;
}
```

Responsive behavior:

```css
@media (max-width: 980px) {
  .gallery {
    grid-template-columns: repeat(2, var(--card-w));
  }
}

@media (max-width: 620px) {
  .gallery {
    grid-template-columns: 1fr;
  }

  .flashcard {
    margin: 0 auto;
  }
}
```

## 9. Canonical CSS Anatomy

Use this structure for the proof page and the one-page build.

```css
:root {
  --page-bg: #f1efea;
  --card-shell: #ffffff;
  --ink: #0b0d12;

  --card-w: 260px;
  --card-h: 360px;
  --shell-pad: 10px;
  --footer-h: 62px;

  --radius-card: 6px;
  --radius-panel: 10px;

  /* Multi-layer gradient — radial highlight + linear base.
     This is what produces the printed/matte depth matching design 1.webp.
     Do NOT simplify to a single linear-gradient. */
  --grad-purple:
    radial-gradient(circle at 50% 38%, rgba(255,255,255,.20) 0%, rgba(255,255,255,0) 31%),
    linear-gradient(145deg, #6b57df 0%, #8064e4 32%, #9b72df 66%, #c6a3ef 100%);

  /* Back panel — pale version of the front */
  --grad-purple-back:
    radial-gradient(circle at 50% 32%, rgba(255,255,255,.42) 0%, rgba(255,255,255,0) 34%),
    linear-gradient(145deg, #e6ddfb 0%, #eee5fb 50%, #f7f1ff 100%);

  /* Clip — 7-point polygon preserving the top-left tab and bottom-right cut */
  --clip: polygon(15% 0%, 100% 0%, 100% 88%, 88% 100%, 0% 100%, 0% 13%, 8% 13%);
}

body {
  margin: 0;
  background: var(--page-bg);
  font-family: "Space Grotesk", "Satoshi", "Neue Montreal", Inter, system-ui, sans-serif;
  color: var(--ink);
}

.gallery {
  max-width: 920px;
  margin: 0 auto;
  padding: 48px 40px;
  display: grid;
  grid-template-columns: repeat(3, var(--card-w));
  gap: 40px 36px;
  justify-content: center;
}

.flashcard {
  width: var(--card-w);
  height: var(--card-h);
  border: 0;
  padding: 0;
  background: transparent;
  perspective: 1000px;
  cursor: pointer;
}

.flashcard-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 420ms cubic-bezier(0.2, 0.7, 0.2, 1);
}

.flashcard[aria-pressed="true"] .flashcard-inner,
.flashcard.is-flipped .flashcard-inner {
  transform: rotateY(180deg);
}

.flashcard-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  background: var(--card-shell);
  border-radius: var(--radius-card);
  padding: var(--shell-pad);
  box-shadow: 0 12px 28px rgba(0,0,0,.14);
  overflow: hidden;
}

.flashcard-back {
  transform: rotateY(180deg);
}

/* FRONT */
.card-front {
  display: grid;
  grid-template-rows: 1fr var(--footer-h);
}

/* ONLY THIS PANEL GETS COLOR */
.card-panel {
  position: relative;
  background: var(--grad-purple);
  border-radius: var(--radius-panel);
  clip-path: var(--clip);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Depth overlay — light catch top-left, shadow bottom-right */
.card-panel::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(145deg, rgba(255,255,255,.10), transparent 34%),
    linear-gradient(315deg, rgba(0,0,0,.12), transparent 48%);
  pointer-events: none;
}

/* Rust label is a child of .card-front, NOT .card-panel.
   Positioned in the white tab the clip-path exposes — never touches the gradient. */
.card-label {
  position: absolute;
  top: 4px;
  left: 5px;
  z-index: 2;
  font-size: 9px;
  font-weight: 800;
  line-height: 1;
  color: var(--ink);
  text-transform: uppercase;
}

.card-icon {
  width: 118px;
  height: 118px;
  color: rgba(255,255,255,.92);
  filter: drop-shadow(0 10px 18px rgba(0,0,0,.16));
  opacity: .95;
}

/* footer stays white */
.card-footer {
  background: var(--card-shell);
  display: flex;
  align-items: center;
  padding: 0 10px;
}

.card-title {
  font-size: 30px;
  font-weight: 900;
  line-height: .9;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  color: var(--ink);
}

/* BACK */
.back-panel {
  height: 100%;
  padding: 28px 20px;
  border-radius: var(--radius-panel);
  clip-path: var(--clip);
  background: var(--grad-purple-back);
}

.back-title {
  margin: 38px 0 22px;
  font-size: 28px;
  font-weight: 900;
  letter-spacing: -0.04em;
  text-transform: uppercase;
}

.back-section {
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px solid rgba(11,13,18,.16);
}

.back-section:first-of-type {
  border-top: 0;
  padding-top: 0;
}

.back-section h3 {
  margin: 0 0 8px;
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
}

.back-section p,
.back-section code {
  margin: 0;
  font-size: 12px;
  line-height: 1.35;
}
```

## 10. Content Source

Use this vocabulary source first:

```text
lessons/solana/rust-for-solana/VOCABULARY.md
```

Mapping:

| Vocabulary Field | Card Placement |
|---|---|
| `Term` | Front footer title and back title |
| `What it is` | Back `Meaning` |
| `When it's used` | Back `When to use it` |

Do not scrape additional study guides for V1 unless requested.

## 11. Visual Test

Before approving a mockup or page, compare every card against:

```text
game/archive/design 1.webp
```

Checklist:

- Does it preserve the collectible-card silhouette?
- Is the outer shell white?
- Is the footer white?
- Is the top-left label small like `2024`?
- Is the gradient only on the clipped panel?
- Does the panel read as matte printed gradient, not flat fill?
- Is the concept symbol the main visual subject?
- Does the icon feel like an object, not a tiny UI glyph?
- Does the term replace `ZEUS` in the footer?
- Are stats and metadata removed?
- Does the page avoid dashboard/search/filter patterns?

If any answer fails, revise the design before building the one-pager.
