# Practice - Variables (v2)

> This file follows the format in `EXERCISE-STYLE-GUIDE.md`.
> Read the style guide before editing.

Work through each exercise in the [Rust Playground](https://play.rust-lang.org).  
Read the explainer, paste the starter code, fix it, then move on.  
Check your answer only after you've tried.

---

## Quick reference

| Concept | What it means |
|---|---|
| `let x = 5` | Declare a variable and give it a value |
| `let mut x = 5` | Declare a variable you can change later |
| `i32` | A whole number - can be positive or negative |
| `u64` | A whole number - always positive, used for lamports |
| Scope | A variable only exists inside the `{ }` block where it was declared |
| Shadowing | Declaring a new variable with the same name - the new one takes over |
| Destructuring | Unpacking a tuple into separate variables in one line |

---

## Track A - Generic Rust

---

### Exercise 1 - Binding

In Rust, declaring a variable and giving it a value are two separate steps. The `:` labels the type - what kind of value it holds. The `=` assigns the actual value. Both must happen before you can use the variable.

In smart contracts, every value must be initialized before it can be used in a check or calculation.

#### Your Task

The code below wants to:

1. Set `x` to `5`
2. Assert it equals `5`
3. Print `Success!`

Right now it fails because `x` was declared but never given a value.

**Fix this so it compiles and prints `Success!`:**

```rust
fn main() {
    let x: i32;
    assert_eq!(x, 5);
    println!("Success!");
}
```

#### Expected Output

```text
Success!
```

<answer>
<summary>Answer</summary>

```rust
fn main() {
    let x: i32 = 5;
    assert_eq!(x, 5);
    println!("Success!");
}
```

</answer>

---

### Exercise 2 - Mutability

In Rust, every variable is locked by default. Once you give it a value, that value can't change.

If you need to change it later, add `mut` (short for **mutable**) when you declare it. This unlocks the variable so its value can be updated.

In smart contracts, values often need to change, such as applying a discount, adding a fee, or updating a balance.

#### Your Task

The code below wants to:

1. Start `x` at `1`
2. Add `2` to `x`
3. Print `x = 3`

Right now it fails because `x` is locked and cannot be changed.

**Fill in `___` so the code compiles and prints `x = 3`:**

```rust
fn main() {
    let ___ x: i32 = 1;
    x += 2;
    println!("x = {}", x);
}
```

#### Expected Output

```text
x = 3
```

<answer>
<summary>Answer</summary>

```rust
fn main() {
    let mut x: i32 = 1;
    x += 2;
    println!("x = {}", x);
}
```

</answer>

---

### Exercise 3 - Scope

Every `{ }` block in Rust creates a scope. A variable declared inside a scope only exists inside that scope. Once the closing `}` is reached, the variable is gone.

Think of it like rooms - a variable only exists in the room where it was declared.

In smart contracts, a wallet address declared inside a helper block won't be visible to the main payment logic.

#### Your Task

The code below wants to:

1. Declare `x = 10` and `y = 5`
2. Print both inside an inner block
3. Print both outside the inner block

Right now it fails because `y` is declared inside the block and isn't visible outside it.

**Fix this with the least amount of changes so both print statements can see `y`:**

```rust
fn main() {
    let x: i32 = 10;

    {
        let y: i32 = 5;
        println!("x = {}, y = {}", x, y);
    }

    println!("x = {}, y = {}", x, y);
}
```

#### Expected Output

```text
x = 10, y = 5
x = 10, y = 5
```

<answer>
<summary>Answer</summary>

Move `y` out of the inner block so both prints can see it:

```rust
fn main() {
    let x: i32 = 10;
    let y: i32 = 5;

    {
        println!("x = {}, y = {}", x, y);
    }

    println!("x = {}, y = {}", x, y);
}
```

</answer>

---

### Exercise 4 - Function Scope

Functions are their own scope. A variable declared inside a function only exists inside that function. A function that is never called never runs - every Rust program starts in `main`.

In smart contracts, a helper like `get_plan_price()` must be called from `main` before its logic runs.

#### Your Task

The code below wants to:

1. Call `define_x()`
2. Print `"hello, world!"`

Right now nothing happens because `define_x()` exists but is never called from `main`.

**Fix this so `define_x()` runs and prints `"hello, world!"`:**

```rust
fn main() {
    // nothing calls define_x yet
}

fn define_x() {
    let x: &str = "hello, world!";
    println!("{}", x);
}
```

#### Expected Output

```text
hello, world!
```

<answer>
<summary>Answer</summary>

```rust
fn main() {
    define_x();
}

fn define_x() {
    let x: &str = "hello, world!";
    println!("{}", x);
}
```

</answer>

**Extra rep - same concept, different code:**

```rust
fn main() {
    // call load_wallet here
}

fn load_wallet() {
    let wallet: &str = "ABC123";
    println!("Wallet loaded.");
}
```

Expected output: `Wallet loaded.`

---

### Exercise 5 - Shadowing

Shadowing means declaring a new variable with the same name. The new one hides the old one inside its scope. When you leave that scope, the old variable is visible again.

This is different from mutation - shadowing creates a brand new variable. The old one still exists, just hidden.

In smart contracts, shadowing is useful when a subscriber upgrades and the old plan value gets replaced by the new one.

#### Your Task

The code below wants to:

1. Set outer `x` to `5`
2. Shadow `x` inside a block with `12`
3. Assert the inner `x` equals the shadowed value
4. Assert the outer `x` is restored after the block exits
5. Print `Success!`

**Fill in the two blanks so both asserts pass:**

```rust
fn main() {
    let x: i32 = 5;

    {
        let x = 12;
        assert_eq!(x, ___);
    }

    assert_eq!(x, ___);
    println!("Success!");
}
```

#### Expected Output

```text
Success!
```

<answer>
<summary>Answer</summary>

```rust
fn main() {
    let x: i32 = 5;

    {
        let x = 12;
        assert_eq!(x, 12);
    }

    assert_eq!(x, 5);
    println!("Success!");
}
```

</answer>

---

### Exercise 6 - Shadowing + Mutability

When you shadow a variable, the new one starts fresh - immutable by default, even if the old one was mutable. You can't mutate the shadowed version unless you add `mut` again.

In payments, you might adjust a price while building it, then lock it in as the final charge. Once locked, nothing should change it.

A payment amount gets set, then locked in as the final charge. But something is trying to change it after it's been locked.

**Remove one line to fix it:**

```rust
fn main() {
    let mut price: i32 = 500;
    price = 1000;
    let price = price;
    price += 200;
    println!("Final charge: {}", price);
}
```

#### Expected Output

```text
Final charge: 1000
```

<answer>
<summary>Answer</summary>

Remove `price += 200` - once shadowed, `price` is locked and can't be changed:

```rust
fn main() {
    let mut price: i32 = 500;
    price = 1000;
    let price = price;
    println!("Final charge: {}", price);
}
```

</answer>

---

### Exercise 7 - Unused Variables

If you declare a variable but never use it, Rust gives a warning - not an error, just a heads-up. Two ways to silence it: prefix with `_` to mark it intentional, or add `#[allow(unused_variables)]` to the function.

In smart contracts, a declared fee or counter that's never used is dead code - Rust flags it so you don't miss it.

#### Your Task

This code compiles but throws an unused variable warning. Fix it two different ways - try each one separately in the Playground.

```rust
fn main() {
    let x = 5;
    println!("Done.");
}
```

#### Expected Output

```text
Done.
```

<answer>
<summary>Answer - Way 1 (underscore prefix)</summary>

```rust
fn main() {
    let _x = 5;
    println!("Done.");
}
```

</answer>

<answer>
<summary>Answer - Way 2 (allow attribute)</summary>

```rust
#[allow(unused_variables)]
fn main() {
    let x = 5;
    println!("Done.");
}
```

</answer>

---

### Exercise 8 - Destructuring

Destructuring lets you unpack a tuple into separate variables in one line. `let (x, y) = (1, 2)` breaks the tuple apart. Just like regular `let`, you add `mut` to any piece you need to change.

In smart contracts, a payment might arrive as a tuple `(treasury_share, creator_share)` that needs to be unpacked.

#### Your Task

The code below wants to:

1. Unpack `(1, 2)` into `x` and `y`
2. Add `2` to `x`
3. Assert `x == 3` and `y == 2`
4. Print `Success!`

Right now it fails because `x` was not declared mutable.

**Fix so the code compiles and prints `Success!`:**

```rust
fn main() {
    let (x, y) = (1, 2);
    x += 2;
    assert_eq!(x, 3);
    assert_eq!(y, 2);
    println!("Success!");
}
```

#### Expected Output

```text
Success!
```

<answer>
<summary>Answer</summary>

```rust
fn main() {
    let (mut x, y) = (1, 2);
    x += 2;
    assert_eq!(x, 3);
    assert_eq!(y, 2);
    println!("Success!");
}
```

</answer>

---

### Exercise 9 - Destructuring Assignment

Since Rust 1.59, you can destructure without `let` - as long as the variables already exist. `(x, y) = (10, 20)` updates both at once without creating new variables.

In smart contracts, this is useful for updating both treasury and creator shares in a single operation.

#### Your Task

The code below wants to:

1. Start with `x = 1` and `y = 2`
2. Reassign both to new values in one line
3. Assert `x` and `y` hold the new values
4. Print `Success!`

**Fill in the two blanks so the asserts pass:**

```rust
fn main() {
    let (mut x, mut y) = (1, 2);

    (x, y) = (3, 4);

    assert_eq!(x, ___);
    assert_eq!(y, ___);
    println!("Success!");
}
```

#### Expected Output

```text
Success!
```

<answer>
<summary>Answer</summary>

```rust
fn main() {
    let (mut x, mut y) = (1, 2);

    (x, y) = (3, 4);

    assert_eq!(x, 3);
    assert_eq!(y, 4);
    println!("Success!");
}
```

</answer>

---

### Exercise 10 - Write Cold

This exercise combines mutability, shadowing, and printing - all concepts from this section. In a real contract, you often need to declare, modify, and output values in sequence.

#### Your Task

Write a `main` function from scratch that:

- Declares a mutable variable `score` set to `10`
- Shadows it with a new `score` set to `score + 5`
- Asserts `score` equals `15`
- Prints `"Final score: 15"`

#### Expected Output

```text
Final score: 15
```

<answer>
<summary>Answer</summary>

```rust
fn main() {
    let mut score = 10;
    let score = score + 5;
    assert_eq!(score, 15);
    println!("Final score: 15");
}
```

</answer>

---

### Exercise 5 Build: Subscription Variables

Before a Solana payment contract can do anything, it needs to know four things about a subscriber: who they are, how much they owe, what plan they are on, and whether their subscription is active.

Each piece of information has a type. The type tells Rust what the value is allowed to be a whole number, a piece of text, true or false. Getting the types right is the first step in any contract.

#### Your Task

Declare four variables for a subscription contract:

- `wallet` the subscriber's address, type `&str`, value `"ABC123"`
- `amount` the payment in lamports, type `u64`, value `1_000_000`
- `plan` the plan name, type `&str`, value `"pro"`
- `is_active` whether the subscription is live, type `bool`, value `true`

Then print all four on one line.

**Write this from scratch:**

```rust
fn main() {
    // Your code here
}
```

#### Expected Output

```text
Wallet: ABC123, Amount: 1000000, Plan: pro, Active: true
```

<answer>
<summary>Answer</summary>

```rust
fn main() {
    let wallet: &str = "ABC123";
    let amount: u64 = 1_000_000;
    let plan: &str = "pro";
    let is_active: bool = true;
    println!("Wallet: {}, Amount: {}, Plan: {}, Active: {}", wallet, amount, plan, is_active);
}
```

</answer>

---

## Track B - Contract

All exercises below apply the same concepts to a subscription payment contract. The contract handles plans, payments, and wallet addresses.

---

### Exercise 1 - Binding

In Rust, declaring a variable and giving it a value are two separate steps. The `:` labels the type. The `=` assigns the value. Both must happen before you can use the variable.

In Solana, payment amounts measured in lamports use `u64` - a whole number that's always positive. Every field must be initialized before it can be checked or used.

#### Your Task

The code below wants to:

1. Set a payment amount to `1_000_000` lamports
2. Assert it equals `1_000_000`
3. Print `Amount set.`

Right now it fails because `amount` was declared but never given a value.

**Fix so it compiles and prints `Amount set.`:**

```rust
fn main() {
    let amount: u64;

    assert_eq!(amount, 1_000_000);
    println!("Amount set.");
}
```

#### Expected Output

```text
Amount set.
```

<answer>
<summary>Answer</summary>

```rust
fn main() {
    let amount: u64 = 1_000_000;

    assert_eq!(amount, 1_000_000);
    println!("Amount set.");
}
```

</answer>

---

### Exercise 2 - Mutability

In Rust, every variable is locked by default. Once you give it a value, it can't change. To unlock it, add `mut` when you declare it.

In smart contracts, payment amounts often change - applying a discount, adding a fee, or updating a subscriber's balance all require mutable variables.

#### Your Task

The code below wants to:

1. Start `amount` at `500_000` lamports
2. Add another `500_000`
3. Assert the total is `1_000_000`
4. Print `Amount: 1000000`

Right now it fails because `amount` is locked and cannot be changed.

**Fill in `___` so the code compiles:**

```rust
fn main() {
    let ___ amount: u64 = 500_000;
    amount += 500_000;
    assert_eq!(amount, 1_000_000);
    println!("Amount: {}", amount);
}
```

#### Expected Output

```text
Amount: 1000000
```

<answer>
<summary>Answer</summary>

```rust
fn main() {
    let mut amount: u64 = 500_000;
    amount += 500_000;
    assert_eq!(amount, 1_000_000);
    println!("Amount: {}", amount);
}
```

</answer>

---

### Exercise 3 - Scope

Every `{ }` block creates a scope. A variable declared inside a scope only exists inside that scope. Once the `}` is reached, the variable is gone.

In smart contracts, a wallet address declared inside a helper block won't be visible to the main payment logic.

#### Your Task

The code below wants to:

1. Declare a `wallet` address
2. Print it from outside the inner block

Right now it fails because `wallet` is declared inside the block and isn't visible outside it.

**Fix it so the wallet address is visible outside the block:**

```rust
fn main() {
    {
        let wallet: &str = "ABC123";
    }

    println!("Wallet: {}", wallet);
}
```

#### Expected Output

```text
Wallet: ABC123
```

<answer>
<summary>Answer</summary>

```rust
fn main() {
    let wallet: &str = "ABC123";

    {
        // inner block can still see wallet
    }

    println!("Wallet: {}", wallet);
}
```

</answer>

---

### Exercise 4 - Function Scope

Functions are their own scope. A variable declared inside a function only exists inside that function. A function that is never called never runs.

In smart contracts, a helper like `get_plan_price()` must be called from `main` - declaring it is not enough.

#### Your Task

The code below wants to:

1. Call `get_plan_price()`
2. Print `Plan price: 1000000`

Right now nothing happens because `get_plan_price()` is never called from `main`.

**Fix this so `get_plan_price()` runs and prints the price:**

```rust
fn main() {
    // nothing calls get_plan_price yet
}

fn get_plan_price() {
    let price: u64 = 1_000_000;
    println!("Plan price: {}", price);
}
```

#### Expected Output

```text
Plan price: 1000000
```

<answer>
<summary>Answer</summary>

```rust
fn main() {
    get_plan_price();
}

fn get_plan_price() {
    let price: u64 = 1_000_000;
    println!("Plan price: {}", price);
}
```

</answer>

---

### Exercise 5 - Shadowing

Shadowing means declaring a new variable with the same name. The new one hides the old one. In contracts, this is useful when a subscriber upgrades - the new plan name replaces the old one.

#### Your Task

The code below wants to:

1. Start with `plan = "basic"`
2. Shadow it with `"pro"`
3. Assert `plan` equals `"pro"`
4. Print `Plan: pro`

**Fill in `___` so the assert passes:**

```rust
fn main() {
    let plan = "basic";
    let plan = "___";
    assert_eq!(plan, "pro");
    println!("Plan: {}", plan);
}
```

#### Expected Output

```text
Plan: pro
```

<answer>
<summary>Answer</summary>

```rust
fn main() {
    let plan = "basic";
    let plan = "pro";
    assert_eq!(plan, "pro");
    println!("Plan: {}", plan);
}
```

</answer>

---

### Exercise 6 - Shadowing + Mutability

When you shadow a variable, the new one starts fresh - immutable by default, even if the old one was mutable. You can't mutate the shadowed version unless you add `mut` again.

In smart contracts, if you shadow a mutable balance with a calculated total, that total is locked unless re-declared with `mut`.

#### Your Task

The code below wants to:

1. Start `base` at `500_000` lamports
2. Add `200_000` to it
3. Shadow it as `total`
4. Print `Total: 700000`

Right now it fails because the shadowed `total` is immutable but the code tries to increment it.

**Remove one line so this compiles:**

```rust
fn main() {
    let mut base: u64 = 500_000;
    base += 200_000;
    let total = base;
    total += 100_000;
    println!("Total: {}", total);
}
```

#### Expected Output

```text
Total: 700000
```

<answer>
<summary>Answer</summary>

Remove `total += 100_000` - you can't mutate the shadowed (immutable) `total`:

```rust
fn main() {
    let mut base: u64 = 500_000;
    base += 200_000;
    let total = base;
    println!("Total: {}", total);
}
```

</answer>

---

### Exercise 7 - Unused Variables

If you declare a variable but never use it, Rust gives a warning - not an error, just a heads-up. Two ways to silence it: prefix with `_`, or add `#[allow(unused_variables)]`.

In smart contracts, a declared fee or counter that's never used is dead code - Rust flags it so you don't miss it.

#### Your Task

This code compiles but throws an unused variable warning. Fix it two different ways - try each one separately in the Playground.

```rust
fn main() {
    let fee: u64 = 5000;
    println!("Contract ready.");
}
```

#### Expected Output

```text
Contract ready.
```

<answer>
<summary>Answer - Way 1 (underscore prefix)</summary>

```rust
fn main() {
    let _fee: u64 = 5000;
    println!("Contract ready.");
}
```

</answer>

<answer>
<summary>Answer - Way 2 (allow attribute)</summary>

```rust
#[allow(unused_variables)]
fn main() {
    let fee: u64 = 5000;
    println!("Contract ready.");
}
```

</answer>

---

### Exercise 8 - Destructuring

Destructuring lets you unpack a tuple into separate variables in one line. The `u64` suffix on a number tells Rust the type - same as `: u64` in a type annotation.

In smart contracts, a payment split often arrives as a tuple and needs to be unpacked before processing.

#### Your Task

This code already compiles. Run it in the Playground and make sure you understand what's happening.

```rust
fn main() {
    let (treasury, creator) = (800_000u64, 200_000u64);
    assert_eq!(treasury + creator, 1_000_000);
    println!("Treasury: {}, Creator: {}", treasury, creator);
}
```

#### Expected Output

```text
Treasury: 800000, Creator: 200000
```

<answer>
<summary>What's happening here</summary>

`(800_000u64, 200_000u64)` is a tuple holding two `u64` values.  
`let (treasury, creator) = ...` unpacks them into two separate variables.  
The `u64` suffix after the number tells Rust the type - same as `: u64` in a type annotation.

</answer>

---

### Exercise 9 - Destructuring Assignment

Since Rust 1.59, you can destructure without `let` - as long as the variables already exist. This updates multiple variables at once without creating new ones.

In smart contracts, this is useful for updating both treasury and creator shares in a single operation.

#### Your Task

The code below wants to:

1. Start with `treasury = 600_000` and `creator = 400_000`
2. Update both to new values in one line
3. Assert the new values
4. Print `Split updated.`

**Fill in the two blanks so the asserts pass:**

```rust
fn main() {
    let (mut treasury, mut creator) = (600_000u64, 400_000u64);

    (treasury, creator) = (700_000, 300_000);

    assert_eq!(treasury, ___);
    assert_eq!(creator, ___);
    println!("Split updated.");
}
```

#### Expected Output

```text
Split updated.
```

<answer>
<summary>Answer</summary>

```rust
fn main() {
    let (mut treasury, mut creator) = (600_000u64, 400_000u64);

    (treasury, creator) = (700_000, 300_000);

    assert_eq!(treasury, 700_000);
    assert_eq!(creator, 300_000);
    println!("Split updated.");
}
```

</answer>

---

### Exercise 10 - Write Cold

This exercise combines all variable concepts in a contract context. In a real contract, you declare, modify, check, and output values in sequence.

#### Your Task

Write a `main` function from scratch that:

- Declares a `wallet` variable holding `"ABC123"`
- Declares a mutable `lamports` set to `500_000u64`
- Doubles `lamports`
- Asserts `lamports` equals `1_000_000`
- Prints `"Payment ready."`

#### Expected Output

```text
Payment ready.
```

<answer>
<summary>Answer</summary>

```rust
fn main() {
    let wallet = "ABC123";
    let mut lamports = 500_000u64;
    lamports *= 2;
    assert_eq!(lamports, 1_000_000);
    println!("Payment ready.");
}
```

</answer>

---

**End of Variables v2.**
