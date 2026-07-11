# Practice - Ownership

> Source for `ownership.html` — follows `_docs/STYLE-GUIDE.md` and `_docs/EXERCISE-PAGE-DESIGN.md`

Work through each exercise in the [Rust Playground](https://play.rust-lang.org).  
Read the explainer, paste the starter code, fix it, then move on.  
Check your answer only after you've tried.

---

## Quick reference

| Concept | What it means |
|---|---|
| Owner | The variable that holds a value. Only one owner at a time. |
| Move | Assigning a `String` to a new variable transfers ownership. The old variable becomes invalid. |
| Clone | `.clone()` makes a full independent copy of heap data. Both variables stay valid. Costs memory. |
| Copy | Stack types (`i32`, `u64`, `bool`, `char`) copy automatically on assignment. Free and instant. |
| Heap | Where `String` and `Vec` live. Data can grow. Must be moved or cloned. |
| Stack | Where `i32`, `bool`, `char` live. Fixed size. Copied automatically. |

---

## Exercise 1 - Move Semantics

In Rust, every value has exactly one owner at a time. When that owner is a heap type like `String`, assigning it to a new variable does not copy the data. It **moves** it. Ownership transfers to the new variable. The old one becomes invalid.

The move happens at the assignment line. This line:

```rust
let s2 = s1;
```

is the moment `s1` gives up ownership. After that line, `s1` holds nothing. Any code that tries to use `s1` after the move will not compile. Rust will tell you: `use of moved value: s1`.

This prevents two variables from pointing at the same memory and causing crashes. Only one variable can own the data at a time.

#### Your Task

`s1` is assigned to `s2` on line 2. That is the move. After that line, `s1` is invalid. Right now the code tries to print both, but `s1` no longer owns any data.

1. Remove the line that prints `s1`.

**Remove one line so the code only uses `s2`:**

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;

    println!("s1 = {}", s1);
    println!("s2 = {}", s2);
}
```

#### Expected Output

```text
s2 = hello
```

<answer>
<summary>Answer</summary>

Remove the `s1` print. After `let s2 = s1`, ownership has moved. `s2` holds the data now:

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;

    println!("s2 = {}", s2);
}
```

</answer>

---

## Exercise 2 - Clone

Sometimes you need both variables to stay valid after an assignment. Moving does not allow that. Cloning does.

`.clone()` duplicates the entire heap allocation. Rust allocates new memory and copies every byte of the original into it. Both variables end up with completely independent copies of the data. Changing one does not affect the other.

This is explicit and intentional. For large data, cloning takes time and memory. That is why Rust does not do it automatically — you have to ask for it.

**Rules to remember:**

| What happens | Result |
|---|---|
| Move | Ownership transfers to the new variable. The old variable becomes invalid. |
| Clone | A new copy is made. Both variables are valid. Costs memory and time. |
| Copy | Stack types copy automatically. Both variables are valid. Free and instant. |

**Type rules:**

| Type | What happens on assignment |
|---|---|
| `String`, `Vec` | Moves by default |
| `String`, `Vec` + `.clone()` | Makes an independent copy |
| `i32`, `f64`, `bool`, `char` | Copies automatically — no `.clone()` needed |

#### Your Task

`s1` is assigned to `s2`, which moves ownership. `s1` is now invalid. Right now the code will not compile because both are used after the assignment.

1. Add `.clone()` after `s1` on the assignment line so `s2` gets its own copy.

**Add one method call so both variables stay valid:**

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;

    println!("s1 = {}", s1);
    println!("s2 = {}", s2);
}
```

#### Expected Output

```text
s1 = hello
s2 = hello
```

<answer>
<summary>Answer</summary>

Call `.clone()` on `s1` before assigning. `s2` gets its own copy. `s1` stays valid:

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1.clone();

    println!("s1 = {}", s1);
    println!("s2 = {}", s2);
}
```

</answer>

---

## Exercise 3 - Copy Trait

Some types implement the **Copy trait**. Assignment duplicates the value automatically. Both variables stay valid. No `.clone()` needed.

These are stack-only types with a fixed size: `i32`, `u64`, `f64`, `bool`, `char`. Because their size is always known and small, Rust copies them instantly at no meaningful cost.

This is different from `String`. A `String` can grow to any size, so Rust does not know how much work a copy would take. It moves instead. With `i32`, Rust always knows the cost — 4 bytes — so it copies automatically.

#### Your Task

`x1` is assigned to `x2`. Because `i32` implements Copy, both variables hold independent values. `x1` is still valid after the assignment. Right now only `x1` is printed.

1. Add a line to print `x2`.

**Add one `println!` line so both values appear in the output:**

```rust
fn main() {
    let x1: i32 = 10;
    let x2 = x1;

    println!("x1 = {}", x1);

    // Print x2 here
}
```

#### Expected Output

```text
x1 = 10
x2 = 10
```

<answer>
<summary>Answer</summary>

Add `println!("x2 = {}", x2);`. Both variables hold independent copies of `10`:

```rust
fn main() {
    let x1: i32 = 10;
    let x2 = x1;

    println!("x1 = {}", x1);
    println!("x2 = {}", x2);
}
```

If `x1` were a `String` instead of an `i32`, the `println!("x1 = {}", x1)` line would not compile — `x1` would have been moved into `x2`. Because `i32` implements Copy, both lines work.

</answer>

---

## Exercise 4 - A Function Call Is a Move

In Exercise 1, you saw that assigning a `String` to a new variable moves ownership. The same rule applies when you call a function.

When you write `greet(s)`, Rust treats it like handing `s` to the function parameter. The parameter becomes the new owner. When the function finishes and its scope ends, Rust automatically frees the memory. No garbage collector. No manual cleanup. It just happens.

The caller pays a price for this: `s` is now invalid. Rust freed the memory when the function ended. If `main` tries to use `s` after the call, it is reaching for memory that no longer exists. Rust catches this at compile time and refuses.

This is why ownership matters for functions, not just assignment. Every time you pass a `String` to a function, you are making a decision: this function now owns this data.

#### Your Task

`greet(s)` is called in `main`. Ownership of `s` moves into the function. When `greet` ends, the memory is freed. Right now `main` tries to print `s` after the call — Rust will not compile.

1. Remove the `println!` line in `main` that uses `s` after the call.

**Remove one line so the code accepts the move:**

```rust
fn greet(s: String) {
    println!("Hello, {}!", s);
}

fn main() {
    let s = String::from("world");
    greet(s);
    println!("s is still: {}", s);
}
```

#### Expected Output

```text
Hello, world!
```

<answer>
<summary>Answer</summary>

Remove the last `println!`. After `greet(s)`, ownership has moved into the function and the memory was freed when it ended. `s` in `main` is invalid:

```rust
fn greet(s: String) {
    println!("Hello, {}!", s);
}

fn main() {
    let s = String::from("world");
    greet(s);
}
```

</answer>

---

## Exercise 5 - Returning Ownership

In Exercise 4, passing a `String` to a function gave up ownership for good. But ownership does not have to stay inside a function. A function can return the value back, transferring ownership out to the caller.

When `main` writes:

```rust
let s = process(s);
```

ownership moves into `process`, the function does its work, and then ownership moves back out when `process` returns. `main` binds the returned value to `s` and owns the data again.

Why do this instead of cloning? Returning ownership means no new memory is allocated. The same data stays in the same place — ownership just moves in and then back out. Cloning (Exercise 2) creates a second copy, which costs memory. Returning costs nothing extra.

This pattern is more work than borrowing, which you will learn next. But understanding it shows you exactly how Rust thinks about ownership: it always has a direction, and returning is how you reverse it.

#### Your Task

`process()` takes ownership of `s` and prints it, but never returns it. `main` tries to use `s` after the call — Rust will not compile because ownership moved into `process` and the memory was freed when it ended.

1. Add `-> String` to the `process` function signature.
2. Add `s` as the last line of the `process` body with no semicolon so it returns.

**Fix `process` so it hands ownership back to the caller:**

```rust
fn process(s: String) {
    println!("Processing: {}", s);
}

fn main() {
    let s = String::from("hello");
    let s = process(s);
    println!("Done: {}", s);
}
```

#### Expected Output

```text
Processing: hello
Done: hello
```

<answer>
<summary>Answer</summary>

Add `-> String` to the signature. Write `s` as the last expression with no semicolon so ownership returns to the caller:

```rust
fn process(s: String) -> String {
    println!("Processing: {}", s);
    s
}

fn main() {
    let s = String::from("hello");
    let s = process(s);
    println!("Done: {}", s);
}
```

</answer>

---

## Exercise 6 - Build: Log and Return

You have seen the full ownership picture. A `String` moves on assignment and on function calls. Clone creates an independent copy at a cost. Stack types copy for free. A function can return ownership back so the caller keeps access.

Now write something from scratch that puts it together.

#### Your Task

Write a function called `log_plan` that a contract uses to record which plan a user is on. The function receives the plan name, prints it, and hands ownership back so the caller can still use it.

**Spec:**

- Function name: `log_plan`
- Parameter: `name: String`
- Return type: `String`
- Prints `"Plan logged: {name}"` inside the function
- Returns `name` to the caller with implicit return

In `main`, call `log_plan` with `"premium"`, get ownership back, then clone the result into a `backup`. Print both.

#### Expected Output

```text
Plan logged: premium
Active: premium
Backup: premium
```

<answer>
<summary>Answer</summary>

```rust
fn log_plan(name: String) -> String {
    println!("Plan logged: {}", name);
    name
}

fn main() {
    let plan = log_plan(String::from("premium"));
    let backup = plan.clone();
    println!("Active: {}", plan);
    println!("Backup: {}", backup);
}
```

</answer>

---

**End of Ownership.**
