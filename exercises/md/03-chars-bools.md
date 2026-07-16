# Practice - Chars, Bools & Unit Types

> DRAFT FOR REVIEW - Follows `EXERCISE-STYLE-GUIDE.md`

Work through each exercise in the [Rust Playground](https://play.rust-lang.org).  
Read the explainer, paste the starter code, fix it, then move on.  
Check your answer only after you've tried.

---

## Quick reference

| Concept | What it means |
|---|---|
| `char` | A single character, always in single quotes `'a'`, size 4 bytes |
| `bool` | A value that is either `true` or `false`, size 1 byte |
| `!` | The NOT operator, flips a bool: `!true` becomes `false` |
| `&&` | The AND operator, true only when BOTH sides are true |
| `\|\|` | The OR operator, true when EITHER side is true |
| `()` | The unit type, what Rust returns when a function gives back nothing |

---

## Exercise 1 - char Uses Single Quotes

A `char` is a single character, one letter, one digit, one symbol. In Rust, every character in the world is supported (emoji, Chinese characters, accented letters, all of it). A `char` takes up 4 bytes in memory, regardless of which character it holds.

The important rule: a `char` is always written in **single quotes** `'a'`. Double quotes `"a"` are for strings, a completely different type. If you use double quotes for a char, Rust will refuse to compile.

#### Your Task

A function prints a single character, but `letter` is assigned with double quotes instead of single quotes. Right now it fails because `letter` is using double quotes instead of single quotes.

1. Store the letter `A` as a `char`
2. Pass it to a function that expects a `char`
3. Print `Got: A`

**Change one character pair so `letter` is a valid `char`:**

```rust
fn print_char(c: char) {
    println!("Got: {}", c);
}

fn main() {
    let letter: char = "A";
    print_char(letter);
}
```

#### Expected Output

```text
Got: A
```

<details>
<summary>Common mistake</summary>

`"A"` is a string literal, it holds a sequence of characters, even if there's only one. `'A'` is a char, it holds exactly one character. They are different types and Rust will not accept one where the other is expected.

</details>

<answer>
<summary>Answer</summary>

Change double quotes to single quotes:

```rust
fn print_char(c: char) {
    println!("Got: {}", c);
}

fn main() {
    let letter: char = 'A';
    print_char(letter);
}
```

</answer>

---

## Exercise 2 - bool and the NOT Operator

A `bool` holds exactly one of two values: `true` or `false`. Nothing in between. Rust uses bools to make decisions, if something is `true`, do this; if `false`, do something else (or nothing).

The `!` operator flips a bool. `!true` becomes `false`. `!false` becomes `true`. Think of it like flipping a switch.

#### Your Task

A subscription check should only print when the account is active. Right now it fails to print because the condition uses `!is_active`, which flips the value to `false`.

1. Set `is_active` to `true`
2. Print `"Subscription is active."` only when `is_active` is true
3. Not print anything if `is_active` is false

**Remove one character so the correct line prints:**

```rust
fn main() {
    let is_active: bool = true;
    if !is_active {
        println!("Subscription is active.");
    }
}
```

#### Expected Output

```text
Subscription is active.
```

<answer>
<summary>Answer</summary>

Remove the `!`, you want the condition to be `is_active`, not the flipped version:

```rust
fn main() {
    let is_active: bool = true;
    if is_active {
        println!("Subscription is active.");
    }
}
```

</answer>

---

## Exercise 3 - bool and the AND Operator

The `&&` operator (AND) takes two bools and produces one. It only outputs `true` when BOTH inputs are `true`. If either input is `false`, the result is `false`.

Think of it like a security check: the subscriber must have an active account AND enough funds. Both conditions must pass or the payment gets blocked.

#### Your Task

A payment gate requires both the account to be active and funds to be available before approving. Right now `has_funds` is set incorrectly so the check fails.

1. Check that a subscription is both active and has sufficient funds
2. Print `"Payment approved."` only when both are true

**Fill in the blank so both conditions are true and the payment is approved:**

```rust
fn main() {
    let is_active: bool = true;
    let has_funds: bool = ___;

    if is_active && has_funds {
        println!("Payment approved.");
    }
}
```

#### Expected Output

```text
Payment approved.
```

<answer>
<summary>Answer</summary>

```rust
fn main() {
    let is_active: bool = true;
    let has_funds: bool = true;

    if is_active && has_funds {
        println!("Payment approved.");
    }
}
```

</answer>

---

## Exercise 4 - The Unit Type

When a function in Rust does not return a value, it implicitly returns the **unit type**, written as `()`. The unit type holds nothing, its size is zero bytes. You rarely write it yourself; Rust adds it automatically.

Think of it as Rust's way of saying "this function did its job but has nothing to hand back."

A variable assigned the result of a function that returns nothing will hold `()`. If you try to compare it to anything else, the assertion fails.

#### Your Task

A function logs a payment but returns nothing. The assert checks its return value. Right now the assert fails because `result` is compared to `5` instead of `()`.

1. Call `log_payment()`, which prints but returns nothing
2. Store the return value in `result`
3. Assert that `result` is the unit type
4. Print `Done.`

**Replace `5` with the unit type so the assert passes:**

```rust
fn log_payment() {
    println!("Payment logged.");
}

fn main() {
    let result = log_payment();
    assert_eq!(result, 5);
    println!("Done.");
}
```

#### Expected Output

```text
Payment logged.
Done.
```

<answer>
<summary>Answer</summary>

Replace `5` with `()`, that is what `log_payment` implicitly returns:

```rust
fn log_payment() {
    println!("Payment logged.");
}

fn main() {
    let result = log_payment();
    assert_eq!(result, ());
    println!("Done.");
}
```

</answer>

---

## Exercise 5 - bool and the OR Operator

The `||` operator (OR) takes two bools and produces one. It outputs `true` when EITHER input is `true`. Both do not need to be true, just one.

Compare it to AND:
- `&&` (AND): BOTH must be true, like needing a key AND a passcode
- `||` (OR): EITHER can be true, like a door that opens with a key OR a code

#### Your Task

A subscription gate should grant access when either trial OR paid status is true. Right now it uses `&&` instead of `||`, so access is denied when only one condition is true.

1. Check whether a user has trial access OR a paid account
2. Print `"Access granted."` if either condition is true

**Change one operator so the check passes when either is true:**

```rust
fn main() {
    let is_trial: bool = true;
    let is_paid: bool = false;

    if is_trial && is_paid {
        println!("Access granted.");
    }
}
```

#### Expected Output

```text
Access granted.
```

<answer>
<summary>Answer</summary>

Change `&&` to `||`, access is granted when either condition is true:

```rust
fn main() {
    let is_trial: bool = true;
    let is_paid: bool = false;

    if is_trial || is_paid {
        println!("Access granted.");
    }
}
```

</answer>

---

## Exercise 6 - Contract Build: Subscription Gate

You now know the four small types that show up constantly in contracts:

- `char` for single-character codes (like a plan tier label)
- `bool` for yes/no flags (active, approved, valid)
- `()` for functions that act but return nothing
- `||` and `&&` to combine bool conditions, OR for either, AND for both

This exercise puts them together. The contract checks whether a subscriber can be charged before processing a payment.

#### Your Task

A subscription gate checks the plan tier and account status before charging a subscriber. Right now it has two bugs: `plan` uses double quotes, and `is_active` is set to the wrong value.

1. Set `plan` to the character `'P'` (for Pro tier)
2. Set `is_active` to `true`
3. Check both conditions with `&&`
4. Print `"Charging Pro subscriber."` if both pass

**Fix both bugs so the payment message prints:**

```rust
fn main() {
    let plan: char = "P";
    let is_active: bool = false;

    if plan == 'P' && is_active {
        println!("Charging Pro subscriber.");
    }
}
```

#### Expected Output

```text
Charging Pro subscriber.
```

<answer>
<summary>Answer</summary>

Change `"P"` to `'P'` and `false` to `true`:

```rust
fn main() {
    let plan: char = 'P';
    let is_active: bool = true;

    if plan == 'P' && is_active {
        println!("Charging Pro subscriber.");
    }
}
```

</answer>

---

**End of Chars, Bools & Unit Types.**

