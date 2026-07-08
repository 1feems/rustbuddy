# Rust Buddy — Design Tokens

All tokens live in `_design/styles.css`. This doc explains what each one does and where it's used.

To change something: find the token below, tell Claude the new value, Claude updates `styles.css`, commit and push — live on Vercel.

---

## Colors

| Token | Value | Used For |
|---|---|---|
| `--color-bg` | `#FFFFFF` | Page background on every page |
| `--color-surface` | `#1E1E1A` | Dark panel backgrounds (code blocks, dark cards) |
| `--color-primary` | `#FF7657` | Logo "Rust Buddy", accents, active states |
| `--color-secondary` | `#C5E94E` | Nav pills, hero label pills, badges |
| `--color-ink` | `#171714` | All primary text |
| `--color-muted` | `#77766F` | Secondary text, breadcrumbs, descriptions |
| `--color-border` | `#171714` | Hard 1px borders (used sparingly) |
| `--color-card-shell` | `#F2F5F7` | Flashcard card shell background |

---

## Home Page Card Gradients

| Token | Used For |
|---|---|
| `--grad-card-exercises` | Exercises card on home page (pastel orange) |
| `--grad-card-flashcards` | Flashcards card on home page (light lime) |
| `--grad-card-resources` | Resources card on home page (pastel pink) |

---

## Flashcard Deck Gradients

Each deck has its own gradient. Decks 07+ repeat from Lime.

| Token | Color | Decks |
|---|---|---|
| `--grad-deck-lime` | Lime | Values (01), Strings (07), Option (12) |
| `--grad-deck-purple` | Purple | Symbols (02) |
| `--grad-deck-orange` | Orange | Types (03), Slices (08), Flow (13) |
| `--grad-deck-cyan` | Cyan | Functions (04), Tuples (09) |
| `--grad-deck-pink` | Pink | Ownership (05), Structs (10) |
| `--grad-deck-yellow` | Yellow | Borrowing (06), Enums (11) |

---

## Typography

| Token | Value | Used For |
|---|---|---|
| `--font-family` | Inter, system-ui, sans-serif | All text on the site |
| `--font-size-logo` | 16px | "Rust Buddy" logo text |
| `--font-size-nav` | 11px | Nav pill links |
| `--font-size-hero-home` | 68px | Home page hero title |
| `--font-size-hero-landing` | clamp(36px, 4vw, 58px) | Landing page hero titles |
| `--font-size-card-title` | 26px | Home page card titles |
| `--font-size-card-label` | 10px | Home page card labels |
| `--font-size-card-desc` | 12px | Home page card descriptions |
| `--font-size-body` | 14px | Body text, hero descriptions |
| `--font-size-code` | 13px | Code blocks |
| `--font-weight-regular` | 400 | Body text |
| `--font-weight-medium` | 500 | Breadcrumb section name |
| `--font-weight-bold` | 700 | Nav links, hero labels, hero titles |
| `--font-weight-heavy` | 800 | Logo, card titles |

---

## Spacing

Base unit: 12px

| Token | Value | Used For |
|---|---|---|
| `--space-xs` | 4px | Tight gaps, icon margins |
| `--space-sm` | 12px | Base rhythm unit |
| `--space-md` | 16px | Card internal spacing |
| `--space-lg` | 24px | Section top padding |
| `--space-xl` | 32px | Card padding, section gaps |
| `--space-2xl` | 48px | Page bottom padding |
| `--space-hero-gap` | 56px | Home page: hero to cards |
| `--space-card-gap` | 32px | Home page: between cards |

---

## Shadows

| Token | Used For |
|---|---|
| `--shadow-card-hover` | Home page cards on hover |
| `--shadow-deck-hover` | Flashcard deck cards on hover |
| `--shadow-panel-subtle` | Subtle panel lift |

---

## Motion

| Token | Value | Used For |
|---|---|---|
| `--transition-duration` | 200ms | All transitions |
| `--transition-easing` | ease | All transitions |
| `--transition-default` | transform + filter 200ms ease | Card and deck hover transitions |
| `--hover-lift` | translateY(-4px) | Card hover lift effect |

---

## Layout

| Token | Value | Used For |
|---|---|---|
| `--nav-padding` | 16px 40px | Nav header padding |
| `--hero-padding` | 24px 40px 28px | Landing page hero section |
| `--cards-padding` | 24px 40px 80px | Cards section below hero |
| `--hero-max-width` | 1400px | Max width for hero content |
| `--hero-desc-max-width` | 360px | Max width for hero description text |
| `--card-width` | 300px | Home page card width (fixed) |
| `--card-height` | 480px | Home page card height (fixed) |
| `--card-padding` | 32px | Home page card padding |

---

## Nav Pills

| Token | Value | Used For |
|---|---|---|
| `--pill-bg` | lime (`--color-secondary`) | Pill background |
| `--pill-color` | ink (`--color-ink`) | Pill text |
| `--pill-padding` | 5px 14px | Pill padding |
| `--pill-border-radius` | 20px | Pill rounding |
| `--pill-font-size` | 11px | Pill text size |
| `--pill-font-weight` | 700 | Pill text weight |
| `--pill-gap` | 8px | Gap between pills |
