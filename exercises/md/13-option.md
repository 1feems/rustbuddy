# Practice - The "Option" Enum

> Follows `EXERCISE-STYLE-GUIDE.md`

Work through each exercise in the [Rust Playground](https://play.rust-lang.org).  
Read the explainer, paste the starter code, fix it, then move on.  
Check your answer only after you've tried.

---

## Quick reference

| Concept | What it means |
|---|---|
| `Option` | A built-in enum that replaces "null" in Rust. It says "this might have a value, or it might not." |
| `Some(T)` | One variant of `Option` that wraps an actual value. `Some(5)` means "there is a value, and it's 5." |
| `None` | The other variant of `Option`. `None` means "there is no value." |
| `match` on `Option` | The standard way to handle both possibilities. Check for `Some`, do something with the value; check for `None`, handle the absence. |
| `if let` | A shorter way to unwrap `Some` when you only care about the value-carrying case. |
| Prelude | Rust's built-in types (like `Option`) that you can use without importing anything. |

---

### Exercise 1 Wrapping a Value in `Some`

This exercise tests creating an `Option` that holds a value. In a contract, a lookup function might return `Some(plan)` if the subscriber exists, or `None` if the account doesn't.

A variable needs to hold the number 5 wrapped in `Option`. Right now it uses `let five = 5`, which is a plain number not wrapped in `Option`.

`Option` is an enum with two variants: `Some(value)` and `None`. `Some(value)` wraps an actual value so you can pass it around as a single type. `None` says "nothing here." Think of it like a package notification: either the package is at your door, or it's not `Some` means it's there, `None` means no delivery today.

```rust
fn main() {
    let five = 5;
    println!("{:?}", five);
}
```

**Wrap the value `5` inside `Some()` so `five` has the type `Option<i32>`.**

<details>
<summary>Answer</summary>

```rust
fn main() {
    let five = Some(5);
    println!("{:?}", five);
}
```

`Some(5)` wraps the number 5 inside the `Option<i32>` type. The compiler infers `i32` from the literal. `Option` is in the prelude, so no import is needed.

</details>

---

### Exercise 2 Handling `None`

This exercise tests matching on `Option` when the value is absent. In a contract, a balance check might return `None` if a wallet has never been initialized.

A `match` needs to handle both cases: a value present and a value missing. Right now it only handles `Some`.

When you match on `Option`, you must handle both `Some(value)` and `None`. If you leave one out, the compiler complains. Think of it like a checkbox on a form: the program forces you to say what happens if the box is checked AND what happens if it isn't.

```rust
fn main() {
    let maybe = Some(10);

    match maybe {
        Some(n) => println!("Got: {}", n),
    }
}
```

**Add a `None` arm to the `match` so it handles both cases. For `None`, print `Nothing here`.**

<details>
<summary>Answer</summary>

```rust
fn main() {
    let maybe = Some(10);

    match maybe {
        Some(n) => println!("Got: {}", n),
        None => println!("Nothing here"),
    }
}
```

Every `match` on `Option` must be exhaustive all variants must have an arm. `None =>` handles the absence case.

</details>

---

### Exercise 3 The `plus_one` Pattern

This exercise tests a function that takes `Option`, transforms the value, and returns a new `Option`. In a contract, `apply_bonus` might take `Some(balance)`, add interest, and return `Some(new_balance)` or pass `None` through unchanged.

The code wants a function that increments an `Option<i32>` by one. Right now the `match` doesn't return `None` when the input is `None`.

A function with `Option` input and `Option` output should follow a simple rule: `None` in means `None` out. For `Some(i)`, you unwrap the value, do the work, then wrap the result back in `Some`. This pattern is common for safe transforms.

```rust
fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        Some(i) => Some(i + 1),
    }
}

fn main() {
    println!("{:?}", plus_one(Some(5)));
    println!("{:?}", plus_one(None));
}
```

**Add the `None` case to the `match` so the function compiles. When `x` is `None`, return `None`.**

<details>
<summary>Answer</summary>

```rust
fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        None => None,
        Some(i) => Some(i + 1),
    }
}

fn main() {
    println!("{:?}", plus_one(Some(5)));
    println!("{:?}", plus_one(None));
}
```

`None => None` is the identity path: if there's no value, there's nothing to increment, so return no value. This lets the function safely handle both cases.

</details>

---

### Exercise 4 Unwrapping with `if let`

This exercise tests using `if let` to extract a value from `Some` when you only care about the success case. In a contract, you might check `if let Some(subscriber) = find_account(...)` and process them doing nothing if they don't exist.

A program prints the value inside an `Option` only if it is `Some`. Right now it tries to print the `Option` directly.

`if let Some(n) = value` is a shorter way to say: "if `value` is `Some`, grab the inner value as `n` and run this block." It skips the block entirely if the value is `None`. Think of it like a conditional mailbox check: if a package is there, open it; if not, move on.

```rust
fn main() {
    let six = Some(6);

    if let Some(n) = six {
        println!("{}", n);
    }
}
```

**Change `six` to `None` and add an `else` block that prints `No value`. Run both versions and compare.**

<details>
<summary>Answer</summary>

```rust
fn main() {
    let six = None;

    if let Some(n) = six {
        println!("{}", n);
    } else {
        println!("No value");
    }
}
```

`if let Some(n)` destructures the `Option`: the variable `n` now holds the inner value. When `six` is `None`, the `if` block is skipped and the `else` block runs. This is cleaner than `match` when you only care about one variant.

</details>

---

### Exercise 5 Type Inference on `Option`

This exercise tests that `Option` types can often be inferred by the compiler. In a contract, helper functions return `Option` and the caller doesn't need to write the full type every time.

A function receives `Some(5)` without an explicit type annotation. Right now the annotation forces extra verbosity.

`Option` is in Rust's prelude (the built-in standard library), so the compiler already knows what it is. In many cases, you can omit the type annotation and let Rust figure it out from how you use the value.

```rust
fn reward(x: Option<i32>) -> Option<i32> {
    match x {
        None => None,
        Some(i) => Some(i * 2),
    }
}

fn main() {
    let bonus: Option<i32> = Some(5);
    println!("{:?}", reward(bonus));
}
```

**Remove the `: Option<i32>` type annotation from `bonus` and confirm the code still compiles.**

<details>
<summary>Answer</summary>

```rust
fn reward(x: Option<i32>) -> Option<i32> {
    match x {
        None => None,
        Some(i) => Some(i * 2),
    }
}

fn main() {
    let bonus = Some(5);
    println!("{:?}", reward(bonus));
}
```

The compiler infers `Option<i32>` from the function signature `reward(x: Option<i32>)`. Explicit annotations are optional when the compiler has enough context.

</details>

---

### Exercise 6 Safe Array Access

This exercise tests using `Option` to avoid panics. In a contract, reading from an array of subscribers should never crash `get()` returns `Option` so the caller decides what to do.

A program safely accesses an element that might be out of range. Right now it uses direct indexing, which panics if out of bounds.

Direct indexing with `[index]` panics when the index is too large. The `get()` method returns `Option` instead: `Some(value)` if the index exists, `None` if it doesn't. The caller then matches on the `Option` to handle both cases gracefully.

```rust
fn main() {
    let names = ["alice", "bob", "carol"];
    let third = names[3];
    println!("{}", third);
}
```

**Replace the direct index with `get()` and add a `match` to handle both `Some` and `None`. For `None`, print `No such name`.**

<details>
<summary>Answer</summary>

```rust
fn main() {
    let names = ["alice", "bob", "carol"];

    match names.get(3) {
        Some(name) => println!("{}", name),
        None => println!("No such name"),
    }
}
```

`names.get(3)` returns `None` because the array has only 3 elements (indices 0, 1, 2). The program prints `No such name` instead of crashing. This pattern is essential in contract code where a panic means lost funds.

</details>


---

**End of Option.**
