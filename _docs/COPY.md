# Rust Buddy — Website Copy

Last updated: 2026-07-03
Status: Active — source of truth for all page-level copy

---

## Copy Rules

- Hero titles are always one line — no `<br>` tags
- "Rust Buddy" logo text is always orange (#FF7657), never black
- Page label pills: lime (#C5E94E), black text, uppercase, 11px/700
- Subtext is always muted (#77766F), 14px, max-width 360px
- No em dashes — use commas or rephrase

---

## 1.0 Home (`/index.html`)

**Hero title:** Learn Rust. One challenge at a *time.*
- "time." renders in orange (#FF7657)

**Tagline:** Strengthen your Rust fundamentals with interactive exercises, flashcards, and concise learning resources.

### Product Cards

| Card | Label | Title | Description |
|---|---|---|---|
| Exercises | 01 / Exercises | Practice with purpose. | Build confidence through guided Rust exercises that reinforce each concept one step at a time. |
| Flashcards | 02 / Flashcards | Remember more. | Review key Rust terms and concepts with flashcards designed to improve recall and reinforce your learning. |
| Resources | 03 / Resources | Learn with clarity. | Explore concise explanations, cheat sheets, and reference material whenever you need a deeper understanding. |

---

## 2.0 Exercises Landing (`/exercises/index.html`)

**Page label (pill):** Rust Exercises

**Hero title:** Learn by building.

**Hero subtext:** Learn Rust through interactive exercises that let you practice each concept as you go.

### Exercise Pages

| # | Title | File |
|---|---|---|
| 2.1 | Variables | `exercises/variables.html` |
| 2.2 | Numbers | `exercises/numbers.html` |
| 2.3 | Chars & Bools | `exercises/chars-bools.html` |
| 2.4 | Statements & Expressions | `exercises/statements-expressions.html` |
| 2.5 | Functions | `exercises/functions.html` |
| 2.6 | Ownership | `exercises/ownership.html` |

### Exercise Landing Cards

Copy for each card on the exercises landing page. Descriptions must be one sentence, 10th grade plain English, no em dashes.

| # | Title | Card description |
|---|---|---|
| 2.1 | Variables | Variables let you store a value and give it a name so you can use it in your code. |
| 2.2 | Numbers | Rust has separate types for whole numbers and decimals, and each one has a fixed size. |
| 2.3 | Chars & Bools | A char holds a single character and a bool holds true or false. |
| 2.4 | Statements & Expressions | Expressions return a value and statements do not. This difference shapes how Rust reads your code. |
| 2.5 | Functions | A function takes inputs, runs code, and hands a value back. Return types, diverging functions, and match. |
| 2.6 | Ownership | Every value has exactly one owner. Learn how move, clone, and copy control who holds a value. |
| 2.7 | Borrowing | Borrowing lets you use a value without taking ownership. Learn references, the borrow checker, and lifetimes. |
| 2.8 | String vs &str | Rust has two string types. String owns its data and can grow. &str is a borrowed slice used for reading. |
| 2.9 | Slices | A slice is a borrowed view into part of a collection. Work with arrays and strings without copying data. |
| 2.10 | Tuples | A tuple groups values of different types. Learn indexing, destructuring, and nested tuples. |
| 2.11 | Structs | A struct is a custom type that groups named fields. Learn methods, field shorthand, and struct update syntax. |
| 2.12 | Enums | An enum represents one of several named variants. Learn how to store data inside variants and model state. |
| 2.13 | Option | Option is how Rust handles values that might not exist. Use Some and None instead of null. |
| 2.14 | Flow Control | Control which code runs and when. Learn if, all three loop types, match, and if let. |

**Exercise content source:** Each exercise page pulls from its matching `.md` file in `game/exercises/`. Inner copy (tasks, code, answers) lives there, not here.

---

## 3.0 Flashcards Landing (`/flashcards/index.html`)

**Page label (pill):** Rust Flashcards

**Hero title:** Make it stick.

**Hero subtext:** Learn the key terms and definitions behind every Rust topic.

### Flashcard Decks

| # | Deck | Gradient | File | Status |
|---|---|---|---|---|
| 3.1 | Values | Lime | `flashcards/values.html` | ✅ Live |
| 3.2 | Symbols | Purple | `flashcards/symbols.html` | ✅ Live |
| 3.3 | Types | Orange | `flashcards/types.html` | ✅ Live |
| 3.4 | Functions | Cyan | `flashcards/functions.html` | ✅ Live |
| 3.5 | Ownership | Pink | `flashcards/ownership.html` | ✅ Live |
| 3.6 | Borrowing | Yellow | `flashcards/borrowing.html` | ✅ Live |
| 3.7 | Strings | Lime | `flashcards/strings.html` | 🔲 Not built |
| 3.8 | Slices | Orange | `flashcards/slices.html` | 🔲 Not built |
| 3.9 | Tuples | Cyan | `flashcards/tuples.html` | 🔲 Not built |
| 3.10 | Structs | Pink | `flashcards/structs.html` | 🔲 Not built |
| 3.11 | Enums | Yellow | `flashcards/enums.html` | 🔲 Not built |
| 3.12 | Option | Lime | `flashcards/option.html` | 🔲 Not built |
| 3.13 | Flow | Orange | `flashcards/flow.html` | 🔲 Not built |

### Individual Flashcard Deck Pages

Title tag format: `[Deck Name] | Rust Flashcards`
Page hint format: `Click a card to flip it · [N] terms`

Page descriptions are the source of truth for both the deck landing card and the `page-description` on each inner page. Pull from `lessons/solana/rust-for-solana/VOCABULARY.md` — `## Deck Descriptions` section. Do not invent new descriptions.

| # | Deck | File | Gradient | Terms | Page description |
|---|---|---|---|---|---|
| 3.1 | Values | `flashcards/values.html` | Lime | 16 | Values are the pieces of data your program works with. This deck covers how to store values in variables with `let`, make them mutable with `mut`, and use common number values like integers and floating-point numbers. |
| 3.2 | Symbols | `flashcards/symbols.html` | Purple | 10 | The special characters you'll see in almost every Rust file. Knowing what each one means by sight will make reading code much faster. |
| 3.3 | Types | `flashcards/types.html` | Orange | 8 | Every value in Rust has a specific type. This deck covers the primitive types: `char` for single characters, `bool` for true or false, and numeric types like `i32`, `u32`, `f64`, and `usize`. |
| 3.4 | Functions | `flashcards/functions.html` | Cyan | 9 | Functions are reusable blocks of code that perform a task. This deck covers how to define them with `fn`, pass values as parameters, and return results. |
| 3.5 | Ownership | `flashcards/ownership.html` | Pink | 8 | Ownership is how Rust manages memory without a garbage collector. This deck covers Rust's three ownership rules: every value has one owner, ownership can move between variables, and values are automatically dropped when their owner goes out of scope. |
| 3.6 | Borrowing | `flashcards/borrowing.html` | Yellow | 8 | Borrowing lets you use a value without taking ownership. This deck covers shared and mutable references, the rules enforced by the borrow checker, and how Rust prevents dangling references. |
| 3.7 | Strings | `flashcards/strings.html` | Lime | 16 | Rust has two main string types. This deck covers `String`, which owns its data and can grow, and `&str`, a borrowed string slice used for reading text. |
| 3.8 | Slices | `flashcards/slices.html` | Orange | 8 | A slice is a borrowed view into part of a collection. This deck covers array slices, string slices, and how slices let you work with data without copying it. |
| 3.9 | Tuples | `flashcards/tuples.html` | Cyan | 13 | A tuple groups values of different types into a single compound value. This deck covers creating tuples, accessing elements with dot notation, and unpacking them with destructuring. |
| 3.10 | Structs | `flashcards/structs.html` | Pink | 19 | A struct is a custom type that groups named fields together. This deck covers how to define structs, attach methods with `impl`, and use patterns like field shorthand and struct update syntax. |
| 3.11 | Enums | `flashcards/enums.html` | Yellow | 8 | An enum is a type that can represent one of several named variants. This deck covers creating enums, storing data inside variants, and using them to model different states safely. |
| 3.12 | Option | `flashcards/option.html` | Lime | 6 | `Option` is Rust's way of representing an optional value. Instead of null, you use `Some(value)` when a value exists and `None` when it doesn't. This deck covers matching, checking, and safely unwrapping options. |
| 3.13 | Flow | `flashcards/flow.html` | Orange | 16 | Control flow determines which code runs and when. This deck covers `if`, all three loop types, `match` for pattern matching, and `if let` for simpler one-pattern matches. |

**Note on FLOW:** source vocabulary has 29 terms — trim to 16 before building. Priority terms: `if/else`, `for`, `while`, `loop`, `break`, `continue`, `match`, `pattern`, `if let`, `ranges`, `loop labels`.

**Flashcard content source:** Term definitions and page descriptions live in `lessons/solana/rust-for-solana/VOCABULARY.md`. Read the `## Flashcard Deck Map` for term counts and the `## Deck Descriptions` section for page copy. `flashcards/FLASHCARD-CONTEXT.md` has structural context (deck format, build rules) — not content.

---

## 4.0 Resources Landing (`/resources/index.html`)

**Page label (pill):** Resources

**Hero title:** Learn beyond the code.

**Hero subtext:** Explore helpful resources to help you on your Rust journey.

### Resource Pages

| # | Title | File |
|---|---|---|
| 4.1 | Rust 101 | `resources/rust-101.html` |
| 4.2 | Vocabulary | `resources/vocabulary.html` |
