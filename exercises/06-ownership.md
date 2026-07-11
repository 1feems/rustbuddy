# Practice - Ownership

> DRAFT FOR REVIEW - Follows `EXERCISE-STYLE-GUIDE.md`

Work through each exercise in the [Rust Playground](https://play.rust-lang.org).  
Read the explainer, paste the starter code, fix it, then move on.  
Check your answer only after you've tried.

---

## Quick reference

| Concept | What it means |
|---|---|
| Owner | The variable that holds a value. Only one owner at a time. |
| Move | Transferring ownership from one variable to another. The old variable becomes invalid. |
| `.clone()` | Deep copy - duplicates heap data so both variables stay valid. |
| Copy trait | Stack-only types (like `i32`, `u64`, `bool`) are automatically copied. No move happens. |
| `into_bytes()` | Consumes a `String` - the original is gone afterward. |
| `as_bytes()` | Borrows a `String` - the original stays valid. |
| `Box::new()` | Puts a value on the heap and returns a pointer to it. |

---

## Track A - Generic Rust

---

### Exercise 1 - Move Semantics

In Rust, every value has exactly one owner. When you assign a heap value like `String` to a new variable, ownership moves - the old variable becomes invalid. Rust does this to prevent double-free errors.

Think of it as handing over the keys to a car - only one person can own it at a time.

#### Your Task

`s1` is assigned to `s2`, which moves ownership. `s1` is now invalid. The data is not gone, it lives in `s2` now.

Run the code as-is and read the error. Then fix it by removing the line that uses `s1`.

**Remove one line so the code only uses `s2`:**

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;

    println!("s1 = {}", s1);
    println!("s2 = {}", s2);
}
```

#### Expected Output

```text
s2 = hello
```

<answer>
<summary>Answer</summary>

Remove the `s1` print line. After the move, `s1` is invalid. `s2` owns the data:

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;

    println!("s2 = {}", s2);
}
```

</answer>

---

### Exercise 2 - Clone

`.clone()` duplicates the entire heap allocation so both variables get independent copies. Stack types like `i32` don't need it - they copy automatically. Heap types like `String` do not copy automatically.

#### Your Task

`s1` is moved to `s2`, which invalidates `s1`. You need an independent copy so both variables stay valid.

1. Duplicate `s1` before the move
2. Print both

**Add one method call so both variables stay valid:**

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;

    println!("s1 = {}", s1);
    println!("s2 = {}", s2);
}
```

#### Expected Output

```text
s1 = hello
s2 = hello
```

<answer>
<summary>Answer</summary>

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1.clone();

    println!("s1 = {}", s1);
    println!("s2 = {}", s2);
}
```

</answer>

---

### Exercise 3 - Copy Trait

Some types implement the `Copy` trait - meaning assignment duplicates the value instead of moving it. These are stack-only types with a fixed size: `i32`, `u64`, `bool`, etc.

Heap types like `String` do NOT implement `Copy`. That's why they move instead of copy.

#### Your Task

This code already compiles. `i32` is a stack type — Rust copies it on assignment, no move happens. Both `x1` and `x2` hold independent copies.

Paste and run it. Then add one line that confirms `x2` still holds `10`.

**Add `assert_eq!(x2, 10);` before the print:**

```rust
fn main() {
    let x1: i32 = 10;
    let x2 = x1;

    println!("x1 = {}, x2 = {}", x1, x2);
}
```

#### Expected Output

```text
x1 = 10, x2 = 10
```

<answer>
<summary>Answer</summary>

`i32` lives entirely on the stack and has a fixed size known at compile time.  
Rust automatically copies it on assignment - no move happens.  
Both `x1` and `x2` hold independent copies of `10`.  
Heap types like `String` do NOT do this automatically.

```rust
fn main() {
    let x1: i32 = 10;
    let x2 = x1;
    assert_eq!(x2, 10);
    println!("x1 = {}, x2 = {}", x1, x2);
}
```

</answer>

---

### Exercise 4 - Ownership into Function

Passing a `String` to a function moves ownership to the function parameter. When the function ends, the parameter is dropped. The caller's variable is now invalid.

Two ways to fix: clone the value before passing it, or have the function return ownership back.

#### Your Task

`s` is passed into `take_ownership()`, moving ownership into the function. When the function ends, `s` is dropped. `main` can no longer use it.

**Fix this in two ways so `main` can still print `s` after the call:**

```rust
fn take_ownership(s: String) {
    println!("Got: {}", s);
}

fn main() {
    let s = String::from("hello");
    take_ownership(s);
    println!("Still have: {}", s);
}
```

#### Expected Output

```text
Got: hello
Still have: hello
```

<answer>
<summary>Answer - Way 1 (clone before passing)</summary>

```rust
fn take_ownership(s: String) {
    println!("Got: {}", s);
}

fn main() {
    let s = String::from("hello");
    take_ownership(s.clone());
    println!("Still have: {}", s);
}
```

</answer>

<answer>
<summary>Answer - Way 2 (return ownership)</summary>

```rust
fn take_ownership(s: String) -> String {
    println!("Got: {}", s);
    s
}

fn main() {
    let s = String::from("hello");
    let s = take_ownership(s);
    println!("Still have: {}", s);
}
```

</answer>

---

### Exercise 5 - Returning Ownership

If a function takes ownership of a `String`, it can give it back by returning it. Add `-> String` as the return type and put the variable as the last expression in the function body - no semicolon.

In smart contracts, a helper that processes a wallet string and hands it back lets the caller keep using it.

#### Your Task

`process()` takes ownership of `s` and prints it, but never returns it. `main` has no way to use `s` after the call.

**Fix `process()` so it returns the `String`:**

```rust
fn process(s: String) {
    println!("Processing: {}", s);
}

fn main() {
    let s = String::from("hello");
    let s = process(s);
    println!("Done: {}", s);
}
```

#### Expected Output

```text
Processing: hello
Done: hello
```

<answer>
<summary>Answer</summary>

```rust
fn process(s: String) -> String {
    println!("Processing: {}", s);
    s
}

fn main() {
    let s = String::from("hello");
    let s = process(s);
    println!("Done: {}", s);
}
```

</answer>

---

### Exercise 6 - into_bytes vs as_bytes

`into_bytes()` converts a `String` into a `Vec<u8>` and destroys the original - ownership is consumed. `as_bytes()` returns a slice reference (`&[u8]`) and leaves the original `String` intact.

If you need the string afterward, use `as_bytes()`.

In smart contracts, inspecting a wallet string's bytes for validation should not consume the string if you still need it afterward.

#### Your Task

`into_bytes()` consumes `s`, so the final print fails. Use the method that reads bytes without taking ownership.

**Change one method so the original string stays usable:**

```rust
fn main() {
    let s = String::from("hello");
    let bytes = s.into_bytes();
    println!("Bytes: {:?}", bytes);
    println!("String: {}", s);
}
```

#### Expected Output

```text
Bytes: [104, 101, 108, 108, 111]
String: hello
```

<answer>
<summary>Answer</summary>

```rust
fn main() {
    let s = String::from("hello");
    let bytes = s.as_bytes();
    println!("Bytes: {:?}", bytes);
    println!("String: {}", s);
}
```

</answer>

---

### Exercise 7 - Mutability on Transfer

Mutability is a property of the variable, not the data. When ownership moves, the new variable sets its own mutability. An immutable variable can become mutable when moved into a new variable declared with `mut`.

In smart contracts, a plan name might arrive as immutable from storage, then be moved into a mutable variable so a tier suffix can be appended.

#### Your Task

This code already compiles. After the move, `s` is invalid and `s1` is mutable.

Paste and run it. Then add one line that confirms `s1` holds `"hello world"` after the push.

**Add `assert_eq!(s1, "hello world");` before the print:**

```rust
fn main() {
    let s = String::from("hello");
    let mut s1 = s;
    s1.push_str(" world");
    println!("s1 = {}", s1);
}
```

#### Expected Output

```text
s1 = hello world
```

<answer>
<summary>Answer</summary>

`let s = String::from("hello");` creates an immutable owner `s`.  
`let mut s1 = s;` moves ownership from `s` to `s1`. `s` is now invalid.  
`s1` is declared mutable, so `.push_str(" world")` is allowed.  
Mutability is a property of the variable, not the data. When ownership moves, the new variable sets its own mutability.

```rust
fn main() {
    let s = String::from("hello");
    let mut s1 = s;
    s1.push_str(" world");
    assert_eq!(s1, "hello world");
    println!("s1 = {}", s1);
}
```

</answer>

---

### Exercise 8 - Tuple with Mixed Types

A tuple containing only stack types gets copied automatically. A tuple containing a heap type like `String` does NOT - it moves, and `.clone()` is required to use both.

Replacing `String` with `&str` (a string slice reference) makes the entire tuple copyable, since `&str` is a stack type.

In smart contracts, a tuple holding only stack data (lamport amounts, flags) copies freely. Add a `String` and it stops.

#### Your Task

The tuple contains a `String`, which forces `.clone()`. Replace it with a stack type and `.clone()` is no longer needed.

**Change one type so `.clone()` is no longer needed:**

```rust
fn main() {
    let t1 = (2i32, (), String::from("hello"));
    let t2 = t1.clone();
    println!("t1 = {:?}", t1);
    println!("t2 = {:?}", t2);
}
```

#### Expected Output

```text
t1 = (2, (), "hello")
t2 = (2, (), "hello")
```

<answer>
<summary>Answer</summary>

```rust
fn main() {
    let t1 = (2i32, (), "hello");
    let t2 = t1;
    println!("t1 = {:?}", t1);
    println!("t2 = {:?}", t2);
}
```

</answer>

---

## Track B - Contract

All exercises below apply the same ownership concepts to a subscription payment contract.

---

### Exercise 1 - Move Semantics

In Rust, every value has exactly one owner. Assigning a `String` plan name to a new variable moves ownership - the original is invalidated.

In Solana, heap-allocated strings like subscriber IDs or plan names move on assignment.

#### Your Task

`plan_name` is assigned to `new_plan`, which moves ownership. `plan_name` is now invalid. The data is not gone, it lives in `new_plan` now.

Run the code as-is and read the error. Then fix it by removing the line that uses `plan_name`.

**Remove one line so the code only uses `new_plan`:**

```rust
fn main() {
    let plan_name = String::from("premium");
    let new_plan = plan_name;

    println!("plan_name = {}", plan_name);
    println!("new_plan = {}", new_plan);
}
```

#### Expected Output

```text
new_plan = premium
```

<answer>
<summary>Answer</summary>

Remove the `plan_name` print line. After the move, `plan_name` is invalid. `new_plan` owns the data:

```rust
fn main() {
    let plan_name = String::from("premium");
    let new_plan = plan_name;

    println!("new_plan = {}", new_plan);
}
```

</answer>

---

### Exercise 2 - Clone

`.clone()` duplicates heap data so both variables remain valid. Heap types like `String` do NOT copy automatically - you must call `.clone()` explicitly.

In smart contracts, you might need a backup copy of a subscriber ID before passing the original to a processing function.

#### Your Task

`subscriber` is moved to `processed`, which invalidates `subscriber`. You need an independent copy so both variables stay valid.

**Add one method call so both variables stay valid:**

```rust
fn main() {
    let subscriber = String::from("sub_001");
    let processed = subscriber;

    println!("subscriber = {}", subscriber);
    println!("processed = {}", processed);
}
```

#### Expected Output

```text
subscriber = sub_001
processed = sub_001
```

<answer>
<summary>Answer</summary>

```rust
fn main() {
    let subscriber = String::from("sub_001");
    let processed = subscriber.clone();

    println!("subscriber = {}", subscriber);
    println!("processed = {}", processed);
}
```

</answer>

---

### Exercise 3 - Copy Trait

`u64` lamport amounts are stack-only types - they copy automatically on assignment. You never need `.clone()` for them.

In smart contracts, every lamport balance, counter, and flag is a stack type that copies freely.

#### Your Task

This code already compiles. `u64` is a stack type — Rust copies it on assignment, no move happens. Both `balance` and `reserve` hold independent copies.

Paste and run it. Then add one line that confirms `reserve` still holds `1_000_000`.

**Add `assert_eq!(reserve, 1_000_000);` before the print:**

```rust
fn main() {
    let balance: u64 = 1_000_000;
    let reserve = balance;

    println!("balance = {}, reserve = {}", balance, reserve);
}
```

#### Expected Output

```text
balance = 1000000, reserve = 1000000
```

<answer>
<summary>Answer</summary>

`u64` lives entirely on the stack and has a fixed size known at compile time.  
Rust automatically copies it on assignment - no move happens.  
Both `balance` and `reserve` hold independent copies of `1_000_000`.  
Heap types like `String` do NOT do this automatically.

```rust
fn main() {
    let balance: u64 = 1_000_000;
    let reserve = balance;
    assert_eq!(reserve, 1_000_000);
    println!("balance = {}, reserve = {}", balance, reserve);
}
```

</answer>

---

### Exercise 4 - Ownership into Function

Passing a `String` plan name into a function moves ownership to the function parameter. When the function ends, the parameter is dropped. The caller's variable is now invalid.

In smart contracts, passing a plan name into a helper function consumes it. If `main` still needs it, clone it first or return it.

#### Your Task

`plan` is passed into `verify()`, moving ownership. When the function ends, `plan` is dropped. `main` can no longer use it.

**Fix this in two ways so `main` can still print `plan` after the call:**

```rust
fn verify(plan: String) {
    println!("Verified: {}", plan);
}

fn main() {
    let plan = String::from("premium");
    verify(plan);
    println!("Plan: {}", plan);
}
```

#### Expected Output

```text
Verified: premium
Plan: premium
```

<answer>
<summary>Answer - Way 1 (clone before passing)</summary>

```rust
fn verify(plan: String) {
    println!("Verified: {}", plan);
}

fn main() {
    let plan = String::from("premium");
    verify(plan.clone());
    println!("Plan: {}", plan);
}
```

</answer>

<answer>
<summary>Answer - Way 2 (return ownership)</summary>

```rust
fn verify(plan: String) -> String {
    println!("Verified: {}", plan);
    plan
}

fn main() {
    let plan = String::from("premium");
    let plan = verify(plan);
    println!("Plan: {}", plan);
}
```

</answer>

---

### Exercise 5 - Returning Ownership

A contract helper that processes a wallet string can give ownership back by returning it. Add `-> String` as the return type and end the function with the variable - no semicolon.

#### Your Task

`format_wallet()` takes ownership of `id` and prints it, but never returns it. `main` has no way to use `id` after the call.

**Fix `format_wallet()` so it returns the `String`:**

```rust
fn format_wallet(id: String) {
    println!("Wallet: {}", id);
}

fn main() {
    let id = String::from("ABC123");
    let id = format_wallet(id);
    println!("Final: {}", id);
}
```

#### Expected Output

```text
Wallet: ABC123
Final: ABC123
```

<answer>
<summary>Answer</summary>

```rust
fn format_wallet(id: String) -> String {
    println!("Wallet: {}", id);
    id
}

fn main() {
    let id = String::from("ABC123");
    let id = format_wallet(id);
    println!("Final: {}", id);
}
```

</answer>

---

### Exercise 6 - into_bytes vs as_bytes

`into_bytes()` destroys the original string. `as_bytes()` leaves it intact. In a contract, use `as_bytes()` when you need to inspect a wallet string's bytes but still need the wallet afterward.

#### Your Task

`into_bytes()` consumes `wallet`, so the final print fails. Use the method that reads bytes without taking ownership.

**Change one method so the wallet string stays usable:**

```rust
fn main() {
    let wallet = String::from("ABC123");
    let bytes = wallet.into_bytes();
    println!("Length: {}", bytes.len());
    println!("Wallet: {}", wallet);
}
```

#### Expected Output

```text
Length: 6
Wallet: ABC123
```

<answer>
<summary>Answer</summary>

```rust
fn main() {
    let wallet = String::from("ABC123");
    let bytes = wallet.as_bytes();
    println!("Length: {}", bytes.len());
    println!("Wallet: {}", wallet);
}
```

</answer>

---

### Exercise 7 - Mutability on Transfer

When ownership moves, the new variable sets its own mutability. An incoming immutable plan name can become mutable after a move.

In smart contracts, a plan name might need to become mutable so a tier suffix can be appended.

#### Your Task

This code already compiles. After the move, `plan` is invalid and `plan_mut` is mutable.

Paste and run it. Then add one line that confirms `plan_mut` holds `"basic_pro"` after the push.

**Add `assert_eq!(plan_mut, "basic_pro");` before the print:**

```rust
fn main() {
    let plan = String::from("basic");
    let mut plan_mut = plan;
    plan_mut.push_str("_pro");
    println!("Plan: {}", plan_mut);
}
```

#### Expected Output

```text
Plan: basic_pro
```

<answer>
<summary>Answer</summary>

`let plan = String::from("basic");` creates an immutable owner `plan`.  
`let mut plan_mut = plan;` moves ownership from `plan` to `plan_mut`. `plan` is now invalid.  
`plan_mut` is declared mutable, so `.push_str("_pro")` is allowed.  
Mutability is a property of the variable, not the data. When ownership moves, the new variable sets its own mutability.

```rust
fn main() {
    let plan = String::from("basic");
    let mut plan_mut = plan;
    plan_mut.push_str("_pro");
    assert_eq!(plan_mut, "basic_pro");
    println!("Plan: {}", plan_mut);
}
```

</answer>

---

### Exercise 8 - Tuple with Mixed Types

A tuple of only stack types copies freely. Add a `String` and it stops - `.clone()` is required. Replacing `String` with `&str` makes the entire tuple copyable again.

In smart contracts, a status tuple holding lamports and a flag copies freely. Add a `String` plan name and it stops.

#### Your Task

The tuple contains a `String`, which forces `.clone()`. Replace it with a stack type and `.clone()` is no longer needed.

**Change one type so `.clone()` is no longer needed:**

```rust
fn main() {
    let status = (1_000_000u64, true, String::from("premium"));
    let backup = status.clone();
    println!("status = {:?}", status);
    println!("backup = {:?}", backup);
}
```

#### Expected Output

```text
status = (1000000, true, "premium")
backup = (1000000, true, "premium")
```

<answer>
<summary>Answer</summary>

```rust
fn main() {
    let status = (1_000_000u64, true, "premium");
    let backup = status;
    println!("status = {:?}", status);
    println!("backup = {:?}", backup);
}
```

</answer>

---

**End of Ownership.**
