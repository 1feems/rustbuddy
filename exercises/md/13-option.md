# Practice - The "Option" Enum

> Source for `option.html` — follows `_docs/STYLE-GUIDE.md` and `_docs/EXERCISE-PAGE-DESIGN.md`

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

A variable needs to hold the number 5 wrapped in `Option`. Right now it uses `let five = 5`, which is a plain number not wrapped in `Option`.

`Option` is an enum with two variants: `Some(value)` and `None`. `Some(value)` wraps an actual value so you can pass it around as a single type. `None` says "nothing here." Think of it like a package notification: either the package is at your door (`Some`), or it is not (`None`).

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
    let five = Some(5); // ① Some(5) wraps the integer 5 inside the Option<i32> enum — the compiler infers i32 from the literal
    println!("{:?}", five); // ② {:?} prints the Option — output is Some(5), not just 5
}
```

**Why:** `Option` is how Rust represents a value that might not exist. Instead of allowing `null` (which causes crashes in other languages), Rust requires you to explicitly wrap a value in `Some` or use `None`. The compiler then forces you to handle both possibilities before using the value.

</details>

---

### Exercise 2 Handling `None`

A `match` needs to handle both cases: a value present and a value missing. Right now it only handles `Some`.

When you match on `Option`, you must handle both `Some(value)` and `None`. If you leave one out, the compiler complains. The compiler forces you to say what happens if the value is there AND what happens if it is not.

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
    let maybe = Some(10); // ① maybe holds Some(10) — the Option has a value right now

    match maybe {
        Some(n) => println!("Got: {}", n), // ② Some(n) destructures the Option — n receives the inner value 10
        None => println!("Nothing here"),  // ③ None arm handles the absent case — match must be exhaustive, both variants required
    }
}
```

**Why:** `match` on `Option` must be exhaustive — every variant must have an arm. Leaving out `None` is a compile error because Rust cannot guarantee the missing case is handled. This is the mechanism that replaces null checks: the compiler makes it impossible to forget.

</details>

---

### Exercise 3 The `plus_one` Pattern

The code wants a function that increments an `Option<i32>` by one. Right now the `match` doesn't return `None` when the input is `None`.

A function with `Option` input and `Option` output should follow a simple rule: `None` in means `None` out. For `Some(i)`, unwrap the value, do the work, then wrap the result back in `Some`.

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
fn plus_one(x: Option<i32>) -> Option<i32> { // ① takes an Option<i32> and returns an Option<i32> — transforms the value if present
    match x {
        None => None,              // ② None in, None out — nothing to increment, return absence
        Some(i) => Some(i + 1),   // ③ Some(i) destructures the Option — i is the inner value, we increment it and wrap the result back in Some
    }
}

fn main() {
    println!("{:?}", plus_one(Some(5))); // ④ Some(5) goes in, Some(6) comes out — value was present and incremented
    println!("{:?}", plus_one(None));    // ⑤ None goes in, None comes out — nothing to transform
}
```

**Why:** The `None => None` arm is the identity path — when there is no value, there is nothing to transform, so return no value. This pattern (transform the inner value if present, pass `None` through unchanged) is the foundation of safe data transformation in Rust. The compiler forces you to handle both cases.

</details>

---

### Exercise 4 Unwrapping with `if let`

A program prints the value inside an `Option` only if it is `Some`. Right now it tries to print the `Option` directly.

`if let Some(n) = value` is a shorter way to say: "if `value` is `Some`, grab the inner value as `n` and run this block." It skips the block entirely if the value is `None`. Use it when you only care about the `Some` case.

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
    let six = None; // ① six now holds None — the Option has no value

    if let Some(n) = six { // ② if let tries to destructure six as Some — n would receive the inner value if it existed
        println!("{}", n); // ③ this block is skipped entirely because six is None — no inner value to bind to n
    } else {
        println!("No value"); // ④ the else block runs when the if let pattern does not match — handles the None case
    }
}
```

**Why:** `if let` is a pattern match shortcut for when you only care about one variant. It is cleaner than a full `match` when you want to act on `Some` and either do nothing or handle `None` in an `else` block. It destructures the inner value directly into a named variable, making it available inside the block.

</details>

---

### Exercise 5 Type Inference on `Option`

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
fn reward(x: Option<i32>) -> Option<i32> { // ① the function signature gives the compiler all the type information it needs
    match x {
        None => None,
        Some(i) => Some(i * 2), // ② i is inferred as i32 from the function signature — no annotation needed here
    }
}

fn main() {
    let bonus = Some(5); // ③ the type annotation is removed — the compiler infers Option<i32> from the reward() function signature when bonus is passed in
    println!("{:?}", reward(bonus)); // ④ bonus is passed to reward — the compiler confirms the types match
}
```

**Why:** Rust's type inference works across function calls. When `bonus` is passed to `reward(x: Option<i32>)`, the compiler can infer that `bonus` must be `Option<i32>`. Writing the annotation explicitly is optional — leave it out when the context makes the type obvious, and add it back when it helps readability.

</details>

---

### Exercise 6 Safe Array Access

A program safely accesses an element that might be out of range. Right now it uses direct indexing, which panics if the index does not exist.

Direct indexing with `[index]` panics when the index is too large. The `get()` method returns `Option` instead: `Some(value)` if the index exists, `None` if it does not. The caller then matches on the `Option` to handle both cases gracefully.

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
    let names = ["alice", "bob", "carol"]; // ① array of three elements — valid indices are 0, 1, 2

    match names.get(3) {                          // ② .get(3) returns Option<&&str> — None because index 3 does not exist, no panic
        Some(name) => println!("{}", name),       // ③ Some(name) destructures the Option — name receives a reference to the element if it existed
        None => println!("No such name"),         // ④ None arm handles the absent case — prints safely instead of crashing
    }
}
```

**Why:** `.get()` is the safe alternative to direct indexing. It returns `Option` so the caller must handle the case where the index does not exist. In contract code, a panic at an array index means the whole transaction fails — `.get()` plus `match` gives you full control over what happens when data is missing.

</details>

---

**End of Option.**
