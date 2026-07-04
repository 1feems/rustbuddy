# Rust Buddy — Style Guide

Last updated: 2026-07-04
Status: Active — canonical voice and copy rules for all game pages

Read this alongside `_docs/COPY.md`. COPY.md has the what (exact titles and descriptions). This doc has the how (how to write anything new).

---

## Reading Level

**10th grade.** Every sentence on every page.

Rules:
- Short sentences. One idea per sentence.
- Define every term before using it. First time a term appears, explain it in plain English.
- No jargon without a definition. "Borrow checker" needs a one-line explanation the first time it appears on a page.
- Write for someone intelligent who is not technical. They can handle complexity — they cannot handle unexplained vocabulary.

---

## Tone

Smart friend, not textbook. Direct, not formal.

The voice is: clear, calm, encouraging. Not hype. Not academic. Not condescending.

| Instead of | Write |
|---|---|
| "Leverage the power of Rust's ownership model" | "Rust's ownership rules are what keep your program from running into memory problems." |
| "This concept is foundational to understanding Rust" | "You will use this in almost every Rust program you write." |
| "Please note that..." | Just say the thing. |
| "It is important to understand that..." | Just say the thing. |

---

## What to Avoid

- **Em dashes** — never. Use commas or rephrase. Find and replace every `—` before publishing.
- **Jargon without definition** — define it first, then use it freely.
- **"The code wants to..."** — code does not want things. Say what the programmer is doing instead.
- **"Please", "note that", "it's worth mentioning"** — get to the point.
- **Hype words** — "powerful", "amazing", "incredibly", "robust". Describe what it does instead.
- **Passive voice** — "a variable is declared" → "you declare a variable".
- **`<br>` tags in titles** — hero titles are always one line.

---

## Punctuation Rules

- **No em dashes.** Comma or new sentence instead.
- **No Oxford-comma exceptions** — use the Oxford comma: "move, clone, and copy".
- **Code in backticks** — always: `let`, `mut`, `u64`, `fn`. Never spell them out in prose without backticks.
- **Periods on full sentences** — card descriptions and page descriptions end with a period.
- **No exclamation marks** in body copy. Use them only in code examples where Rust syntax requires it (`println!`).

---

## By Page Type

### Page descriptions (`page-description` on landing and inner pages)

1–2 sentences. Sentence 1: what the topic is. Sentence 2 (optional): what this specific page covers.

Use the pre-written descriptions in `_docs/COPY.md`. Do not invent new ones — all 14 exercises and all 13 flashcard decks are already written.

**Good:** "Ownership is how Rust manages memory without a garbage collector. This deck covers Rust's three ownership rules."
**Bad:** "In this deck, we'll be exploring the concept of ownership — a foundational Rust feature."

---

### Exercise task instructions (left panel, exercise pages)

- Sentence 1: describe the situation. "A payment contract tracks..."
- Sentence 2: "Right now it fails because..." — state the specific problem.
- Then: numbered steps. Direct imperative. "Store x as i32." "Remove the semicolon."
- No bridge phrases like "The code below wants to:" or "Your job is to:".
- Steps are instructions, not descriptions of what the code does.

**Good:** "Remove the semicolon after `x + y` so the expression returns a value."
**Bad:** "The code wants to return a value but the semicolon turns it into a statement."

---

### Flashcard back panels (Meaning / When to use it / Example)

- **Meaning:** one sentence. What this thing is, in plain English.
- **When to use it:** one sentence. The situation where you reach for this.
- **Example:** one short code snippet. 1–3 lines. Real, runnable Rust.

Keep it tight. The card is small. Every word earns its place.

**Good Meaning:** "Creates a new variable and gives it a name."
**Bad Meaning:** "The `let` keyword is used to declare variables in Rust, binding a name to a value — this is how you store data in your program."

---

### Overview tab — Quick Reference table

- Column 1: the concept or syntax, in `code format`.
- Column 2: plain English, one phrase. No full sentences needed.
- No em dashes in any cell.

---

## Before Publishing — Checklist

- [ ] No em dashes anywhere on the page
- [ ] Every new term is defined before being used
- [ ] Code keywords are in backticks
- [ ] Page description matches `_docs/COPY.md` exactly
- [ ] Hero title is one line — no `<br>` tags
- [ ] Reading level feels like a smart 10th grader could follow it
