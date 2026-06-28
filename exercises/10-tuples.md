# Practice - Tuples

> DRAFT FOR REVIEW - Follows `EXERCISE-STYLE-GUIDE.md`

Work through each exercise in the [Rust Playground](https://play.rust-lang.org).  
Read the explainer, paste the starter code, fix it, then move on.  
Check your answer only after you've tried.

> 🔔 Common mistakes to watch for:
> - The `:` labels the type. The `=` puts the value inside. They are two separate jobs.
> - When copying code, don't paste the backtick fence lines (`` ``` ``) into the Rust Playground.
> - String values need quote marks: `"basic"` is a string, but `basic` is a variable name.

---

## Quick reference

| Concept | What it means |
|---|---|
| Tuple | A single variable that holds multiple values of different types grouped together. |
| `(i32, &str)` | Tuple type signature: parentheses with the types inside, separated by commas. |
| `t.0` | Tuple indexing: the first element is at index 0, the second at 1, and so on. |
| Destructuring | Pulling a tuple apart into separate variables with `let (a, b) = t;`. |
| Nested tuple | A tuple inside another tuple, like `(u8, (i32, i32))`. |

---

## Track A - Generic Rust

---

### Exercise 1 - Annotating a Tuple with Mixed Types

This exercise tests tuple creation and type annotation. In a contract, a single record might group a subscriber ID and their balance together as one unit.

The code wants to store an integer `1` and a string slice `"hello"` in one tuple called `t`, then print the second element. Right now the type annotation has blanks.

A tuple is a way to store related pieces of information in a single variable. It's a collection of values of different types grouped together as one compound value. Think of it like an address book entry that holds a name and a phone number together.

```rust
fn main() {
    let t: (___, ___) = (1, "hello");
    println!("Second: {}", t.1);
}
```

**Fill in the two blanks so the tuple type matches the values exactly.**

#### Expected output

```
Second: hello
```

> Common mistake: The `:` labels the type. The `=` puts the value inside. Writing `let t: (i32 = 1, &str = "hello")` is wrong you only need the type after the colon, and the value after the equals sign.

<details>
<summary>Answer</summary>

A tuple type lists the types inside parentheses in the same order as the values. `1` is an integer, so `i32`. `"hello"` is a string slice, so `&str`.

```rust
fn main() {
    let t: (i32, &str) = (1, "hello");
    println!("Second: {}", t.1);
}
```

</details>

---

### Exercise 2 - Annotating a Five-Element Tuple

This exercise tests annotating a tuple that holds many different types. In a contract, a payment record might bundle an ID, a plan name, an amount, a status flag, and a version number.

The code wants to create a 5-element tuple with a specific type for each slot. Right now the type annotation has blanks.

Tuple elements can have different types, and the entire type signature must list every type in order inside parentheses. For example, a tuple holding an unsigned 8-bit integer and a signed 16-bit integer has the type `(u8, i16)`.

```rust
fn main() {
    let t: (___, ___, ___, ___, ___) = (1u8, -1i16, 3i64, "hello", String::from("world"));
    println!("Tuple created");
}
```

**Fill in the five blanks with the correct types for each element.**

#### Expected output

```
Tuple created
```

<details>
<summary>Answer</summary>

The types are `u8`, `i16`, `i64`, `&str`, and `String`.

```rust
fn main() {
    let t: (u8, i16, i64, &str, String) = (1u8, -1i16, 3i64, "hello", String::from("world"));
    println!("Tuple created");
}
```

</details>

---

### Exercise 3 - Reading a Nested Tuple

This exercise tests nested tuples and zero-based indexing. In a contract, a wallet record might hold an address and a nested pair `(balance, nonce)`.

The code wants to read the second value inside the inner tuple. Right now it uses the wrong index.

Tuples can be nested: one tuple can hold another tuple inside it. Indexing is zero-based, so the first element is `.0`, the second is `.1`, and the third is `.2`.

```rust
fn main() {
    let t: (u8, (i16, u32)) = (1, (-1, 3));
    println!("Inner second: {}", t.1.2);
}
```

**Fix the index so the code prints the second value of the inner tuple.**

#### Expected output

```
Inner second: 3
```

<details>
<summary>Answer</summary>

`t.1` reaches the inner tuple `(-1, 3)`. The second element of that inner tuple is at index `.1`, not `.2`.

```rust
fn main() {
    let t: (u8, (i16, u32)) = (1, (-1, 3));
    println!("Inner second: {}", t.1.1);
}
```

</details>

---

### Exercise 4 - Accessing the Third Element

This exercise tests tuple indexing. In a contract, a helper might need the third field of a payment record.

The code wants to print the third element of a 5-element tuple. Right now the index is missing.

Members are extracted using indexing with a dot and a number. The first element is at index `0`, the second at `1`, and the third at `2`.

```rust
fn main() {
    let t: (u8, i16, i64, &str, String) = (1, -1, 3, "hello", String::from("world"));
    println!("Third: {}", t.___);
}
```

**Fill in the blank to access the third element. Remember: indexing starts at 0.**

#### Expected output

```
Third: 3
```

<details>
<summary>Answer</summary>

The third element is at index `2`.

```rust
fn main() {
    let t: (u8, i16, i64, &str, String) = (1, -1, 3, "hello", String::from("world"));
    println!("Third: {}", t.2);
}
```

</details>

---

### Exercise 5 - Destructuring a Tuple with `let`

This exercise tests destructuring a tuple into separate variables. In a contract, you might unpack a `(plan, price)` tuple into named fields for easier reading.

The code wants to pull `t` apart into three variables and print them. Right now the destructuring pattern is missing.

Destructuring a tuple means using a pattern on the left side of `let` that mirrors the tuple's shape. The first element goes into the first variable, the second into the second, and so on.

```rust
fn main() {
    let t = (10, 20, 30);
    let ___ = t;
    println!("x = {}, y = {}, z = {}", x, y, z);
}
```

**Fill in the blank to destructure the tuple into variables `x`, `y`, and `z`.**

#### Expected output

```
x = 10, y = 20, z = 30
```

<details>
<summary>Answer</summary>

Use `let (x, y, z) = t;` to match the three-element shape.

```rust
fn main() {
    let t = (10, 20, 30);
    let (x, y, z) = t;
    println!("x = {}, y = {}, z = {}", x, y, z);
}
```

</details>

---

### Exercise 6 - Destructuring into Existing Variables

This exercise tests destructuring assignments without `let`. In a contract, you might update existing fee variables from a new calculation tuple.

The code wants to overwrite existing variables `a` and `b` with the values from a tuple, without declaring new variables.

Rust allows destructuring into existing variables by writing the pattern on the left side of an assignment, with no `let` keyword.

```rust
fn main() {
    let t = (100, 200);
    let mut a = 0;
    let mut b = 0;
    ___ = t;
    println!("a = {}, b = {}", a, b);
}
```

**Fill in the blank to destructure `t` into the existing variables `a` and `b`. Do not add `let`.**

#### Expected output

```
a = 100, b = 200
```

<details>
<summary>Answer</summary>

Write `(a, b) = t;` to assign both fields at once.

```rust
fn main() {
    let t = (100, 200);
    let mut a = 0;
    let mut b = 0;
    (a, b) = t;
    println!("a = {}, b = {}", a, b);
}
```

</details>

---

### Exercise 7 - Passing a Tuple to a Function

This exercise tests tuples as function arguments and return values. In a contract, a fee-splitting helper might accept one tuple and return another.

The code wants to pass a single tuple to `some_multiply()`, which returns a tuple of the sum and product. Then it destructures the result into `x` and `y` and prints them.

A function can accept a tuple as a single argument and return a tuple. Inside the function, you access the fields with dot indexing. At the call site, you can destructure the returned tuple.

```rust
fn some_multiply(t: (i32, i32)) -> (i32, i32) {
    (t.0 + t.1, t.0 * t.1)
}

fn main() {
    let (x, y) = some_multiply(___);
    println!("Sum: {}, Product: {}", x, y);
}
```

**Fill in the blank to pass the tuple `(2, 3)` as a single argument.**

#### Expected output

```
Sum: 5
Product: 6
```

<details>
<summary>Answer</summary>

Pass the tuple using the same parentheses syntax: `(2, 3)`.

```rust
fn some_multiply(t: (i32, i32)) -> (i32, i32) {
    (t.0 + t.1, t.0 * t.1)
}

fn main() {
    let (x, y) = some_multiply((2, 3));
    println!("Sum: {}, Product: {}", x, y);
}
```

</details>

---

### Exercise 8 - Write from Scratch

No starter code. No hints. Write it from scratch.

Write a program that:

1. Defines a function `calculate_split(total: (u64, u64)) -> (u64, u64)` where the tuple is `(amount, fee_percent)`.
2. Inside the function, calculate `fee = amount * fee_percent / 100` and return `(amount - fee, fee)`.
3. In `main`, create a tuple `payment = (2000, 5)`.
4. Call `calculate_split(payment)` and destructure the result into `to_merchant` and `to_treasury`.
5. Print: `Merchant: [value], Treasury: [value]`

#### Expected output

```
Merchant: 1900, Treasury: 100
```

<details>
<summary>Answer</summary>

```rust
fn calculate_split(total: (u64, u64)) -> (u64, u64) {
    let amount = total.0;
    let fee_percent = total.1;
    let fee = amount * fee_percent / 100;
    (amount - fee, fee)
}

fn main() {
    let payment = (2000, 5);
    let (to_merchant, to_treasury) = calculate_split(payment);
    println!("Merchant: {}, Treasury: {}", to_merchant, to_treasury);
}
```

</details>

---

## Track B - Contract

All exercises below apply the same tuple concepts to a subscription payment contract. The same Rust rules different clothes.

---

### Exercise 1 - Annotating a Subscriber Tuple

This exercise tests tuple creation and type annotation. In a contract, a subscriber record might group a wallet address and a plan name as a single unit.

The code wants to store a wallet address and a plan name in one tuple, then print the plan. Right now the type annotation has a blank.

A tuple is a single variable that holds multiple values of different types grouped together. It's like putting a name tag and a receipt into one envelope.

```rust
fn main() {
    let subscriber: (&str, ___) = ("wallet_abc", "premium");
    println!("Plan: {}", subscriber.1);
}
```

**Fill in the blank so the tuple type matches both values.**

#### Expected output

```
Plan: premium
```

<details>
<summary>Answer</summary>

Both values are string slices, so the second type is `&str`.

```rust
fn main() {
    let subscriber: (&str, &str) = ("wallet_abc", "premium");
    println!("Plan: {}", subscriber.1);
}
```

</details>

---

### Exercise 2 - Annotating a Five-Element Payment Record

This exercise tests annotating a tuple that holds many different types. In a contract, a payment record might bundle a subscriber ID, a plan name, an amount in lamports, an active flag, and a version number.

The code wants to create a 5-element tuple with a specific type for each slot. Right now the type annotation has blanks.

A tuple type lists every element's type inside parentheses, in the same order as the values. For example, a tuple with a string slice and a 64-bit unsigned integer has the type `(&str, u64)`.

```rust
fn main() {
    let record: (___, ___, ___, ___, ___) = ("sub_001", "premium", 10_000_000u64, true, 1u8);
    println!("Record ready");
}
```

**Fill in the five blanks with the correct types for each element.**

#### Expected output

```
Record ready
```

> Common mistake: The `:` labels the type. The `=` puts the value inside. Make sure you write types after the colon and values after the equals sign.

<details>
<summary>Answer</summary>

The types are `&str`, `&str`, `u64`, `bool`, and `u8`.

```rust
fn main() {
    let record: (&str, &str, u64, bool, u8) = ("sub_001", "premium", 10_000_000u64, true, 1u8);
    println!("Record ready");
}
```

</details>

---

### Exercise 3 - Reading a Nested Wallet Record

This exercise tests nested tuples and zero-based indexing. In a contract, a wallet entry might hold an address and a nested pair `(balance, nonce)`.

The code wants to read the second value inside the inner tuple. Right now it uses the wrong index.

Tuples can contain other tuples. Indexing is zero-based: the first element is `.0`, the second is `.1`. To reach deeper, you chain the dots.

```rust
fn main() {
    let entry: (&str, (u64, u32)) = ("wallet_abc", (1_000_000, 42));
    println!("Nonce: {}", entry.1.2);
}
```

**Fix the index so the code prints the second value of the inner tuple.**

#### Expected output

```
Nonce: 42
```

<details>
<summary>Answer</summary>

`entry.1` reaches the inner tuple `(1_000_000, 42)`. The second element is at index `.1`, not `.2`.

```rust
fn main() {
    let entry: (&str, (u64, u32)) = ("wallet_abc", (1_000_000, 42));
    println!("Nonce: {}", entry.1.1);
}
```

</details>

---

### Exercise 4 - A Subscriber List Tuple Is Too Long

This exercise tests the 12-element limit for printing tuples with debug formatting. In a contract, a large static list might accidentally exceed this limit when you try to log it.

The code creates a tuple with 14 subscriber IDs and tries to print it with `{:?}`. Right now it fails because tuples with more than 12 elements cannot implement the `Debug` trait needed for printing.

Rust can print tuples with up to 12 elements using `{:?}`. If a tuple exceeds 12 elements, it is still valid but it cannot be printed this way.

```rust
fn main() {
    let ids = ("sub_01", "sub_02", "sub_03", "sub_04", "sub_05", "sub_06", "sub_07", "sub_08", "sub_09", "sub_10", "sub_11", "sub_12", "sub_13", "sub_14");
    println!("{:?}", ids);
}
```

**Remove exactly two elements so the tuple can be printed with `{:?}`. Don't remove the `println!` line.**

#### Expected output

```
("sub_01", "sub_02", "sub_03", "sub_04", "sub_05", "sub_06", "sub_07", "sub_08", "sub_09", "sub_10", "sub_11", "sub_12")
```

<details>
<summary>Answer</summary>

A tuple with 12 elements is printable; with 14 it is not. Remove any two elements.

```rust
fn main() {
    let ids = ("sub_01", "sub_02", "sub_03", "sub_04", "sub_05", "sub_06", "sub_07", "sub_08", "sub_09", "sub_10", "sub_11", "sub_12");
    println!("{:?}", ids);
}
```

</details>

---

### Exercise 5 - Destructuring a Subscriber Tuple

This exercise tests destructuring a tuple into separate variables. In a contract, you might unpack a `(id, plan, amount)` tuple before processing a payment.

The code wants to pull the tuple apart into three named variables and print them. Right now the destructuring pattern is missing.

Destructuring means writing a pattern on the left side of `let` that matches the tuple's shape. The first element of the tuple goes into the first variable, the second into the second, and so on.

```rust
fn main() {
    let subscriber = ("sub_001", "premium", 10_000_000u64);
    let ___ = subscriber;
    println!("ID: {}, Plan: {}, Amount: {}", id, plan, amount);
}
```

**Fill in the blank to destructure the tuple into variables `id`, `plan`, and `amount`.**

#### Expected output

```
ID: sub_001, Plan: premium, Amount: 10000000
```

<details>
<summary>Answer</summary>

Use `let (id, plan, amount) = subscriber;` to match the three-element shape.

```rust
fn main() {
    let subscriber = ("sub_001", "premium", 10_000_000u64);
    let (id, plan, amount) = subscriber;
    println!("ID: {}, Plan: {}, Amount: {}", id, plan, amount);
}
```

</details>

---

### Exercise 6 - Updating Existing Variables from a Split

This exercise tests destructuring assignments without `let`. In a contract, two existing variables for fee and merchant share might be updated from a new calculation tuple.

The code wants to overwrite existing variables `fee` and `share` with the values from a tuple, without declaring new variables.

Rust allows you to destructure a tuple directly into existing variables by writing the pattern on the left side of an assignment, with no `let` keyword.

```rust
fn main() {
    let split = (500_000, 9_500_000);
    let mut fee = 0;
    let mut share = 0;
    ___ = split;
    println!("Fee: {}, Share: {}", fee, share);
}
```

**Fill in the blank to destructure `split` into the existing variables `fee` and `share`. Do not use `let`.**

#### Expected output

```
Fee: 500000, Share: 9500000
```

<details>
<summary>Answer</summary>

Write `(fee, share) = split;` to assign both fields at once.

```rust
fn main() {
    let split = (500_000, 9_500_000);
    let mut fee = 0;
    let mut share = 0;
    (fee, share) = split;
    println!("Fee: {}, Share: {}", fee, share);
}
```

</details>

---

### Exercise 7 - Passing a Payment Tuple to a Splitting Function

This exercise tests tuples as function arguments and return values. In a contract, a fee-splitting helper might take a single `(amount, fee_percent)` tuple and return `(merchant_amount, fee_amount)`.

The code wants to pass one tuple to `split_payment()`, then destructure the returned tuple into `to_merchant` and `to_treasury` and print them.

A function can accept a tuple as a single argument and return a tuple. Inside the function, you reach the fields with dot indexing. At the call site, you can destructure the result.

```rust
fn split_payment(total: (u64, u64)) -> (u64, u64) {
    let amount = total.0;
    let fee_percent = total.1;
    let fee = amount * fee_percent / 100;
    (amount - fee, fee)
}

fn main() {
    let (to_merchant, to_treasury) = split_payment(___);
    println!("Merchant: {}, Treasury: {}", to_merchant, to_treasury);
}
```

**Fill in the blank to pass the tuple `(1000, 5)` as a single argument.**

#### Expected output

```
Merchant: 950
Treasury: 50
```

<details>
<summary>Answer</summary>

Pass the tuple `(1000, 5)` with parentheses.

```rust
fn split_payment(total: (u64, u64)) -> (u64, u64) {
    let amount = total.0;
    let fee_percent = total.1;
    let fee = amount * fee_percent / 100;
    (amount - fee, fee)
}

fn main() {
    let (to_merchant, to_treasury) = split_payment((1000, 5));
    println!("Merchant: {}, Treasury: {}", to_merchant, to_treasury);
}
```

</details>

---

### Exercise 8 - Write from Scratch

No starter code. No hints. Write it from scratch.

A contract tracks a bundle of `(plan, amount, discount_percent)`. Write a program that:

1. Defines a function `apply_discount(bundle: (&str, u64, u8)) -> (&str, u64, u8)` where the tuple is `(plan, amount, discount_percent)`.
2. Inside the function, calculate `discounted = amount - (amount * discount_percent / 100)` and return `(plan, discounted, discount_percent)`.
3. In `main`, create a tuple `bundle = ("premium", 10000u64, 10u8)`.
4. Call `apply_discount(bundle)` and destructure the result into `plan`, `final_amount`, and `_pct`.
5. Print: `Plan: [plan], Final amount: [final_amount]`

#### Expected output

```
Plan: premium, Final amount: 9000
```

<details>
<summary>Answer</summary>

```rust
fn apply_discount(bundle: (&str, u64, u8)) -> (&str, u64, u8) {
    let plan = bundle.0;
    let amount = bundle.1;
    let discount_percent = bundle.2;
    let discounted = amount - (amount * discount_percent / 100);
    (plan, discounted, discount_percent)
}

fn main() {
    let bundle = ("premium", 10000u64, 10u8);
    let (plan, final_amount, _pct) = apply_discount(bundle);
    println!("Plan: {}, Final amount: {}", plan, final_amount);
}
```

</details>

---

**End of Tuples.**
