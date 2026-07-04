# Rust Bud — Exercise Pages Wireframe Reference

Date: 2026-06-26
Last updated: 2026-06-26 (final layout confirmed from variables.html)
Status: Approved — variables.html is the canonical template

---

## Site Name

**Rust Bud**

---

## Page 1 — Rust: Exercises (Index)

The entry point for all exercise topics. Modelled on SQLNoir's Case Files page.
Each topic is a card. Click a card to enter that topic's exercise page.

```
┌─────────────────────────────────────────────────────────────────┐
│  Rust Bud                                                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Rust: Exercises                                                 │
│                                                                  │
│  ┌──────────────────┐  ┌──────────────────┐  ┌───────────────┐  │
│  │ Variables        │  │ Functions        │  │ Ownership     │  │
│  │                  │  │                  │  │               │  │
│  │ Every value has  │  │ Reusable blocks  │  │ Every value   │  │
│  │ a name and a     │  │ of code that     │  │ has one owner.│  │
│  │ type. Rust makes │  │ take inputs and  │  │ When its gone,│  │
│  │ you explicit     │  │ return outputs.  │  │ so is the     │  │
│  │ about both.      │  │                  │  │ value.        │  │
│  └──────────────────┘  └──────────────────┘  └───────────────┘  │
│                                                                  │
│  ┌──────────────────┐  ┌──────────────────┐  ┌───────────────┐  │
│  │ Borrowing        │  │ Structs          │  │ Enums         │  │
│  │ ...              │  │ ...              │  │ ...           │  │
│  └──────────────────┘  └──────────────────┘  └───────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Card content
- **Title:** topic name (Variables, Functions, Ownership, etc.)
- **Description:** one line, plain English, no em dashes
- **Click:** goes to that topic's exercise page

### Topics (in order)
| Topic | One-line description |
|---|---|
| Variables | Every value has a name and a type. Rust makes you explicit about both. |
| Numbers | Every number has a size and a sign. Rust makes you choose the right type for the job. |
| Chars, Bools & Unit Types | Single characters, true/false flags, and the empty return type — the small types that appear everywhere. |
| Statements & Expressions | A semicolon decides whether a line produces a value or throws it away. |
| Functions | Reusable blocks of code that take inputs and return outputs. |
| Ownership | Every value has one owner. When the owner is gone, so is the value. |
| Borrowing | Let another part of the code use a value without giving it away. |
| String vs &str | Two ways to hold text. One owns it, one just points to it. |
| Slices | A view into part of a collection, without copying anything. |
| Tuples | Group a fixed set of values of different types into one unit. |
| Structs | Group related fields together into one named type. |
| Enums | A value that can be one of several fixed variants. |
| Option | A value that either exists (Some) or doesn't (None). |
| Flow Control | if, loop, match. How Rust decides what to run next. |

---

## Page 2 — Exercise Page (per topic)

One page per topic. `variables.html` is the template — duplicate it for each new topic.

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Rust Bud  /  Rust: Variables                                  │
├──────────────────────────────────────────────────────────────────┤
│  [Overview]  [Exercises]  [Answers]  [Terms to Know]             │
├──────────────────────────────────────────────────────────────────┤
│  [Ex 1] [Ex 2] [Ex 3] [Ex 4] [Ex 5]                             │
├─────────────────────────────┬────────────────────────────────────┤
│                             │  ● Rust Playground          [bar]  │
│  EXERCISE 1 OF 5            │──────────────────────────────────  │
│  Binding                    │                                    │
│                             │  fn main() {                       │
│  [explainer paragraph(s)]   │      let x: i32;                  │
│                             │      assert_eq!(x, 5);            │
│  ─────────────────          │      println!("Success!");        │
│  YOUR TASK                  │  }                                 │
│                             │                                    │
│  The code below wants to:   │  [RUN]  [DEBUG]  [SHARE]          │
│  1. Set x to 5              │                                    │
│  2. Assert it equals 5      │  ─────────────────────────────    │
│  3. Print Success!          │  Standard Output                   │
│                             │  Success!                          │
│  Right now it fails         │                                    │
│  because x was never        │                                    │
│  given a value.             │                                    │
│                             │                                    │
│  [starter code block]       │                                    │
│                             │                                    │
│  Fix this so it compiles    │                                    │
│  and prints Success!        │                                    │
│                             │                                    │
│  EXPECTED OUTPUT            │                                    │
│  Success!                   │                                    │
│                             │                                    │
└─────────────────────────────┴────────────────────────────────────┘
```

### Left panel (scrollable)
1. Kicker: `Exercise N of 5`
2. Title: concept name (e.g. Binding)
3. Explainer: 1-3 plain English paragraphs — what the concept is, why it matters in contracts
4. Divider rule
5. `YOUR TASK` label
6. Task body: what the code wants to do (numbered list) + what's currently broken
7. Starter code block (dark, monospace) — the broken code to fix
8. Fix instruction (bold) — e.g. "Fix this so it compiles and prints `Success!`"
9. `EXPECTED OUTPUT` label + output value

### Right panel
- Dark bar at top: orange dot + "Rust Playground" label (our design)
- Below: official Rust Playground iframe (`play.rust-lang.org`), pre-loaded with starter code
- URL format: `https://play.rust-lang.org/?version=stable&edition=2021&code=<URL_ENCODED>`
- Do NOT include `mode=debug` — it changes the button from RUN to BUILD

### Exercise count per page
- 5 exercises per HTML page
- Exercises 1-4: isolated concept exercises (fix/fill/write) — pure Rust, no Solana
- Exercise 5: Build exercise — applies the concept to the subscription payment contract
- Note: the .md source files have 6 exercises (5 pure Rust + 6th contract). HTML uses exercises 1-4 + exercise 6 from the .md.

### Tab behaviour

**Overview**
- Topic name + one-line description (same text used on the index page card)
- Quick Reference table: Concept | What it means
- Content pulled from the top of the matching .md exercise file

**Exercises (default)**
- Sub-nav: pill buttons — Exercise 1 through Exercise 5
- Active button: orange (#FF7657), inactive: dark surface (#1E1E1A)
- Clicking a button updates left panel content and reloads the iframe with that exercise's starter code
- Layout is always side-by-side (static)

**Answers (own full-width view)**
- All 5 answers listed vertically
- Each: card with exercise title, corrected code block (dark), "Why" explanation
- No iframe

**Terms to Know (own full-width view)**
- Table: Term | What it means | When you use it
- Content sourced from `game/KEY-TERMS.md`, matching section for that topic
- No iframe

---

## Exercise 5 — Contract Through-Line

Exercise 5 on every page builds the same Solana subscription payment contract, one concept at a time. By Exercise 5 of Flow Control, the user has assembled a complete mini-contract.

| Topic | Exercise 5 adds |
|---|---|
| Variables | Declare wallet, amount, plan, is_active with correct types |
| Functions | Write a function that validates the payment amount |
| Ownership | Pass the wallet address into a function correctly |
| Borrowing | Borrow the wallet to read it without taking ownership |
| String vs &str | Store the plan name as the correct string type |
| Slices | Work with a list of subscribers |
| Tuples | Bundle treasury and creator share into one value |
| Structs | Package all contract data into a Subscription struct |
| Enums | Add a PlanType enum (Basic, Pro, Enterprise) |
| Option | Make the wallet optional until the subscriber connects |
| Flow Control | Add validation logic — if amount is valid, process payment |

---

## Duplication Rule

`variables.html` is the template. For each new topic:
1. Copy `variables.html` and rename (e.g. `functions.html`)
2. Update the page `<title>` and header title
3. Replace the `exercises` JS array with content from `game/exercises/[topic].md`
4. Replace the Terms table with the matching section from `game/KEY-TERMS.md`
5. Do not change the layout, CSS, or tab/subnav logic

---

## Layout Rules

- Page title format: `Rust: [Topic]`
- No em dashes anywhere in content — use a plain hyphen or reword
- Side-by-side split is static — only the Exercises tab uses it
- Answers and Terms to Know are full-width single views
- Sub-nav (numbered exercises) is only visible on the Exercises tab
- One HTML file per topic — naming: `variables.html`, `functions.html`, etc.
- All exercise HTML pages live in `game/`
- Exercise content source files live in `game/exercises/`
- Terms source: `game/KEY-TERMS.md`

---

## Design Reference

All visual styling follows `game/DESIGN_SYSTEM.md` — Creative Cards tokens.
Do not invent styles. If something is not in DESIGN_SYSTEM.md, add it there first.
