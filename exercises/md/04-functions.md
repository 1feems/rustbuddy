# Practice - Functions

> Source for `functions.html` — follows `_docs/STYLE-GUIDE.md` and `_docs/EXERCISE-PAGE-DESIGN.md`

Work through each exercise in the [Rust Playground](https://play.rust-lang.org).  
Read the explainer, paste the starter code, fix it, then move on.  
Check your answer only after you've tried.

---

## Quick reference

| Concept | What it means |
|---|---|
| `fn name()` | Declare a function named `name` |
| `fn name(x: i32)` | Function with one parameter: `x` of type `i32` |
| `fn name(x: i32, y: i32)` | Two parameters, each needs its own type |
| `-> i32` | The function returns an `i32` to whoever called it |
| Caller | The code that calls a function and receives what it returns |

---

## Exercise 1 - Parameter Types Are Required

A **function** is a named block of reusable code. You give it a name, describe what it takes as input, describe what it hands back, and then call it whenever you need it.

The inputs to a function are called **parameters**. In Rust, every parameter must have a type. You write the type directly after the parameter name, separated by a colon:

```rust
fn double(n: i32) -> i32 {
    n * 2
}
```

Here `n` is the parameter name and `i32` is its type. Without `: i32`, Rust cannot compile because it has no way to know what kind of value `n` holds.

#### Your Task

A function doubles a number but is missing the type on its parameter. Right now Rust will not compile.

1. Add `: i32` after `n` in the function signature.

**Fix the parameter so Rust knows what type `n` is:**

```rust
fn double(n) -> i32 {
    n * 2
}

fn main() {
    let result = double(5);
    println!("Result: {}", result);
}
```

#### Expected Output

```text
Result: 10
```

<answer>
<summary>Answer</summary>

Add `: i32` after `n`. Rust now knows what type to expect:

```rust
fn double(n: i32) -> i32 {
    n * 2
}

fn main() {
    let result = double(5);
    println!("Result: {}", result);
}
```

</answer>

---

## Exercise 2 - Declaring a Return Type

When a function hands a value back to the caller, you declare the type of that value after `->`. This goes between the closing parenthesis and the opening brace:

```rust
fn square(x: i32) -> i32 {
    x * x
}
```

Without `-> i32`, Rust assumes the function returns nothing. If the function body actually produces a value, Rust sees a mismatch and will not compile:

```
error[E0308]: mismatched types
 --> src/main.rs:2:5
  |
1 | fn square(x: i32) {
  |                   - expected `()` because of default return type
2 |     x * x
  |     ^^^^^ expected `()`, found `i32`
```

The fix is simple: tell Rust what the function returns.

#### Your Task

A function computes a square but is missing its return type. Right now Rust sees the body produces an `i32` but the signature promises nothing, so the types do not match.

1. Add `-> i32` between `)` and `{` in the function signature.

**Fix the signature so Rust knows what this function returns:**

```rust
fn square(x: i32) {
    x * x
}

fn main() {
    let result = square(4);
    println!("Square: {}", result);
}
```

#### Expected Output

```text
Square: 16
```

<answer>
<summary>Answer</summary>

Add `-> i32` after the closing parenthesis. Rust now knows the function hands back an `i32`:

```rust
fn square(x: i32) -> i32 {
    x * x
}

fn main() {
    let result = square(4);
    println!("Square: {}", result);
}
```

</answer>

---

## Exercise 3 - Multiple Parameters

Functions can take more than one input. Each parameter gets its own name and its own type, separated by commas. You cannot share a type across two parameter names — each one needs its own `: type`:

```rust
fn add(x: i32, y: i32) -> i32 {
    x + y
}
```

If you write `fn add(x, y: i32)`, Rust will not compile because `x` is missing its type. Every parameter must be fully annotated.

#### Your Task

A function adds two numbers but the second parameter `y` is missing its type annotation. Right now Rust will not compile.

1. Add `: i32` after `y`.

**Fix the second parameter so Rust knows its type:**

```rust
fn add(x: i32, y) -> i32 {
    x + y
}

fn main() {
    let total = add(3, 4);
    println!("Total: {}", total);
}
```

#### Expected Output

```text
Total: 7
```

<answer>
<summary>Answer</summary>

Add `: i32` after `y`. Both parameters now have explicit types:

```rust
fn add(x: i32, y: i32) -> i32 {
    x + y
}

fn main() {
    let total = add(3, 4);
    println!("Total: {}", total);
}
```

</answer>

---

## Exercise 4 - Using the Return Value

When a function returns a value, that value appears at the call site. You can store it in a variable, pass it directly to another function, or use it in an expression. If you call a function but do not use what it returns, the value is discarded.

All three of these are valid:

```rust
let result = square(5);            // store it
println!("{}", square(5));         // pass it directly
let doubled = square(5) * 2;       // use it in an expression
```

Defining a function does not call it. The function only runs when you actually call it by name.

#### Your Task

A function converts Fahrenheit to Celsius and returns the correct value. Right now `main` prints the original temperature instead of using the function's return value.

1. Replace `temp_f` inside `println!` with a call to `to_celsius(temp_f)`.

**Use the function's return value in the print statement:**

```rust
fn to_celsius(f: f64) -> f64 {
    (f - 32.0) * 5.0 / 9.0
}

fn main() {
    let temp_f = 212.0;
    println!("Celsius: {}", temp_f);
}
```

#### Expected Output

```text
Celsius: 100
```

<answer>
<summary>Answer</summary>

Call `to_celsius(temp_f)` inside `println!`. The return value flows directly into the print:

```rust
fn to_celsius(f: f64) -> f64 {
    (f - 32.0) * 5.0 / 9.0
}

fn main() {
    let temp_f = 212.0;
    println!("Celsius: {}", to_celsius(temp_f));
}
```

</answer>

---

## Exercise 5 - Type Safety at the Call Site

Rust checks that the values you pass to a function match the types the function expects. If a function expects `i32`, you cannot pass `3.0` — that is an `f64`. Rust will not compile and will tell you exactly where the types conflict:

```
error[E0308]: mismatched types
 --> src/main.rs:6:22
  |
6 |     let result = multiply(3.0, 4.0);
  |                           ^^^ expected `i32`, found floating-point number
```

This check happens at every function call, before the program ever runs. It is one of the main ways Rust prevents bugs.

#### Your Task

A function multiplies two integers. The caller passes decimal numbers instead of whole numbers. Right now Rust will not compile because `f64` and `i32` are different types.

1. Change `3.0` to `3` and `4.0` to `4` in the call to `multiply`.

**Fix the call site so the argument types match what the function expects:**

```rust
fn multiply(x: i32, y: i32) -> i32 {
    x * y
}

fn main() {
    let result = multiply(3.0, 4.0);
    println!("Result: {}", result);
}
```

#### Expected Output

```text
Result: 12
```

<answer>
<summary>Answer</summary>

Change `3.0` and `4.0` to `3` and `4`. The values now match the `i32` types the function expects:

```rust
fn multiply(x: i32, y: i32) -> i32 {
    x * y
}

fn main() {
    let result = multiply(3, 4);
    println!("Result: {}", result);
}
```

</answer>

---

## Exercise 6 - Build: Amount Validator

You now understand every part of a function:

- Every parameter needs a name and a type: `amount: u64`
- Declare the return type after `->`: `-> bool`
- The last expression in the body is what the function hands back (no semicolon)
- Call a function by writing its name and passing the arguments: `is_valid_amount(500, 100, 1000)`

Now build one from scratch.

#### Your Task

A blockchain contract needs to validate transaction amounts before processing. Write a function that checks whether an amount falls within allowed bounds.

**Spec:**

- Function name: `is_valid_amount`
- Parameters: `amount: u64`, `min: u64`, `max: u64`
- Return type: `bool`
- Returns `true` if `amount` is between `min` and `max` (inclusive). Returns `false` otherwise.
- Use implicit return (no `return` keyword).

**In `main`:**

- Call `is_valid_amount(500, 100, 1000)` and print the result.
- Call `is_valid_amount(50, 100, 1000)` and print the result.

#### Expected Output

```text
true
false
```

<answer>
<summary>Answer</summary>

```rust
fn is_valid_amount(amount: u64, min: u64, max: u64) -> bool {
    amount >= min && amount <= max
}

fn main() {
    println!("{}", is_valid_amount(500, 100, 1000));
    println!("{}", is_valid_amount(50, 100, 1000));
}
```

</answer>

---

**End of Functions.**
