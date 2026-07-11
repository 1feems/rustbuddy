# Practice - Statements & Expressions

> Source for `statements-expressions.html` — follows `_docs/STYLE-GUIDE.md` and `_docs/EXERCISE-PAGE-DESIGN.md`

Work through each exercise in the [Rust Playground](https://play.rust-lang.org).  
Read the explainer, paste the starter code, fix it, then move on.  
Check your answer only after you've tried.

---

## Quick reference

| Concept | What it means |
|---|---|
| Statement | A line that does something but produces no value, always ends with `;` |
| Expression | A line that evaluates to a value, no semicolon at the end |
| `()` | The unit type, what you get when a semicolon kills an expression |
| Block `{ }` | A block is an expression if its last line has no semicolon |
| Semicolon | Turns an expression into a statement, the value is thrown away |

---

## Exercise 1 - Statements Do Not Produce a Value

A **statement** performs an action but hands nothing back. In Rust, most lines ending with a semicolon are statements. Variable declarations like `let x = 5;` are statements, they store a value but the assignment itself produces nothing.

An **expression** evaluates to a value. `3 + 4` is an expression, it produces `7`. A block of code in `{ }` is an expression if its last line has no semicolon, the block hands back whatever that last line evaluates to.

#### Your Task

A block computes `x * 2` and should hand that value to `y`. Right now `y` holds the unit type `()` because the last line of the block has a semicolon.

1. Remove the semicolon after `doubled`.

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

Remove the semicolon after `doubled`. Without it, the block returns `doubled` as its value:

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

## Exercise 2 - Explicit Return vs Implicit Return

Rust has two ways to return a value from a function.

The first way uses the `return` keyword: `return n * 2;`. This works, but most Rust code does not write it this way for normal returns.

The second way is implicit return: write the expression last with no semicolon. Rust sees the last expression in a function and hands that value back automatically.

Both produce the same result. Implicit return is the standard Rust style.

#### Your Task

A function doubles a number using the `return` keyword. Rewrite it to use implicit return instead.

1. Remove the `return` keyword.
2. Remove the semicolon from that line.

**Rewrite `double` so it uses implicit return:**

```rust
fn double(n: i32) -> i32 {
    return n * 2;
}

fn main() {
    let result = double(5);
    assert_eq!(result, 10);
    println!("Success!");
}
```

#### Expected Output

```text
Success!
```

<answer>
<summary>Answer</summary>

Remove `return` and the semicolon. The last expression hands its value back automatically:

```rust
fn double(n: i32) -> i32 {
    n * 2
}

fn main() {
    let result = double(5);
    assert_eq!(result, 10);
    println!("Success!");
}
```

</answer>

---

## Exercise 3 - Variable Assignments Are Statements

A variable assignment like `let mut x = 1;` is a statement. It stores a value but the assignment itself produces nothing. If that assignment is the last line of a block, the block returns `()`, not the value stored in `x`.

To hand back the value, write the variable name on its own line after the assignment, with no semicolon. That turns `x` into the final expression the block returns.

#### Your Task

A block sets `x` to `1`, increments it by `2`, and should hand the final value to `v`. Right now the block ends with `x += 2;`, which is a statement. It returns `()`, not `3`.

1. Add `x` on its own line after `x += 2`.
2. Do not add a semicolon after it.

**Fix the block so `v` holds `3`:**

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

Add `x` as the final expression in the block with no semicolon:

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

## Exercise 4 - Functions and the Semicolon Rule

The same rule applies inside functions. The last expression in a function body becomes the return value, but only if there is no semicolon. A semicolon turns that expression into a statement and the function returns `()` instead.

If your function is declared to return `i32` but the last line ends with a semicolon, Rust will not compile. You will see this error:

```
error[E0308]: mismatched types
 --> src/main.rs:1:27
  |
1 | fn add(x: i32, y: i32) -> i32 {
  |                            ^^^ expected `i32`, found `()`
2 |     x + y;
  |           - help: remove this semicolon to return this value
```

#### Your Task

A function adds two numbers and should return the sum. Right now `add` ends with `x + y;`. The semicolon makes it return `()` instead of the sum, and Rust will not compile.

1. Remove the semicolon from `x + y`.

**Fix `add` so it returns the correct value:**

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

Remove the semicolon. The expression now returns its value to the caller:

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

## Exercise 5 - `if` as an Expression

In Rust, `if` is an expression. That means you can assign the result of an `if` directly to a variable.

Without this, you would write it like this:

```rust
let grade;
if score >= 90 {
    grade = "A";
} else {
    grade = "B";
}
```

With `if` as an expression, you write it like this:

```rust
let grade = if score >= 90 { "A" } else { "B" };
```

Both do the same thing. The expression form is shorter and makes clear that `grade` is always set in one step.

For this to work, both branches must return the same type, and neither branch can have a semicolon on its last line. A semicolon would turn the value into `()` and the types would not match.

#### Your Task

An `if` expression assigns a grade based on a score. Right now the `else` branch ends with `"B";`. The semicolon turns it into `()`, so the two branches return different types and Rust will not compile.

1. Remove the semicolon after `"B"`.

**Fix the `if` expression so both branches return a value:**

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

Remove the semicolon from `"B"`. Both branches now return `&str` with no semicolon:

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

## Exercise 6 - Build: Fee Tier

You now understand the full picture:

- A **statement** (ends with `;`) performs an action and returns nothing, `()`
- An **expression** (no `;`) produces a value and hands it to the caller
- The last line of a block or function determines what gets returned
- Variable assignments are statements. You must return the variable explicitly if you want its value.
- `if` is an expression. Assign it to a variable when both branches return the same type.

Now build something that uses all of it.

#### Your Task

Write a function for a blockchain contract that assigns a fee tier to a transaction based on the amount.

**Spec:**

- Function name: `fee_tier`
- Parameter: `amount: u64`
- Return type: `&'static str`
- If `amount` is less than `1000`, return `"low"`. Otherwise return `"high"`.
- Use an `if` expression for the logic.
- Use implicit return (no `return` keyword).

**In `main`:**

- Call `fee_tier(500)` and print the result.
- Call `fee_tier(2000)` and print the result.

#### Expected Output

```text
low
high
```

<answer>
<summary>Answer</summary>

```rust
fn fee_tier(amount: u64) -> &'static str {
    if amount < 1000 {
        "low"
    } else {
        "high"
    }
}

fn main() {
    println!("{}", fee_tier(500));
    println!("{}", fee_tier(2000));
}
```

</answer>

---

**End of Statements & Expressions.**
