# Rust Bud — Design System

Date: 2026-06-26
Status: Active — apply to all Rust Bud web pages

Source: `game/Creative-Cards-DESIGN.md` — this document adapts those tokens for the Rust Bud website.

**Scope:** Website — exercise pages, index, game levels, and flashcard pages.
**Flashcard card shape + layout:** `game/_design/rust-flashcards-visual-design.md`
**Flashcard colors:** defined in this doc under Flashcard Deck Colors below.

---

## Colors

```css
--color-bg:         #FFFFFF;   /* page background */
--color-surface:    #1E1E1A;   /* dark card / panel surface */
--color-primary:    #FF7657;   /* orange — tabs, accents, active states, links */
--color-secondary:  #DFFF65;   /* lime — secondary accents, badges */
--color-tertiary:   #F97316;   /* supporting contrast moments */
--color-ink:        #171714;   /* primary text */
--color-muted:      #77766F;   /* secondary text, labels */
--color-border:     #171714;   /* hard 1px borders */
--color-border-dim: rgba(255,255,255,0.2); /* borders on dark surfaces */
```

---

## Typography

Font: **Inter** (single family across the site)

```css
font-family: "Inter", system-ui, sans-serif;
```

| Role | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|
| Display / hero | 68px | 500 | 68px | -0.05em |
| Page title | 36px | 600 | 1.1 | -0.03em |
| Section heading | 24px | 600 | 1.2 | -0.02em |
| Card title | 18px | 600 | 1.3 | -0.01em |
| Body | 14px | 400 | 22.75px | 0 |
| Label / kicker | 11px | 700 | 1 | 0.08em (uppercase) |
| Code | "SF Mono", "Fira Code", monospace — 13px | 400 | 1.7 | 0 |

---

## Surfaces & Cards

### Light surface (page level)
```css
background: var(--color-bg);   /* #FFFFFF */
```

### Dark card surface
```css
background: #1E1E1A;
border: 1px solid rgba(255,255,255,0.2);
border-radius: 20px;
padding: 16px;
box-shadow: 0px 25px 50px -12px rgba(0,0,0,0.25);
```

### Gradient border shell (premium depth treatment)
Wrap card in an outer shell with gradient border instead of flat stroke:
```css
.card-shell {
  padding: 1px;
  border-radius: 21px;   /* 1px larger than inner card */
  background: linear-gradient(
    to right bottom,
    rgba(255,255,255,0.8),
    rgba(255,255,255,0.2),
    rgba(0,0,0,0.05)
  );
}
.card-inner {
  background: #1E1E1A;
  border-radius: 20px;
  padding: 16px;
}
```

---

## Spacing

Base unit: **12px**

| Token | Value |
|---|---|
| `--space-xs` | 4px |
| `--space-sm` | 12px |
| `--space-md` | 16px |
| `--space-lg` | 24px |
| `--space-xl` | 32px |
| `--space-2xl` | 48px |
| `--gap-card` | 16px |
| `--gap-section` | 32px |

---

## Border Radius

```css
--radius-sm:   4px;    /* inputs, tags */
--radius-md:   20px;   /* cards */
--radius-lg:   32px;   /* large panels */
--radius-pill: 9999px; /* badges, chips */
```

---

## Elevation & Shadows

```css
/* Card */
box-shadow:
  0px 20px 25px -5px rgba(0,0,0,0.10),
  0px 8px 10px -6px rgba(0,0,0,0.10);

/* Subtle */
box-shadow: 0px 8px 30px 0px rgba(0,0,0,0.04);

/* Minimal */
box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.05);
```

---

## Borders

```css
/* Hard border — used on cards, panels */
border: 1px solid #171714;

/* Dim border — used on dark surfaces */
border: 1px solid rgba(255,255,255,0.2);

/* Rule — dividers */
border-top: 1px solid rgba(23,23,20,0.12);
```

---

## Motion

| Property | Value |
|---|---|
| Default duration | 300ms |
| Emphasis duration | 700ms |
| Easing | `ease` |
| Hover transform | `translateY(-2px)` |
| Transition shorthand | `all 300ms ease` |

---

## Component Patterns

### Tab bar
- Active tab: `--color-primary` (`#FF7657`) underline or background
- Inactive: `--color-muted` text, no underline
- Border bottom on bar: `1px solid #171714`

### Exercise topic card (index page)
- Surface: `#1E1E1A` dark
- Title: white, 18px, weight 600
- Description: `#77766F`, 14px
- Hover: `translateY(-2px)`, shadow increase
- Border: `1px solid rgba(255,255,255,0.2)`
- Radius: 20px

### Code block
- Background: `#1E1E1A` (same as card surface)
- Text: `#c9d1e3`
- Font: "SF Mono", "Fira Code", monospace, 13px
- Radius: 12px
- Padding: 20px

### Active exercise button (sub-nav)
- Active: `#FF7657` background, white text
- Inactive: `#1E1E1A` surface, `#77766F` text
- Radius: `--radius-pill` (9999px)

---

## Flashcard Deck Colors

Flashcard shell: `#F2F5F7` (hint-of-blue-white — not pure white, not dark).

Five deck colors cycle in order for front panels. Each has a pale back variant.

| Deck | Name | Front gradient | Back gradient |
|---|---|---|---|
| 01 | Lime | `135deg, #A8D92F 0%, #C5E94E 34%, #DAF06F 68%, #EFF8A7 100%` | `135deg, #DCF5A8 0%, #EDFCCB 100%` |
| 02 | Orange | `135deg, #FF7657 0%, #F97316 50%, #E85D04 100%` | `135deg, #FFE8E0 0%, #FFF5F0 100%` |
| 03 | Cyan | `135deg, #14A6C8 0%, #35BFDA 40%, #A8EDF0 100%` | `135deg, #D0F3FA 0%, #EDFBFD 100%` |
| 04 | Pink | `135deg, #DE4775 0%, #EA6689 40%, #F6A56F 100%` | `135deg, #FAD5E0 0%, #FDF0F5 100%` |
| 05 | Yellow | `135deg, #E8C800 0%, #F5DC3A 40%, #FFFD74 100%` | `135deg, #FFFACC 0%, #FFFDE8 100%` |

Colors repeat from Lime for decks 06–13. Deck 5 is Yellow — not Gold.

---

## Do's and Don'ts

### Do
- Use `#FF7657` orange as the single primary accent — active states, links, highlights
- Keep all spacing on the 12px base rhythm
- Use hard `1px #171714` borders on light surfaces
- Use `rgba(255,255,255,0.2)` borders on dark surfaces
- Keep card radius at 20px

### Don't
- Don't use the flashcard gradients (purple, blue) on the website UI
- Don't use `#F1EFEA` as any background — old design, retired
- Don't use Space Grotesk — Inter only across the whole site
- Don't introduce extra accent colors outside the palette
- Don't mix shadow recipes
