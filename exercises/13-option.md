# Practice - The "Option" Enum

> DRAFT FOR REVIEW Follows `EXERCISE-STYLE-GUIDE.md`

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

## Track A - Generic Rust

---

### Exercise 1 Wrapping a Value in `Some`

This exercise tests creating an `Option` that holds a value. In a contract, a lookup function might return `Some(plan)` if the subscriber exists, or `None` if the account doesn't.

The code wants to create a variable that says "there is a value, and it's 5." Right now it uses `let five = 5`, which is just a plain number not wrapped in `Option`.

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

The code wants to handle both cases: a value present, and a value missing. Right now the `match` only handles `Some`.

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

The code wants to print the value inside an `Option`, but only if it's `Some`. Right now it tries to print the `Option` directly.

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

The code wants to pass `Some(5)` to a function without explicitly writing `Option<i32>`. Right now the type annotation forces extra verbosity.

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

The code wants to safely access the third element of an array. Right now it uses direct indexing, which panics if out of bounds.

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

### Exercise 7 Chaining Option Transforms

This exercise tests chaining two `Option`-returning functions. In a contract, you might look up a subscriber ID, then look up their plan price each step could fail, so `Option` propagates safely.

The code wants to call `plus_one` on the result of `plus_one(Some(3))`. Right now the outer call receives `Option<i32>` and fails because it expects a plain `i32`.

When chaining functions that return `Option`, you must pass the `Option` itself not unwrapped values. `plus_one` accepts `Option<i32>` and returns `Option<i32>`, so you can stack calls safely.

```rust
fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        None => None,
        Some(i) => Some(i + 1),
    }
}

fn main() {
    let start = Some(3);
    let result = plus_one(plus_one(start));
    println!("{:?}", result);
}
```

**Fix the inner call so the program compiles. The result should be `Some(5)`.**

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
    let start = Some(3);
    let result = plus_one(plus_one(start));
    println!("{:?}", result);
    // Some(3) → plus_one → Some(4) → plus_one → Some(5)
}
```

`plus_one(start)` returns `Option<i32>`, which is exactly what the outer `plus_one` expects. Chaining `Option`-returning functions prevents crashes at every step.

</details>

---

### Exercise 8 Write Cold

No starter code. No hints. Write it from scratch.

A contract helper checks whether a user has a discount code. Write a program that:

1. Creates a function `apply_discount(code: Option<&str>) -> u64`.
2. If `code` is `Some("EARLY")`, return `20`.
3. If `code` is `Some("VIP")`, return `50`.
4. Otherwise (including `None`), return `0`.
5. In `main`, create `discount = Some("EARLY")`, call the function, and print the result.

**Write the full program. Expected output: `20`.**

<details>
<summary>Answer</summary>

```rust
fn apply_discount(code: Option<&str>) -> u64 {
    match code {
        Some("EARLY") => 20,
        Some("VIP") => 50,
        _ => 0,
    }
}

fn main() {
    let discount = Some("EARLY");
    println!("{}", apply_discount(discount));
}
```

`_` is a catch-all pattern that matches any remaining value, including `None` and any other `Some` variant. This keeps the `match` exhaustive without listing every possibility.

</details>

---

## Track B - Contract

All exercises below apply `Option` to a subscription-payment contract. The same rules different context.

---

### Exercise 1 Wrapping a Plan Lookup Result

This exercise tests creating an `Option` for a lookup that might fail. In a contract, `find_plan("premium")` returns `Some(10_000_000)` if the plan exists, `None` if it doesn't.

The code wants to return a plan price as an `Option`. Right now it returns a plain `u64`, which can't express "plan not found."

`Option` replaces the dangerous "just return 0 when missing" pattern. `Some(price)` says "I found it, here's the value." `None` says "nothing there handle it." Think of it like a restaurant menu: `Some("pasta")` means they sell pasta, `None` means they don't never "pasta costs $0."

```rust
fn plan_price(name: &str) -> u64 {
    if name == "premium" { 10_000_000 } else { 0 }
}

fn main() {
    println!("{:?}", plan_price("premium"));
    println!("{:?}", plan_price("luxury"));
}
```

**Change the return type to `Option<u64>` and wrap each return value in `Some`. For the missing plan, return `None`.**

<details>
<summary>Answer</summary>

```rust
fn plan_price(name: &str) -> Option<u64> {
    if name == "premium" {
        Some(10_000_000)
    } else {
        None
    }
}

fn main() {
    println!("{:?}", plan_price("premium"));
    println!("{:?}", plan_price("luxury"));
}
```

`None` forces the caller to decide what to do when a plan is missing. `0` would hide the bug silently. `Option` makes failures explicit.

</details>

---

### Exercise 2 Handling Missing Subscribers

This exercise tests matching on `Option` in a contract context. In a real program, a lookup for `subscriber_123` might return `None` if the account was never created.

The code wants to print a subscriber's plan, but only if they exist. Right now the `match` only handles `Some`.

When you match on `Option`, you must handle both `Some(value)` and `None`. In a contract, `None` means "no account found" you should skip processing, not panic.

```rust
fn subscriber_plan(id: &str) -> Option<&str> {
    if id == "sub_001" {
        Some("premium")
    } else {
        None
    }
}

fn main() {
    let plan = subscriber_plan("sub_002");

    match plan {
        Some(p) => println!("Plan: {}", p),
    }
}
```

**Add a `None` arm that prints `Subscriber not found`.**

<details>
<summary>Answer</summary>

```rust
fn subscriber_plan(id: &str) -> Option<&str> {
    if id == "sub_001" {
        Some("premium")
    } else {
        None
    }
}

fn main() {
    let plan = subscriber_plan("sub_002");

    match plan {
        Some(p) => println!("Plan: {}", p),
        None => println!("Subscriber not found"),
    }
}
```

Handling `None` explicitly prevents the program from treating an empty result like a real plan. In a contract, this distinction is critical for correctness.

</details>

---

### Exercise 3 Applying a Bonus

This exercise tests a function that takes `Option<u64>`, transforms the balance, and returns `Option<u64>`. In a contract, `apply_bonus` might add referral credits only if a code was provided.

The code wants a helper that doubles a balance if there's a value, or passes `None` through. Right now it only handles `Some`.

A function that transforms `Option` should preserve the "maybe" nature: `None` in means `None` out, and `Some(value)` means `Some(transformed_value)`.

```rust
fn apply_bonus(balance: Option<u64>) -> Option<u64> {
    match balance {
        Some(b) => Some(b + 1_000_000),
    }
}

fn main() {
    println!("{:?}", apply_bonus(Some(5_000_000)));
    println!("{:?}", apply_bonus(None));
}
```

**Add the `None` case so the function compiles. When `balance` is `None`, return `None`.**

<details>
<summary>Answer</summary>

```rust
fn apply_bonus(balance: Option<u64>) -> Option<u64> {
    match balance {
        None => None,
        Some(b) => Some(b + 1_000_000),
    }
}

fn main() {
    println!("{:?}", apply_bonus(Some(5_000_000)));
    println!("{:?}", apply_bonus(None));
}
```

`None => None` means: if there is no balance, there is nothing to bonus. The caller can then safely decide what `None` means in their context.

</details>

---

### Exercise 4 Unwrapping a Payment with `if let`

This exercise tests using `if let` to process a payment only if it exists. In a contract, you might check `if let Some(amount) = pending_payment` and transfer it doing nothing if no payment is pending.

The code wants to print a payment amount only if a payment exists. Right now it unwraps with `match` which is longer than needed.

`if let Some(amount) = payment` is a shorter way to say: "if there is a payment, use the amount; otherwise, skip everything." It's ideal when you only care about the success case.

```rust
fn main() {
    let payment = Some(2_500_000u64);

    match payment {
        Some(amount) => println!("Transfer {}", amount),
        None => {},
    }
}
```

**Replace the `match` with `if let Some(amount)` and add an `else` block that prints `No payment pending`.**

<details>
<summary>Answer</summary>

```rust
fn main() {
    let payment = Some(2_500_000u64);

    if let Some(amount) = payment {
        println!("Transfer {}", amount);
    } else {
        println!("No payment pending");
    }
}
```

`if let` is shorter than `match` when you only care about one variant. It's common in contract code where `None` means "skip this step."

</details>

---

### Exercise 5 Inference Without Explicit Type

This exercise tests that `Option` types can be inferred in contract helpers. In a real codebase, the return type of a function gives the compiler enough context.

The code wants to declare an optional discount code without writing `Option<&str>`. Right now it forces an explicit annotation.

`Option` is in the prelude, so no import is needed. When the compiler sees `Some("EARLY")` used in a place that expects `Option<&str>`, it fills in the type automatically.

```rust
fn discount_value(code: Option<&str>) -> u64 {
    match code {
        Some("EARLY") => 1_000_000,
        _ => 0,
    }
}

fn main() {
    let code: Option<&str> = Some("EARLY");
    println!("{}", discount_value(code));
}
```

**Remove the `: Option<&str>` annotation from `code` and confirm the code still compiles.**

<details>
<summary>Answer</summary>

```rust
fn discount_value(code: Option<&str>) -> u64 {
    match code {
        Some("EARLY") => 1_000_000,
        _ => 0,
    }
}

fn main() {
    let code = Some("EARLY");
    println!("{}", discount_value(code));
}
```

The compiler infers `Option<&str>` from the function signature `discount_value(code: Option<&str>)`. This keeps helper code readable without repetitive type annotations.

</details>

---

### Exercise 6 Safe Plan List Access

This exercise tests using `Option` to avoid panics when reading contract data. In a contract, accessing an array of subscription plans should never crash `get()` returns `Option`.

The code wants the price of the third plan in a list. Right now it uses direct indexing, which panics if the list is shorter than expected.

Direct indexing with `[index]` panics when out of bounds. `get()` returns `Option` `Some(value)` if valid, `None` if not. In contract code, panics are worse than explicit handling because they can halt execution and waste fees.

```rust
fn main() {
    let plans = ["basic", "premium", "enterprise"];
    let third = plans[3];
    println!("{}", third);
}
```

**Replace direct indexing with `get()` and add a `match` to handle both `Some` and `None`. For `None`, print `No such plan`.**

<details>
<summary>Answer</summary>

```rust
fn main() {
    let plans = ["basic", "premium", "enterprise"];

    match plans.get(3) {
        Some(name) => println!("{}", name),
        None => println!("No such plan"),
    }
}
```

`plans.get(3)` returns `None` because the array only has indices 0, 1, 2. The program prints `No such plan` instead of crashing. Safe access patterns are essential in production contract code.

</details>

---

### Exercise 7 Chaining Balance Updates

This exercise tests chaining `Option`-returning helper functions. In a contract, you might look up a balance, apply a bonus, then check if it exceeds a threshold each step safe.

The code wants to apply `add_fee` to the result of `add_fee(Some(1_000_000))`. Right now the inner call is missing the wrapping.

When chaining functions that return `Option`, pass the `Option` itself. Each function unwraps the value, does work, and re-wraps it.

```rust
fn add_fee(x: Option<u64>) -> Option<u64> {
    match x {
        None => None,
        Some(b) => Some(b + 500_000),
    }
}

fn main() {
    let start = Some(1_000_000u64);
    let result = add_fee(add_fee(start));
    println!("{:?}", result);
}
```

**Fix the inner call so the program compiles. The result should be `Some(2000000)`.**

<details>
<summary>Answer</summary>

```rust
fn add_fee(x: Option<u64>) -> Option<u64> {
    match x {
        None => None,
        Some(b) => Some(b + 500_000),
    }
}

fn main() {
    let start = Some(1_000_000u64);
    let result = add_fee(add_fee(start));
    println!("{:?}", result);
    // Some(1_000_000) → add_fee → Some(1_500_000) → add_fee → Some(2_000_000)
}
```

`add_fee(start)` returns `Option<u64>`, which `add_fee` accepts. Chaining keeps every step safe if any step returns `None`, the chain propagates `None` without crashing.

</details>

---

### Exercise 8 Write Cold

No starter code. No hints. Write it from scratch.

A contract needs a fee waiver helper. Write a program that:

1. Creates a function `apply_waiver(fee: Option<u64>, threshold: u64) -> Option<u64>`.
2. If `fee` is `Some` and the value is at least `threshold`, return `Some(value - threshold)`.
3. Otherwise, return `None`.
4. In `main`, call it with `Some(3_000_000)` and threshold `1_000_000`, then print the result.

**Write the full program. Expected output: `Some(2000000)`.**

<details>
<summary>Answer</summary>

```rust
fn apply_waiver(fee: Option<u64>, threshold: u64) -> Option<u64> {
    match fee {
        Some(value) if value >= threshold => Some(value - threshold),
        _ => None,
    }
}

fn main() {
    println!("{:?}", apply_waiver(Some(3_000_000), 1_000_000));
}
```

`Some(value) if value >= threshold` combines pattern matching with a guard condition. If the match succeeds but the guard fails, it falls through to `_ => None`. This handles both the `None` case and the "too small" `Some` case in one arm.

</details>

---

## What's next

`Option` is everywhere in Rust especially in standard library methods that might fail (`get()`, `parse()`, `find()`). The next section covers flow control: `if`, `for`, `while`, and `loop`, which let you decide what to do with each `Option` you encounter.
