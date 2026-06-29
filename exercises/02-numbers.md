# Practice - Numbers & Binary System

> DRAFT FOR REVIEW - Follows `EXERCISE-STYLE-GUIDE.md`

Work through each exercise in the [Rust Playground](https://play.rust-lang.org).  
Read the explainer, paste the starter code, fix it, then move on.  
Check your answer only after you've tried.

---

## Quick reference

| Concept | What it means |
|---|---|
| `i32` | A whole number that can be positive or negative (the default) |
| `u32` | A whole number that is always positive, no minus sign allowed |
| `u64` | A large always-positive number, used for lamports in Solana |
| `f64` | A number with a decimal point (the default for floats) |
| `as` | Converts a number from one type to another |
| Type inference | When you don't annotate a type, Rust guesses i32 for integers and f64 for floats |

---

## Exercise 1 - Signed vs Unsigned

In Rust, every number has a type. The type tells Rust two things: how big the number can be and whether it can be negative.

- **Signed integers** (`i8`, `i16`, `i32`, `i64`) can be positive or negative. The `i` stands for the minus sign that could be in front of the number.
- **Unsigned integers** (`u8`, `u16`, `u32`, `u64`) are always positive. No minus sign, hence unsigned.

The default integer type in Rust is `i32`. If you don't write a type annotation, Rust picks `i32` for you.

In a Solana contract, payment amounts are stored as `u64`, a large always-positive number. You can never owe a negative number of lamports.

The code below wants to:
1. Store a negative balance adjustment as `i32`
2. Store a payment amount as `u64`
3. Print both

Right now it fails because `amount` is typed as `i32` but is assigned a `u64` value, and `adjustment` has no type annotation.

**Fill in the two blanks so the code compiles and prints both values:**

```rust
fn main() {
    let adjustment: ___ = -500;
    let amount: ___ = 1_000_000u64;
    println!("Adjustment: {}", adjustment);
    println!("Amount: {}", amount);
}
```

#### Expected Output

```text
Adjustment: -500
Amount: 1000000
```

<answer>
<summary>Answer</summary>

`adjustment` can go negative so it needs a signed type. `amount` must be `u64` to match the value.

```rust
fn main() {
    let adjustment: i32 = -500;
    let amount: u64 = 1_000_000u64;
    println!("Adjustment: {}", adjustment);
    println!("Amount: {}", amount);
}
```

</answer>

---

## Exercise 2 - Type Inference and Mismatch

Rust infers the type of a variable from what you assign to it. If you write `let x = 5`, Rust picks `i32`, the default integer type. If you want a different type, you must say so explicitly.

You cannot assign a variable of one type to a variable of a different type. Rust will refuse to compile. The fix is either to remove the type annotation and let Rust infer, or to cast the value using `as`.

The code below wants to:
1. Set `x` to `5` (Rust infers `i32`)
2. Assign `x` to `y`, which is typed as `u32`
3. Store `z` by inferring its type from `y`

Right now it fails because you cannot assign an `i32` directly to a `u32` variable.

**Remove the type annotation from `y` so Rust infers the same type as `x`:**

```rust
fn main() {
    let x = 5;
    let y: u32 = x;
    let z = y;
    println!("x={} y={} z={}", x, y, z);
}
```

#### Expected Output

```text
x=5 y=5 z=5
```

<answer>
<summary>Answer</summary>

Remove the `: u32`, Rust will infer `i32` from `x` and assign the same type to `y`:

```rust
fn main() {
    let x = 5;
    let y = x;
    let z = y;
    println!("x={} y={} z={}", x, y, z);
}
```

</answer>

---

## Exercise 3 - Casting with `as`

Sometimes you need to convert a number from one type to another, for example, turning an `i32` into a `u64`. Rust does not do this automatically. You must use the `as` keyword to cast it explicitly.

Think of `as` like a label swap: you are telling Rust "treat this value as this other type."

The code below wants to:
1. Start with `fee` as an `i32`
2. Convert it to `u64` using `as` and store it in `lamports`
3. Print the lamport value

Right now `lamports` is missing the cast.

**Fill in the blank to convert `fee` to `u64`:**

```rust
fn main() {
    let fee: i32 = 5000;
    let lamports: u64 = ___;
    println!("Lamports: {}", lamports);
}
```

#### Expected Output

```text
Lamports: 5000
```

<answer>
<summary>Answer</summary>

```rust
fn main() {
    let fee: i32 = 5000;
    let lamports: u64 = fee as u64;
    println!("Lamports: {}", lamports);
}
```

</answer>

---

## Exercise 4 - Overflow: Picking the Right Type

Every integer type has a maximum value it can hold. A `u8` can only go up to 255. If you try to store 259 in a `u8`, the program panics, the number overflowed.

The fix is to use a bigger type. `u16` can hold up to 65,535. `u64` can hold numbers in the quintillions, more than enough for any payment amount.

In Solana, lamports are `u64` because subscription amounts, fees, and balances can grow very large. Using a type that's too small would cause your contract to panic.

The code below wants to:
1. Add `base` and `fee` together
2. Store the result in `total`
3. Print the total

Right now it fails because `base` is typed as `u8` and the result overflows.

**Change one type annotation so the addition works:**

```rust
fn main() {
    let base: u8 = 250;
    let fee: u8 = 20;
    let total = base + fee;
    println!("Total: {}", total);
}
```

#### Expected Output

```text
Total: 270
```

<answer>
<summary>Answer</summary>

Change both `u8` to `u16` (or any larger type). `u8` maxes out at 255, 270 overflows it:

```rust
fn main() {
    let base: u16 = 250;
    let fee: u16 = 20;
    let total = base + fee;
    println!("Total: {}", total);
}
```

</answer>

---

## Exercise 5 - Floating Point Numbers

Rust has two floating-point types: `f32` and `f64`. A floating-point number is any number with a decimal point, like `9.99` or `3.14`. Rust defaults to `f64` when you write a decimal without a type annotation, it is the standard choice because it is more precise.

The rule that matters most: **you cannot mix a float and an integer in math without converting first**. `9.99 * 3` will not compile because `f64` and `i32` are different types. You must cast the integer to a float using `as f64`.

The code below wants to:
1. Multiply a price (`f64`) by a quantity (integer)
2. Store the result in `total`
3. Print `Total: 29.97`

Right now it fails because `quantity` is an `i32` and Rust will not multiply it by an `f64` directly.

**Add one cast so the multiplication compiles:**

```rust
fn main() {
    let price: f64 = 9.99;
    let quantity: i32 = 3;
    let total = price * quantity;
    println!("Total: {}", total);
}
```

#### Expected Output

```text
Total: 29.97
```

<answer>
<summary>Answer</summary>

Cast `quantity` to `f64` so the types match:

```rust
fn main() {
    let price: f64 = 9.99;
    let quantity: i32 = 3;
    let total = price * quantity as f64;
    println!("Total: {}", total);
}
```

</answer>

---

## Exercise 6 - Contract Build: Annotate a Payment

You now know the five things that matter for numbers in a Solana contract:

1. Use `u64` for lamport amounts, always positive, large enough for any payment
2. Use `i32` (or another signed type) when a value could be negative
3. Annotate the type explicitly when the default `i32` is wrong
4. Use `as` to convert between types when you must
5. Use `f64` for decimal math, but cast integers before mixing them with floats

This exercise puts them together. The contract below tracks a subscription payment: a base amount, a discount to subtract, and a final total.

The code below wants to:
1. Set `base_amount` to `1_000_000` lamports (`u64`)
2. Set `discount` to `50_000` (`u64`)
3. Compute `total` as `base_amount - discount`
4. Print `Payment: 950000 lamports`

Right now all three variables are missing type annotations, and `total` is not computed.

**Fill in the blanks so the code compiles and prints the correct total:**

```rust
fn main() {
    let base_amount: ___ = 1_000_000;
    let discount: ___ = 50_000;
    let total: ___ = ___;
    println!("Payment: {} lamports", total);
}
```

#### Expected Output

```text
Payment: 950000 lamports
```

<answer>
<summary>Answer</summary>

```rust
fn main() {
    let base_amount: u64 = 1_000_000;
    let discount: u64 = 50_000;
    let total: u64 = base_amount - discount;
    println!("Payment: {} lamports", total);
}
```

</answer>

---

**End of Numbers & Binary System.**
