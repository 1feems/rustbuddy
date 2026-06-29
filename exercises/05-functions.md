# Practice - Functions

> DRAFT FOR REVIEW - Follows `EXERCISE-STYLE-GUIDE.md`

Work through each exercise in the [Rust Playground](https://play.rust-lang.org).  
Read the explainer, paste the starter code, fix it, then move on.  
Check your answer only after you've tried.

---

## Quick reference

| Concept | What it means |
|---|---|
| `fn name(x: i32) -> i32` | Declare a function with typed arguments and a return type |
| Expression | Code that produces a value (like `x + y`) |
| Statement | Code that does something but returns nothing (ends with `;`) |
| `-> !` | Diverging function - never returns to the caller |
| `panic!()` | Force the program to stop immediately |
| `todo!()` | Placeholder for code you haven't written yet |
| `unimplemented!()` | Placeholder for code you will write later |
| `match` | Choose what to do based on a value (like a switch) |

---

## Track A - Generic Rust

---

### Exercise 1 - Return Type Annotation

A function is a named block of reusable code. It can take inputs, do something with them, and hand a value back to whoever called it. In Rust, if your function hands back a value, you must declare what type it returns, written as `-> type` after the parentheses.

The instructor said it directly: "functions always have to annotate types for their arguments." The return type is the same idea, you are telling Rust what is coming back.

In a payment contract, a helper like `add` must declare its return type so the caller knows what value it will receive.

The code below wants to:

1. Add two numbers using `add(3, 4)`
2. Store the result in `result`
3. Print `Result: 7`

Right now it fails because the function has no return type and the last line has a semicolon, which means no value gets returned.

**Fix this in two ways:**
1. Add the return type annotation `-> i32`
2. Remove the semicolon so `x + y` is an expression (not a statement)

```rust
fn add(x: i32, y: i32) {
    x + y;
}

fn main() {
    let result = add(3, 4);
    println!("Result: {}", result);
}
```

#### Expected Output

```text
Result: 7
```

<answer>
<summary>Answer</summary>

```rust
fn add(x: i32, y: i32) -> i32 {
    x + y
}

fn main() {
    let result = add(3, 4);
    println!("Result: {}", result);
}
```

</answer>

---

### Exercise 2 - Expression vs Statement

You practiced this in the Statements & Expressions exercises. Now it shows up inside a function.

The last line of a function body is what the function hands back to the caller, but only if there is no semicolon. The semicolon throws the value away. The function then returns `()` (nothing) even though you declared a return type of `i32`. Rust will refuse to compile because you promised a number but handed back nothing.

The instructor explained it this way: "if we omit the semicolon, the result of this operation will get returned."

In a payment contract, a fee calculation must end with an expression. A semicolon on the last line means the caller gets `()` instead of the fee.

#### Your Task

The code below wants to:

1. Return `7` from `add(3, 4)`
2. Print `Result: 7`

Right now it returns `()` because the last line has a semicolon.

**Remove one character so this compiles and prints `7`:**

```rust
fn add(x: i32, y: i32) -> i32 {
    x + y;
}

fn main() {
    println!("Result: {}", add(3, 4));
}
```

#### Expected Output

```text
Result: 7
```

<answer>
<summary>Answer</summary>

Remove the semicolon after `x + y`:

```rust
fn add(x: i32, y: i32) -> i32 {
    x + y
}

fn main() {
    println!("Result: {}", add(3, 4));
}
```

</answer>

---

### Exercise 3 - Diverging Function

A **diverging function** is a function that never returns to the caller. Instead of handing back a value, it stops the program entirely. The return type `-> !`, an exclamation mark, is how you tell Rust this function will never hand control back.

The instructor described the causes: "panicking, looping forever, or quitting the program." The most common tool is `panic!()`, which stops the program immediately with an error.

In a payment contract, a validation function that detects an invalid plan should abort immediately. There is no safe value to return, the right move is to stop.

#### Your Task

The code below wants to:

1. Call `never_return()`
2. Never reach the `println!` in `main`

Right now the function prints and exits normally, it does not diverge, so execution continues into `main`.

**Solve this in two ways so the `println!` in `main` never runs:**

```rust
fn never_return() -> ! {
    println!("I return!");
}

fn main() {
    never_return();
    println!("This should never print.");
}
```

#### Expected Output

```text
(panics - the println! in main never runs)
```

<answer>
<summary>Answer - Way 1 (panic!)</summary>

```rust
fn never_return() -> ! {
    panic!("Aborted");
}

fn main() {
    never_return();
    println!("This should never print.");
}
```

</answer>

<answer>
<summary>Answer - Way 2 (todo!)</summary>

```rust
fn never_return() -> ! {
    todo!("Not implemented yet");
}

fn main() {
    never_return();
    println!("This should never print.");
}
```

</answer>

---

### Exercise 4 - unimplemented! Macro

The instructor named three macros that all create diverging functions:
- `panic!()`, stops the program because something went wrong
- `todo!()`, stops the program because you haven't written this yet
- `unimplemented!()`, stops the program because this case is not supported yet

`unimplemented!()` is especially useful inside a `match` statement when you are building out a function tier by tier. It lets the code compile while signaling "I haven't written this arm yet." If the program hits that arm at runtime, it stops.

In a payment contract, a `match` on plan tiers might have `"basic"` ready and `"premium"` still pending. `unimplemented!()` holds the place.

#### Your Task

The code below wants to:

1. Match on a `tier` string
2. Return `500_000` for `"basic"`
3. Mark `"premium"` as not yet implemented
4. Print `Price: 500000`

Right now the `"premium"` arm is empty and the code won't compile.

**Fill in the blank so the compiler knows the premium tier is not implemented yet:**

```rust
fn get_price(tier: &str) -> u64 {
    match tier {
        "basic" => 500_000,
        "premium" => 
    }
}

fn main() {
    println!("Price: {}", get_price("basic"));
}
```

#### Expected Output

```text
Price: 500000
```

<answer>
<summary>Answer</summary>

```rust
fn get_price(tier: &str) -> u64 {
    match tier {
        "basic" => 500_000,
        "premium" => unimplemented!("premium tier not yet supported"),
    }
}

fn main() {
    println!("Price: {}", get_price("basic"));
}
```

</answer>

---

### Exercise 5 - Match Fill-in-the-Blank

`match` checks a value against a list of patterns and runs the first one that matches, like a multi-way switch. Every arm of a `match` must produce the same type. That is why `panic!()` is allowed inside a `match` that returns `i32`: `panic!()` has return type `!`, which Rust allows to stand in for any type because it never actually returns anything.

The instructor showed this exact pattern: a bool matched against `true` (returns a value) and `false` (prints something and panics). The `false` arm never produces an `i32`, but `panic!()` satisfies Rust's type checker anyway.

In a payment contract, a subscription check might return a fee if the subscription is active, and abort entirely if it is not.

#### Your Task

The code below wants to:

1. Set `b` to `false`
2. Print `"Success!"` from the false arm
3. Panic (this is the expected behavior for this exercise)

**Fill in `___` so the program prints `"Success!"` and panics:**

```rust
fn main() {
    let b = ___;
    let v = match b {
        true => 1,
        false => {
            println!("Success!");
            panic!("we have no value for false, but we can panic");
        }
    };
    println!("v = {}", v);
}
```

#### Expected Output

```text
Success!
(then panics)
```

<answer>
<summary>Answer</summary>

```rust
fn main() {
    let b = false;
    let v = match b {
        true => 1,
        false => {
            println!("Success!");
            panic!("we have no value for false, but we can panic");
        }
    };
    println!("v = {}", v);
}
```

</answer>

---

### Exercise 6 - Write Cold

You have now practiced every part of a function:

- `fn name(arg: type) -> return_type`, the signature: name, inputs with types, output type
- The body in `{ }`, where the work happens
- The last expression without a semicolon, what gets returned to the caller
- `-> !`, for functions that never return
- `panic!()`, `todo!()`, `unimplemented!()`, for diverging functions and placeholders
- `match`, for choosing what to do based on a value

Write a function from scratch using all of these rules.

#### Your Task

Write a complete `main` with a `square` function that:

- Takes one `i32` argument
- Returns an `i32`
- Computes the square (`x * x`)
- Is called from `main` with `5`
- Prints the result

#### Expected Output

```text
Square: 25
```

<answer>
<summary>Answer</summary>

```rust
fn square(x: i32) -> i32 {
    x * x
}

fn main() {
    let result = square(5);
    println!("Square: {}", result);
}
```

</answer>

---

## Track B - Contract

All exercises below apply the same function concepts to a subscription payment contract.

---

### Exercise 1 - Return Type Annotation

In Solana, fee calculations return `u64` lamport values. If a function computes a fee and hands it back, you must declare `-> u64` so the caller knows what it's receiving.

The last expression in the function body becomes the return value - only if there is no semicolon after it.

#### Your Task

The code below wants to:

1. Compute a fee from a base amount and rate
2. Store it and print `Fee: 50000 lamports`

Right now it fails because the function has no return type and the calculation has a semicolon.

**Fix this in two ways:**
1. Add the return type annotation `-> u64`
2. Remove the semicolon so the calculation is an expression

```rust
fn compute_fee(base: u64, rate: u64) {
    base * rate / 100;
}

fn main() {
    let fee = compute_fee(1_000_000, 5);
    println!("Fee: {} lamports", fee);
}
```

#### Expected Output

```text
Fee: 50000 lamports
```

<answer>
<summary>Answer</summary>

```rust
fn compute_fee(base: u64, rate: u64) -> u64 {
    base * rate / 100
}

fn main() {
    let fee = compute_fee(1_000_000, 5);
    println!("Fee: {} lamports", fee);
}
```

</answer>

---

### Exercise 2 - Expression vs Statement

A fee calculation must end with an expression, not a statement, or the caller gets `()` instead of the amount. The semicolon is the difference - remove it to return the value.

#### Your Task

The code below wants to:

1. Compute a fee and store it in `fee`
2. Return `fee` from `compute_fee`
3. Print `Fee: 50000`

Right now it returns `()` because `fee;` is a statement.

**Remove one character so this compiles and prints `50000`:**

```rust
fn compute_fee(base: u64, rate: u64) -> u64 {
    let fee = base * rate / 100;
    fee;
}

fn main() {
    println!("Fee: {}", compute_fee(1_000_000, 5));
}
```

#### Expected Output

```text
Fee: 50000
```

<answer>
<summary>Answer</summary>

Remove the semicolon after `fee`:

```rust
fn compute_fee(base: u64, rate: u64) -> u64 {
    let fee = base * rate / 100;
    fee
}

fn main() {
    println!("Fee: {}", compute_fee(1_000_000, 5));
}
```

</answer>

---

### Exercise 3 - Diverging Function

A validation helper in a contract that detects an invalid plan should abort immediately. It never returns - it panics instead. The return type `-> !` tells Rust this function will never hand control back.

#### Your Task

The code below wants to:

1. Call `validate_plan("invalid")`
2. Never reach `"Processing payment..."`

Right now the function prints and exits normally - it doesn't diverge.

**Solve this in two ways so the payment processing never runs:**

```rust
fn validate_plan(tier: &str) -> ! {
    println!("Plan accepted: {}", tier);
}

fn main() {
    validate_plan("invalid");
    println!("Processing payment...");
}
```

#### Expected Output

```text
(panics - the println! in main never runs)
```

<answer>
<summary>Answer - Way 1 (panic!)</summary>

```rust
fn validate_plan(tier: &str) -> ! {
    panic!("Invalid plan: {}", tier);
}

fn main() {
    validate_plan("invalid");
    println!("Processing payment...");
}
```

</answer>

<answer>
<summary>Answer - Way 2 (todo!)</summary>

```rust
fn validate_plan(tier: &str) -> ! {
    todo!("Plan validation not yet implemented");
}

fn main() {
    validate_plan("invalid");
    println!("Processing payment...");
}
```

</answer>

---

### Exercise 4 - unimplemented! Macro

In a contract handling multiple plan tiers, some tiers may not be ready yet. `unimplemented!()` fills the match arm so the compiler accepts the code while signaling that the logic isn't written yet.

#### Your Task

The code below wants to:

1. Return a price for `"basic"` and `"premium"` tiers
2. Mark `"enterprise"` as not yet implemented
3. Print `Price: 500000` when called with `"basic"`

Right now the `"enterprise"` arm is empty and won't compile.

**Fill in the blank so the compiler knows the enterprise tier is not implemented yet:**

```rust
fn get_price(tier: &str) -> u64 {
    match tier {
        "basic" => 500_000,
        "premium" => 1_000_000,
        "enterprise" => 
    }
}

fn main() {
    println!("Price: {}", get_price("basic"));
}
```

#### Expected Output

```text
Price: 500000
```

<answer>
<summary>Answer</summary>

```rust
fn get_price(tier: &str) -> u64 {
    match tier {
        "basic" => 500_000,
        "premium" => 1_000_000,
        "enterprise" => unimplemented!("enterprise tier not yet supported"),
    }
}

fn main() {
    println!("Price: {}", get_price("basic"));
}
```

</answer>

---

### Exercise 5 - Match Fill-in-the-Blank

In a contract, a subscription check might return a fee if active or abort if not. `panic!()` has return type `!`, so it's valid inside a match that returns `u64`.

#### Your Task

The code below wants to:

1. Set `is_active` to `false`
2. Print `"Subscription inactive."` from the false arm
3. Panic (this is the expected behavior for this exercise)

**Fill in `___` so the program prints the message and panics:**

```rust
fn main() {
    let is_active = ___;
    let fee = match is_active {
        true => 1_000_000,
        false => {
            println!("Subscription inactive.");
            panic!("Cannot charge inactive subscription");
        }
    };
    println!("Fee: {}", fee);
}
```

#### Expected Output

```text
Subscription inactive.
(then panics)
```

<answer>
<summary>Answer</summary>

```rust
fn main() {
    let is_active = false;
    let fee = match is_active {
        true => 1_000_000,
        false => {
            println!("Subscription inactive.");
            panic!("Cannot charge inactive subscription");
        }
    };
    println!("Fee: {}", fee);
}
```

</answer>

---

### Exercise 6 - Write Cold

In a contract, small validation helpers check balances and flags before processing payments. A function that returns a `bool` is common for these checks.

#### Your Task

Write a complete `main` with a `has_sufficient_funds` function that:

- Takes `balance: u64` and `min_required: u64`
- Returns a `bool`
- Returns `true` if `balance >= min_required`
- Is called from `main` with `500_000` and `1_000_000`
- Prints the result

#### Expected Output

```text
Sufficient: false
```

<answer>
<summary>Answer</summary>

```rust
fn has_sufficient_funds(balance: u64, min_required: u64) -> bool {
    balance >= min_required
}

fn main() {
    let ok = has_sufficient_funds(500_000, 1_000_000);
    println!("Sufficient: {}", ok);
}
```

</answer>

---

**End of Functions.**
