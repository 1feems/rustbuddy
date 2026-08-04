# Practice - Error Handling

> Source for `error-handling.html` — follows `_docs/STYLE-GUIDE.md` and `_docs/EXERCISE-PAGE-DESIGN.md`

Work through each exercise in the [Rust Playground](https://play.rust-lang.org).
Read the explainer, paste the starter code, fix it, then move on.
Check your answer only after you've tried.

---

## Quick reference

| Concept | What it means |
|---|---|
| `panic!` | Prints an error message, cleans up memory, and exits the program immediately. |
| `Result<T, E>` | An enum with two variants: `Ok(T)` when things work, `Err(E)` when they fail. |
| `Ok(value)` | The success variant of `Result`. Wraps the value you get back when nothing went wrong. |
| `Err(message)` | The failure variant of `Result`. Wraps an error value describing what went wrong. |
| `match` on `Result` | The standard way to handle both `Ok` and `Err` cases without crashing. |
| `unwrap()` | Extracts the value from `Ok`. Panics if the variant is `Err`. Only use when you are certain it will succeed. |
| `?` operator | Shorthand for propagating errors. Returns the `Err` early instead of panicking. Can only be used in functions that return `Result`. |

---

## Exercise 1 - What panic! Does

`panic!` is the simplest form of error handling. When Rust hits a `panic!`, it prints your message, cleans up memory, and exits the program. There is no recovering from a panic. The program stops.

Use `panic!` when something has gone so wrong that continuing makes no sense — like receiving an invalid plan type in a contract.

#### Your Task

A function checks which drink was ordered. If it is not lemonade, the program should stop with a clear message. Right now the else branch is missing the panic call.

1. Add `panic!("order not supported")` in the else branch so the program stops when given anything other than lemonade.

```rust
fn drink(beverage: &str) {
    if beverage == "lemonade" {
        println!("Success!");
    } else {
        // panic here
    }
}

fn main() {
    drink("lemonade");
    drink("juice");
}
```

#### Expected Output

```text
Success!
thread 'main' panicked at 'order not supported', src/main.rs
```

<details>
<summary>Answer</summary>

```rust
fn drink(beverage: &str) {     // ① takes a &str — borrows the string, no ownership needed for a check
    if beverage == "lemonade" {
        println!("Success!");
    } else {
        panic!("order not supported"); // ② panic! prints the message, unwinds the stack, and exits — no code after this line runs
    }
}

fn main() {
    drink("lemonade"); // ③ passes the check — prints Success!
    drink("juice");    // ④ fails the check — hits the panic! branch and the program stops here
}
```

**Why:** `panic!` is an immediate, unrecoverable stop. It is not for routine errors — use it only when the program is in a state that should never happen. For errors the caller should handle (like bad input), use `Result` instead.

</details>

---

## Exercise 2 - Common Panic: Divide by Zero

Some panics happen automatically without you calling `panic!` directly. Dividing by zero is one of them. Rust catches it at runtime and panics for you.

The fix is to check for the bad value before the operation runs.

#### Your Task

A function divides two numbers. Right now it panics when the second argument is zero. Fix it so the function returns `0` instead of crashing when `b` is zero.

```rust
fn divide(a: u32, b: u32) -> u32 {
    a / b
}

fn main() {
    println!("{}", divide(10, 2));
    println!("{}", divide(10, 0));
}
```

#### Expected Output

```text
5
0
```

<details>
<summary>Answer</summary>

```rust
fn divide(a: u32, b: u32) -> u32 { // ① takes two u32 values — unsigned, so no negative numbers
    if b == 0 {
        return 0; // ② early return before the division happens — eliminates the divide-by-zero panic
    }
    a / b         // ③ only reached when b is not zero — safe to divide
}

fn main() {
    println!("{}", divide(10, 2)); // ④ b is 2 — division runs normally, prints 5
    println!("{}", divide(10, 0)); // ⑤ b is 0 — early return fires, prints 0 instead of panicking
}
```

**Why:** Checking for invalid inputs before using them prevents runtime panics. This is the guard pattern — return a safe value (or an error) before reaching the operation that would crash. In contract code, a divide-by-zero panic would halt the transaction entirely.

</details>

---

## Exercise 3 - Returning Ok and Err

`panic!` is all-or-nothing. When you want the caller to decide what to do with an error, use `Result`. `Result` is an enum with two variants: `Ok(value)` for success and `Err(message)` for failure.

A function that returns `Result<f64, String>` can succeed with a `f64` number wrapped in `Ok`, or fail with a `String` message wrapped in `Err`.

#### Your Task

A divide function should return `Result` instead of panicking. Right now the function returns `0.0` on divide by zero. Replace that with an `Err` so the caller knows what went wrong.

1. Change the return type to `Result<f64, String>`.
2. Return `Err(String::from("cannot divide by zero"))` when `b` is zero.
3. Return `Ok(a / b)` for all other cases.

```rust
fn divide(a: f64, b: f64) -> f64 {
    if b == 0.0 {
        return 0.0;
    }
    a / b
}

fn main() {
    println!("{:?}", divide(10.0, 2.0));
    println!("{:?}", divide(10.0, 0.0));
}
```

#### Expected Output

```text
Ok(5.0)
Err("cannot divide by zero")
```

<details>
<summary>Answer</summary>

```rust
fn divide(a: f64, b: f64) -> Result<f64, String> { // ① return type is Result<f64, String> — Ok holds an f64, Err holds a String message
    if b == 0.0 {
        return Err(String::from("cannot divide by zero")); // ② Err wraps the error message — the caller receives this instead of a panic
    }
    Ok(a / b) // ③ Ok wraps the successful result — the f64 value is stored inside the Ok variant
}

fn main() {
    println!("{:?}", divide(10.0, 2.0)); // ④ b is 2.0 — succeeds, prints Ok(5.0)
    println!("{:?}", divide(10.0, 0.0)); // ⑤ b is 0.0 — returns Err, prints Err("cannot divide by zero")
}
```

**Why:** `Result` gives the caller control over how to handle failure. Instead of the program crashing, the function hands back a description of what went wrong. The caller can match on it, propagate it, or decide to panic if appropriate. This is the foundation of error handling in Rust.

</details>

---

## Exercise 4 - Matching on Result

Once a function returns `Result`, the caller needs to handle both cases. The standard way is `match`. One arm handles `Ok`, the other handles `Err`.

#### Your Task

The `divide` function returns a `Result`. Right now `main` only handles `Ok`. Add an `Err` arm that prints `Error: ` followed by the error message.

```rust
fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        return Err(String::from("cannot divide by zero"));
    }
    Ok(a / b)
}

fn main() {
    match divide(10.0, 2.0) {
        Ok(val) => println!("Result: {}", val),
    }

    match divide(10.0, 0.0) {
        Ok(val) => println!("Result: {}", val),
    }
}
```

#### Expected Output

```text
Result: 5
Error: cannot divide by zero
```

<details>
<summary>Answer</summary>

```rust
fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        return Err(String::from("cannot divide by zero"));
    }
    Ok(a / b)
}

fn main() {
    match divide(10.0, 2.0) {
        Ok(val) => println!("Result: {}", val), // ① Ok(val) destructures the Result — val receives the inner f64 value
        Err(e) => println!("Error: {}", e),     // ② Err(e) destructures the Result — e receives the error String
    }

    match divide(10.0, 0.0) {
        Ok(val) => println!("Result: {}", val), // ③ this arm is skipped — divide returned Err, not Ok
        Err(e) => println!("Error: {}", e),     // ④ this arm runs — e is "cannot divide by zero"
    }
}
```

**Why:** `match` on `Result` is exhaustive — the compiler requires both `Ok` and `Err` arms. `Ok(val)` and `Err(e)` both destructure the inner value into a named variable. This forces you to decide what happens in both the success and failure cases before the code will compile.

</details>

---

## Exercise 5 - unwrap

`unwrap()` is a shortcut. Instead of writing a full `match`, you call `.unwrap()` and get the value inside `Ok` directly. If the result is `Err`, it panics.

Use `unwrap()` only when you are certain the result will be `Ok`. For everything else, use `match` or the `?` operator.

#### Your Task

A program multiplies two numbers parsed from strings. Right now the code uses `match` to unwrap both values. Replace the two `match` blocks with `.unwrap()` calls to shorten the code.

```rust
fn main() {
    let n1: i32 = match "10".parse() {
        Ok(val) => val,
        Err(_) => panic!("parse failed"),
    };

    let n2: i32 = match "2".parse() {
        Ok(val) => val,
        Err(_) => panic!("parse failed"),
    };

    println!("{}", n1 * n2);
}
```

#### Expected Output

```text
20
```

<details>
<summary>Answer</summary>

```rust
fn main() {
    let n1: i32 = "10".parse().unwrap(); // ① .parse() returns Result<i32, ParseIntError> — .unwrap() extracts the Ok value or panics on Err
    let n2: i32 = "2".parse().unwrap();  // ② same pattern — safe here because "2" is a valid integer literal
    println!("{}", n1 * n2);             // ③ n1 and n2 hold plain i32 values — multiply and print
}
```

**Why:** `.unwrap()` extracts the value from `Ok` in one step, removing the boilerplate of a full `match`. It is appropriate when you know for certain the value will succeed — like parsing a hard-coded string literal that you wrote yourself. If there is any chance of failure, use `match` or `?` instead.

</details>

---

## Exercise 6 - The ? Operator

The `?` operator is a shorthand that does what `match` does: if the result is `Ok`, it unwraps the value. If it is `Err`, it returns the error immediately from the current function instead of panicking.

`?` can only be used inside a function that returns `Result`.

#### Your Task

A function multiplies two strings by parsing them to integers. Right now it uses `.unwrap()` on both parse calls. Replace both `.unwrap()` calls with `?` so errors propagate instead of panicking.

```rust
use std::num::ParseIntError;

fn multiply(a: &str, b: &str) -> Result<i32, ParseIntError> {
    let n1: i32 = a.parse().unwrap();
    let n2: i32 = b.parse().unwrap();
    Ok(n1 * n2)
}

fn main() {
    println!("{:?}", multiply("3", "4"));
    println!("{:?}", multiply("3", "abc"));
}
```

#### Expected Output

```text
Ok(12)
Err(ParseIntError { kind: InvalidDigit })
```

<details>
<summary>Answer</summary>

```rust
use std::num::ParseIntError;

fn multiply(a: &str, b: &str) -> Result<i32, ParseIntError> { // ① return type is Result — required for ? to work inside this function
    let n1: i32 = a.parse()?; // ② ? unwraps Ok and assigns to n1, OR returns the Err immediately from multiply — no panic
    let n2: i32 = b.parse()?; // ③ same — if "abc" fails to parse, this returns Err early and the next line never runs
    Ok(n1 * n2)               // ④ only reached when both parses succeed — wraps the product in Ok
}

fn main() {
    println!("{:?}", multiply("3", "4"));   // ⑤ both parse, returns Ok(12)
    println!("{:?}", multiply("3", "abc")); // ⑥ "abc" fails to parse — ? returns the Err from multiply, prints it here
}
```

**Why:** `?` eliminates the repetition of writing `match` for every fallible call. It propagates errors up the call stack automatically — each `?` either continues with the value or returns the error to the caller. The function's return type must be `Result` because `?` needs somewhere to return the error to.

</details>

---

## Exercise 7 - Build: Safe Payment Validation

A payment contract receives an amount as a string from user input. Before processing, it must parse the amount and check it is above zero. If either step fails, it should return an error and stop. The contract must never panic in production.

#### Your Task

Write a function `validate_payment` that:
1. Takes a `&str` representing an amount.
2. Parses it to a `u64` using `?`.
3. Returns `Err(String::from("amount must be above zero"))` if the parsed value is `0`.
4. Returns `Ok(amount)` if valid.

The `main` function is written for you.

```rust
fn main() {
    println!("{:?}", validate_payment("1000"));
    println!("{:?}", validate_payment("0"));
    println!("{:?}", validate_payment("abc"));
}
```

#### Expected Output

```text
Ok(1000)
Err("amount must be above zero")
Err(ParseIntError { kind: InvalidDigit })
```

<details>
<summary>Answer</summary>

```rust
use std::num::ParseIntError;

fn validate_payment(input: &str) -> Result<u64, Box<dyn std::error::Error>> { // ① Box<dyn Error> accepts multiple error types — both ParseIntError and String can be returned
    let amount: u64 = input.parse()?; // ② ? propagates the ParseIntError if input is not a valid number — early return on failure
    if amount == 0 {
        return Err(String::from("amount must be above zero").into()); // ③ manual Err for the zero case — .into() converts String into Box<dyn Error>
    }
    Ok(amount) // ④ only reached when parsing succeeded and amount is above zero — wraps the valid amount in Ok
}

fn main() {
    println!("{:?}", validate_payment("1000")); // ⑤ valid number above zero — Ok(1000)
    println!("{:?}", validate_payment("0"));    // ⑥ valid parse but zero — Err("amount must be above zero")
    println!("{:?}", validate_payment("abc"));  // ⑦ parse fails — Err(ParseIntError)
}
```

**Why:** Every entry point that reads external input should return `Result` and never call `unwrap()`. The `?` operator handles the parse error and `return Err(...)` handles the business rule. `Box<dyn std::error::Error>` is a common return type when a function can produce more than one kind of error.

</details>

---

**End of Error Handling.**
