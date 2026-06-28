# Practice — Statements & Expressions

> DRAFT FOR REVIEW — Follows `EXERCISE-STYLE-GUIDE.md`

Work through each exercise in the [Rust Playground](https://play.rust-lang.org).  
Read the explainer, paste the starter code, fix it, then move on.  
Check your answer only after you've tried.

---

## Quick reference

| Concept | What it means |
|---|---|
| Statement | A line that does something but produces no value — always ends with `;` |
| Expression | A line that evaluates to a value — no semicolon at the end |
| `()` | The unit type — what you get when a semicolon kills an expression |
| Block `{ }` | A block is an expression if its last line has no semicolon |
| Semicolon | Turns an expression into a statement — the value is thrown away |

---

## Exercise 1 — Statements Do Not Produce a Value

A **statement** performs an action but hands nothing back. In Rust, most lines ending with a semicolon are statements. Variable declarations like `let x = 5;` are statements — they store a value but the assignment itself produces nothing.

An **expression** evaluates to a value. `3 + 4` is an expression — it produces `7`. A block of code in `{ }` is an expression if its last line has no semicolon — the block hands back whatever that last line evaluates to.

The code below wants to:
1. Run a block that computes `x * 2`
2. Assign the result to `y`
3. Assert `y == 6` and print `Success!`

Right now `y` holds the unit type `()` because the last line of the block has a semicolon.

**Remove one character so the block hands back its value:**

```rust
fn main() {
    let x = 3;
    let y = {
        let doubled = x * 2;
        doubled;
    };
    assert_eq!(y, 6);
    println!("Success!");
}
```

#### Expected Output

```text
Success!
```

<answer>
<summary>Answer</summary>

Remove the semicolon after `doubled` — without it, the block returns `doubled` as its value:

```rust
fn main() {
    let x = 3;
    let y = {
        let doubled = x * 2;
        doubled
    };
    assert_eq!(y, 6);
    println!("Success!");
}
```

</answer>

---

## Exercise 2 — Semicolon Throws Away the Value

The semicolon is the switch between expression and statement. Add a semicolon to the last line of a block and the value is gone — the block returns `()` instead. Remove it and the value comes through.

This is not a bug in Rust. It is intentional: Rust lets you decide exactly what a block hands back just by whether or not you put a semicolon on the last line.

The code below wants to:
1. Use a block to compute `x + y`
2. Assign the result to `result`
3. Print `Result: 5`

Right now the block ends with `x + y;` — the semicolon throws away the sum and `result` gets `()`.

**Make it work in two separate ways. Try each one:**

```rust
fn main() {
    let x = 2;
    let y = 3;
    let result = {
        x + y;
    };
    println!("Result: {}", result);
}
```

#### Expected Output

```text
Result: 5
```

<answer>
<summary>Answer — Way 1 (remove the semicolon)</summary>

```rust
fn main() {
    let x = 2;
    let y = 3;
    let result = {
        x + y
    };
    println!("Result: {}", result);
}
```

</answer>

<answer>
<summary>Answer — Way 2 (compare result to the unit type instead)</summary>

If you keep the semicolon, the block returns `()`. You can make the assert work by comparing to `()` — but then you cannot print `result` as a number.

```rust
fn main() {
    let x = 2;
    let y = 3;
    let result = {
        x + y;
    };
    assert_eq!(result, ());
    println!("Result: {:?}", result);
}
```

Way 1 is the correct fix if you want the sum. Way 2 is how you'd prove you understand what the semicolon does.

</answer>

---

## Exercise 3 — Variable Assignments Are Statements

A variable assignment — `let x = 5;` — is a statement. It stores a value but the assignment itself produces nothing. This matters when you try to use an assignment as the last line of a block expecting a value.

You can fix this in two ways: either return the variable itself on the next line (no semicolon), or wrap the assignment in its own block and return the variable separately.

The code below wants to:
1. Set `x` to `1` and increment it by `2` inside a block
2. Assign the final value of `x` to `v`
3. Assert `v == 3` and print `Success!`

Right now the block ends with the assignment `x += 2;` which is a statement — it returns `()`, not the value of `x`.

**Fix this so `v` holds `3`. Don't remove any lines:**

```rust
fn main() {
    let v = {
        let mut x: i32 = 1;
        x += 2;
    };
    assert_eq!(v, 3);
    println!("Success!");
}
```

#### Expected Output

```text
Success!
```

<answer>
<summary>Answer</summary>

Add `x` as the final expression in the block — no semicolon, so the block returns the current value of `x`:

```rust
fn main() {
    let v = {
        let mut x: i32 = 1;
        x += 2;
        x
    };
    assert_eq!(v, 3);
    println!("Success!");
}
```

</answer>

---

## Exercise 4 — Functions and the Semicolon Rule

The same rule applies inside functions. The last expression in a function body becomes the return value — but only if there is no semicolon. A semicolon turns that expression into a statement and the function returns `()` instead.

The instructor put it this way: "if we omit the semicolon, the result of this operation will get returned, which means the return type would be i32."

The code below wants to:
1. Call `add(1, 2)` and store the result in `s`
2. Assert `s == 3` and print `Success!`

Right now `add` ends with `x + y;` — the semicolon means it returns `()`, not the sum.

**Remove one character so `add` returns the correct value:**

```rust
fn add(x: i32, y: i32) -> i32 {
    x + y;
}

fn main() {
    let s = add(1, 2);
    assert_eq!(s, 3);
    println!("Success!");
}
```

#### Expected Output

```text
Success!
```

<answer>
<summary>Answer</summary>

Remove the semicolon from `x + y` — the expression now returns its value to the caller:

```rust
fn add(x: i32, y: i32) -> i32 {
    x + y
}

fn main() {
    let s = add(1, 2);
    assert_eq!(s, 3);
    println!("Success!");
}
```

</answer>

---

## Exercise 5 — `if` as an Expression

In Rust, `if` is an expression — it evaluates to a value. That means you can assign the result of an `if` directly to a variable. This is different from most languages where `if` is just a control-flow statement.

For this to work, every branch must return the same type, and no branch can have a semicolon on its last line — a semicolon would turn the value into `()` and the types would no longer match.

The code below wants to:
1. Check whether `score` is 90 or above
2. Assign `"A"` or `"B"` to `grade` based on the result
3. Print `Grade: B`

Right now the `else` branch ends with `"B";` — the semicolon throws away the value and the types no longer match.

**Remove one character so the `if` expression returns a value from both branches:**

```rust
fn main() {
    let score = 85;
    let grade = if score >= 90 {
        "A"
    } else {
        "B";
    };
    println!("Grade: {}", grade);
}
```

#### Expected Output

```text
Grade: B
```

<answer>
<summary>Answer</summary>

Remove the semicolon from `"B"` — both branches now return `&str` with no semicolon:

```rust
fn main() {
    let score = 85;
    let grade = if score >= 90 {
        "A"
    } else {
        "B"
    };
    println!("Grade: {}", grade);
}
```

</answer>

---

## Exercise 6 — Contract Build: Fee Calculation

You now understand the full picture:

- A **statement** (ends with `;`) performs an action and returns nothing — `()`
- An **expression** (no `;`) produces a value and hands it to the caller
- The last line of a block or function determines what gets returned
- Variable assignments are statements — you must return the variable explicitly if you want its value
- `if` is an expression — assign it to a variable when both branches return the same type

In a payment contract, fee calculations must return the actual fee amount. If a semicolon sneaks onto the last line, the caller gets `()` instead of the number, and the payment math breaks.

The code below wants to:
1. Calculate a fee as 5% of the base amount
2. Return the fee from `calculate_fee`
3. Print `Fee: 50000 lamports`

Right now `calculate_fee` has a semicolon on its last line — it returns `()` instead of the fee.

**Remove one character so the correct fee is returned and printed:**

```rust
fn calculate_fee(base: u64, rate: u64) -> u64 {
    base * rate / 100;
}

fn main() {
    let fee = calculate_fee(1_000_000, 5);
    println!("Fee: {} lamports", fee);
}
```

#### Expected Output

```text
Fee: 50000 lamports
```

<answer>
<summary>Answer</summary>

Remove the semicolon — the expression now returns the fee to the caller:

```rust
fn calculate_fee(base: u64, rate: u64) -> u64 {
    base * rate / 100
}

fn main() {
    let fee = calculate_fee(1_000_000, 5);
    println!("Fee: {} lamports", fee);
}
```

</answer>

---

**End of Statements & Expressions.**
