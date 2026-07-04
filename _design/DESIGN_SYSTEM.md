# Rust Buddy — Design System

Last updated: 2026-06-30
Status: Active — apply to all Rust Buddy web pages

---

## Colors

```css
--color-bg:         #FFFFFF;    /* page background */
--color-surface:    #1E1E1A;    /* dark panel surface */
--color-primary:    #FF7657;    /* orange — logo, accents, active states */
--color-secondary:  #C5E94E;    /* lime — nav pills, hero labels */
--color-ink:        #171714;    /* primary text */
--color-muted:      #77766F;    /* secondary text, breadcrumbs */
--color-border:     #171714;    /* hard 1px borders (used sparingly) */
```

### Home page card gradients

| Card | Color | Gradient |
|---|---|---|
| 01 / Exercises | Pastel orange | `linear-gradient(135deg, #FFB49A 0%, #FFC282 50%, #FFD9B8 100%)` |
| 02 / Flashcards | Light lime | `linear-gradient(135deg, #CCF25F 0%, #DCFA8A 40%, #F3FFCA 100%)` |
| 03 / Resources | Pastel pink | `linear-gradient(135deg, #F07898 0%, #F59DB8 40%, #FAC8B4 100%)` |

### Flashcard deck colors (flashcards landing page)

| Deck | Name | Front gradient |
|---|---|---|
| 01 | Lime | `135deg, #A8D92F 0%, #C5E94E 34%, #DAF06F 68%, #EFF8A7 100%` |
| 02 | Orange | `135deg, #FF7657 0%, #F97316 50%, #E85D04 100%` |
| 03 | Cyan | `135deg, #14A6C8 0%, #35BFDA 40%, #A8EDF0 100%` |
| 04 | Pink | `135deg, #DE4775 0%, #EA6689 40%, #F6A56F 100%` |
| 05 | Yellow | `135deg, #E8C800 0%, #F5DC3A 40%, #FFFD74 100%` |

Flashcard card shell background: `#F2F5F7`
Deck colors repeat from Lime for decks 06+.

---

## Typography

Font: **Inter** (single family across the entire site)

```css
font-family: "Inter", system-ui, sans-serif;
```

| Role | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|
| Home hero title | 68px | 500 | 1 | -0.05em |
| Landing page hero title | clamp(36px, 4vw, 58px) | 700 | 1 | -0.04em |
| Home card title | 26px | 800 | 1.1 | -0.03em |
| Home card label | 10px | 700 | 1 | 0.08em (uppercase) |
| Home card desc | 12px | 400 | 1.6 | 0 |
| Landing hero desc | 14px | 400 | 1.6 | 0 |
| Nav link | 11px | 700 | 1 | 0.05em (uppercase) |
| Logo | 16px | 800 | 1 | -0.03em |
| Body | 14px | 400 | 22.75px | 0 |
| Code | SF Mono / Fira Code — 13px | 400 | 1.7 | 0 |

---

## Navigation

### Home page nav
No border. Logo and links sit flush on white background.

```css
/* Header */
padding: 16px 40px;
/* no border-bottom */

/* Logo "Rust Buddy" */
font-size: 16px;
font-weight: 800;
letter-spacing: -0.03em;
color: #FF7657;  /* orange */

/* Nav links — lime pills */
font-size: 11px;
font-weight: 700;
letter-spacing: 0.05em;
text-transform: uppercase;
background: #C5E94E;
color: #171714;
padding: 5px 14px;
border-radius: 20px;
gap: 8px;
```

### Landing page nav (exercises, flashcards, resources)
Same pill style. Left side shows breadcrumb: `Rust Buddy / [Section]`

```css
/* "Rust Buddy" breadcrumb link */
font-size: 16px;
font-weight: 800;
letter-spacing: -0.03em;
color: #FF7657;

/* "/" separator */
color: #77766F;
font-size: 14px;

/* Section name */
font-size: 14px;
font-weight: 500;
color: #77766F;

/* Nav links — same lime pill as home */
background: #C5E94E;
color: #171714;
padding: 5px 14px;
border-radius: 20px;
font-size: 11px;
font-weight: 700;
gap: 8px;
```

---

## Home Page Cards

Three tall portrait cards centered on the page. Full colored background with the notch clip-path shape (same shape as flashcard deck panels, scaled up).

### Dimensions

```
Width:   300px (fixed)
Height:  480px (fixed)
Gap:     32px between cards
Grid:    repeat(3, 300px), justify-content: center
Padding: 32px
```

### Clip-path (notch shape)

Derived from flashcards deck-panel path (178×215), scaled to 300×480 (scale X 1.685, scale Y 2.233):

```css
clip-path: path('M 52 0 L 282 0 a 19 25 0 0 1 19 25 L 300 404 Q 300 431 292 443 L 265 469 Q 263 480 253 480 L 19 480 a 19 25 0 0 1 -19 -25 L 0 60 L 15 60 Q 24 60 27 49 L 42 11 Q 47 0 52 0 Z');
```

To reuse at a different size, scale both coordinates sets proportionally from the original 178×215 path in `flashcards/index.html`.

### Card structure (top → bottom)

```
[card-top]   label (10px, uppercase, rgba(0,0,0,0.4)) — left
             arrow button (28×28px circle, rgba(0,0,0,0.1)) — right
[card-icon]  icon SVG centered, flex: 1
[card-bottom] title (26px, 800)
              desc (12px, 400, rgba(0,0,0,0.55))
```

### Card icons

| Card | Icon | Source |
|---|---|---|
| Exercises | Faceted diamond (outline) | minimal-logo-set.png row 4, col 2 |
| Flashcards | Stacked card panels (outline) | minimal-logo-set.png row 2, col 4 |
| Resources | Concentric rings (outline) | minimal-logo-set.png row 6, col 4 |

All icons: single-line outline style, `rgba(0,0,0,0.45)` stroke on light cards.

---

## Landing Page Hero (exercises, flashcards, resources)

Consistent across all three landing pages. Apply to any new landing page added.

```css
/* Hero section */
padding: 24px 40px 28px;
display: grid;
grid-template-columns: 1fr 1fr;
gap: 40px;
align-items: end;
max-width: 1400px;
margin: 0 auto;
/* no border-bottom */

/* Page label — lime pill */
display: inline-block;
font-size: 11px;
font-weight: 700;
letter-spacing: 0.05em;
text-transform: uppercase;
background: #C5E94E;
color: #171714;
padding: 5px 14px;
border-radius: 20px;
margin-bottom: 24px;

/* Hero title */
font-size: clamp(36px, 4vw, 58px);
font-weight: 700;
line-height: 1;
letter-spacing: -0.04em;
color: #171714;

/* Hero description */
font-size: 14px;
font-weight: 400;
line-height: 1.6;
color: #77766F;
max-width: 360px;
```

### Cards section (below hero)

```css
padding: 24px 40px 80px;
```

---

## Spacing

Base unit: **12px**

| Token | Value | Usage |
|---|---|---|
| xs | 4px | tight gaps, icon margins |
| sm | 12px | base rhythm unit |
| md | 16px | card internal spacing |
| lg | 24px | section top padding |
| xl | 32px | card padding, section gaps |
| 2xl | 48px | page bottom padding |
| hero-gap | 56px | home page: hero to cards |
| card-gap | 32px | home page: between cards |
| landing-card-gap | 16px–20px | exercise/flashcard grids |

---

## Elevation & Shadows

```css
/* Card hover */
box-shadow: 0 24px 52px -8px rgba(0,0,0,0.2);

/* Flashcard deck hover */
box-shadow: 0 20px 40px rgba(0,0,0,0.16);

/* Subtle panel */
box-shadow: 0px 8px 30px 0px rgba(0,0,0,0.04);
```

---

## Motion

| Property | Value |
|---|---|
| Duration | 200ms |
| Easing | ease |
| Card hover | `translateY(-4px)` |
| Transition | `transform 200ms ease, filter 200ms ease` |

---

## Do's and Don'ts

### Do
- Logo "Rust Buddy" is always orange (#FF7657), never black
- Nav links are always lime pills (#C5E94E) with black text
- Landing page hero labels are always lime pills — same style as nav
- Home cards are always 300×480px fixed — do not flex-stretch them
- Use the notch clip-path for any new card that matches the home card design
- Keep hero title on one line — use clamp(36px, 4vw, 58px) for sub-pages

### Don't
- Don't add border-bottom to the nav header
- Don't add border-bottom between the hero and content on landing pages
- Don't use `<br>` tags in hero titles
- Don't use Space Grotesk — Inter only
- Don't use the old #F1EFEA background — retired
- Don't add numbered labels to home cards in ALL CAPS (use "01 / Exercises" not "01 / EXERCISES")
