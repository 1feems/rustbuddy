# Practice - Borrowing

> DRAFT FOR REVIEW - Follows `EXERCISE-STYLE-GUIDE.md`

Work through each exercise in the [Rust Playground](https://play.rust-lang.org).  
Read the explainer, paste the starter code, fix it, then move on.  
Check your answer only after you've tried.

---

## Quick reference

| Concept | What it means |
|---|---|
| Borrow (`&`) | Use a value without taking ownership. The original stays valid. |
| Mutable borrow (`&mut`) | Borrow a value AND be allowed to change it. |
| Reference | A pointer to a value. `&s` means "a pointer to s, not s itself." |
| Borrowing rule 1 | Either one mutable reference OR any number of immutable ones never both at the same time. |
| Borrowing rule 2 | References must always be valid no dangling pointers. |
| Dangling reference | A reference to data that has already been dropped. Rust refuses to compile this. |

---

## Track A - Generic Rust

---

### Exercise 1 - Passing a Reference

This exercise tests borrowing: using a value in a function without giving up ownership. In a contract, reading a subscriber's plan without moving it means the plan is still usable after the call.

The code wants to pass `s1` to `calculate_length()`, print the length, then print the original string. Right now `s1` is passed directly ownership moves into the function and the final `println!` can't use it.

Borrowing means you pass a reference a pointer to the data instead of the data itself. The `&` symbol creates a reference. Think of it like lending someone your house key. They can use the house, but you still own it.

```rust
fn calculate_length(s: String) -> usize {
    s.len()
}

fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(s1);
    println!("Length: {}", len);
    println!("Original: {}", s1);
}
```

**Fix this so both println! lines work. Change the minimum number of things don't rewrite the whole function.**

#### Expected output

```
Length: 5
Original: hello
```

<details>
<summary>Answer</summary>

The function parameter changes from `String` to `&String`. The call changes from `s1` to `&s1`. Now the function borrows the value it doesn't own it. After the call, `s1` is still valid.

```rust
fn calculate_length(s: &String) -> usize {
    s.len()
}

fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1);
    println!("Length: {}", len);
    println!("Original: {}", s1);
}
```

</details>

---

### Exercise 2 - The Two Borrowing Rules

This exercise tests the two rules that govern every reference in Rust. These rules prevent data races and dangling pointers the two most common memory bugs in other languages.

The rules:
1. At any given time, you can have EITHER one mutable reference OR any number of immutable references. You cannot have both.
2. References must always be valid. No reference can outlive the data it points to.

This code already compiles. Run it and make sure you understand why two immutable references are allowed at the same time.

```rust
fn main() {
    let s = String::from("hello");
    let r1 = &s;
    let r2 = &s;
    println!("r1: {}, r2: {}", r1, r2);
}
```

#### Expected output

```
r1: hello, r2: hello
```

<details>
<summary>What's happening here</summary>

Rule 1 says: any number of immutable references is fine, as long as there are no mutable references at the same time. Both `r1` and `r2` are read-only neither can change the data so Rust allows them together.

</details>

---

### Exercise 3 - Adding a Mutable Reference

This exercise tests mutable references: borrowing a value and being allowed to change it. In a contract, a helper that updates a subscriber's plan needs a mutable reference not ownership.

The code wants to pass `s` to `add_exclamation()` and let the function add a `!` to the end. Right now the function takes an immutable reference, so it cannot modify the string.

A mutable reference uses `&mut`. The variable being borrowed must also be declared `mut`. The function parameter must be `&mut String`. Only one mutable reference can exist at a time.

```rust
fn add_exclamation(s: &String) {
    s.push_str("!");
}

fn main() {
    let s = String::from("hello");
    add_exclamation(&s);
    println!("{}", s);
}
```

**Add two `mut` keywords so the function can modify the string. Don't add or remove any lines.**

#### Expected output

```
hello!
```

<details>
<summary>Answer</summary>

Three things change: `let s` becomes `let mut s`, `&String` becomes `&mut String`, and `&s` becomes `&mut s`.

```rust
fn add_exclamation(s: &mut String) {
    s.push_str("!");
}

fn main() {
    let mut s = String::from("hello");
    add_exclamation(&mut s);
    println!("{}", s);
}
```

</details>

---

### Exercise 4 - Only One Mutable Reference at a Time

This exercise tests rule 1: you cannot have two mutable references to the same data at the same time. This prevents two parts of your code from changing the same value simultaneously the root cause of data races.

The code tries to create two mutable references to `s` at the same time. Rust sees both `&mut s` borrows alive at once and refuses.

```rust
fn main() {
    let mut s = String::from("hello");
    let r1 = &mut s;
    let r2 = &mut s;
    println!("{}, {}", r1, r2);
}
```

**Comment one line to make it compile.**

<details>
<summary>Answer</summary>

Only one mutable reference can exist at a time. Comment out either `r1` or `r2`. Rule 1 violated: "can't borrow `s` as mutable more than once at a time."

```rust
fn main() {
    let mut s = String::from("hello");
    // let r1 = &mut s;
    let r2 = &mut s;
    println!("{}", r2);
}
```

</details>

---

### Exercise 5 - Inner Scope for Sequential Mutable References

This exercise tests a pattern for using two mutable references one after the other without breaking rule 1. Wrap the first reference in an inner block (`{ }`). When the block ends, the reference is dropped. Then you can safely create a second one.

This works because only one mutable reference exists at any given moment they are sequential, not simultaneous.

The code wants to append `" world"` to `s` using `r1`, then append `"!"` using `r2`. Right now both references are alive at the same time it fails.

```rust
fn main() {
    let mut s = String::from("hello");
    let r1 = &mut s;
    r1.push_str(" world");
    let r2 = &mut s;
    r2.push_str("!");
    println!("{}", s);
}
```

**Wrap r1 in an inner block so it drops before r2 is created.**

#### Expected output

```
hello world!
```

<details>
<summary>Answer</summary>

The inner block `{ }` ends r1's lifetime before r2 is created. Rule 1 is satisfied only one mutable reference exists at a time.

```rust
fn main() {
    let mut s = String::from("hello");
    {
        let r1 = &mut s;
        r1.push_str(" world");
    } // r1 is dropped here
    let r2 = &mut s;
    r2.push_str("!");
    println!("{}", s);
}
```

</details>

---

### Exercise 6 - Can't Mix Immutable and Mutable References

This exercise tests the second half of rule 1: you cannot have an immutable reference and a mutable reference to the same data at the same time. An immutable reference promises the data won't change. A mutable reference might change it. Both can't be true at once.

The code creates an immutable reference `r1`, then tries to create a mutable reference `r2`. Rust sees the conflict and refuses.

```rust
fn main() {
    let mut s = String::from("hello");
    let r1 = &s;
    let r2 = &mut s;
    println!("{}, {}", r1, r2);
}
```

**Comment one line to make it compile.**

<details>
<summary>Answer</summary>

Comment out the immutable reference. You cannot have `&s` and `&mut s` alive at the same time rule 1: "cannot borrow `s` as mutable because it is also borrowed as immutable."

```rust
fn main() {
    let mut s = String::from("hello");
    // let r1 = &s;
    let r2 = &mut s;
    println!("{}", r2);
}
```

</details>

---

### Exercise 7 - Fix Immutability Mismatch

This exercise tests what happens when a function expects `&mut String` but the variable wasn't declared as `mut`. A mutable reference requires the original variable to be mutable you can't borrow something as changeable if the owner declared it as fixed.

The code wants to pass `s` to `append_suffix()` so the function can modify it. Right now `s` is not declared `mut`, so `&mut s` is invalid.

```rust
fn append_suffix(s: &mut String) {
    s.push_str("_v2");
}

fn main() {
    let s = String::from("hello");
    append_suffix(&mut s);
    println!("{}", s);
}
```

**Fix the error by modifying one line. Don't change the function.**

#### Expected output

```
hello_v2
```

<details>
<summary>Answer</summary>

The variable must be declared `mut` before it can be borrowed as `&mut`. Change `let s` to `let mut s`.

```rust
fn append_suffix(s: &mut String) {
    s.push_str("_v2");
}

fn main() {
    let mut s = String::from("hello");
    append_suffix(&mut s);
    println!("{}", s);
}
```

</details>

---

### Exercise 8 - Write Cold

No starter code. No hints. Write it from scratch.

A user checks out a subscription. Write a program that:

1. Creates a `String` called `plan` with the value `"basic"`
2. Passes it to a function called `print_plan` that borrows it (does NOT take ownership) and prints: `Plan: basic`
3. After the function call, prints in main: `Still active: basic`

Both print statements must work. The function must NOT take ownership of the string.

#### Expected output

```
Plan: basic
Still active: basic
```

<details>
<summary>Answer</summary>

The function takes `&String` (a reference). The call passes `&plan`. Ownership stays in `main`.

```rust
fn print_plan(p: &String) {
    println!("Plan: {}", p);
}

fn main() {
    let plan = String::from("basic");
    print_plan(&plan);
    println!("Still active: {}", plan);
}
```

</details>

---

## Track B - Contract

All exercises below apply the same borrowing concepts to a subscription payment contract. The same Rust rules different clothes.

---

### Exercise 1 - Reading a Subscriber Plan

This exercise tests borrowing: using a subscriber's plan without taking ownership. In a contract, `get_plan_price` needs to read the plan name to return the right price but the caller still needs the plan afterward.

The code wants to pass `plan` to `get_plan_price()`, get the price back, then print both the price and the original plan. Right now `plan` is passed directly ownership moves and the final print fails.

Borrowing means you pass a reference `&plan` instead of the value itself. The function gets read-only access. The caller keeps ownership.

```rust
fn get_plan_price(plan: String) -> u64 {
    if plan == "premium" { 10_000_000 } else { 5_000_000 }
}

fn main() {
    let plan = String::from("premium");
    let price = get_plan_price(plan);
    println!("Price: {}", price);
    println!("Plan: {}", plan);
}
```

**Fix this so both println! lines work. Change the minimum number of things.**

#### Expected output

```
Price: 10000000
Plan: premium
```

<details>
<summary>Answer</summary>

The function parameter changes from `String` to `&String`. The call changes from `plan` to `&plan`. Ownership stays in `main`.

```rust
fn get_plan_price(plan: &String) -> u64 {
    if plan == "premium" { 10_000_000 } else { 5_000_000 }
}

fn main() {
    let plan = String::from("premium");
    let price = get_plan_price(&plan);
    println!("Price: {}", price);
    println!("Plan: {}", plan);
}
```

</details>

---

### Exercise 2 - Two References, No Conflict

This exercise tests rule 1: any number of immutable references can exist at the same time. In a contract, two helpers can read the same subscriber record simultaneously neither changes it, so there's no conflict.

This code already compiles. Run it and confirm you understand why both references work.

```rust
fn main() {
    let subscriber = String::from("sub_001");
    let r1 = &subscriber;
    let r2 = &subscriber;
    println!("r1: {}, r2: {}", r1, r2);
}
```

#### Expected output

```
r1: sub_001, r2: sub_001
```

<details>
<summary>What's happening here</summary>

Both `r1` and `r2` are immutable neither can change `subscriber`. Rule 1 allows any number of immutable references at the same time. No conflict.

</details>

---

### Exercise 3 - Upgrading a Plan

This exercise tests mutable references: borrowing a value to change it without taking ownership. In a contract, `upgrade_plan` needs to modify the plan string but the caller still owns the subscriber record.

The code wants to pass `plan` to `upgrade_plan()` and let the function append `"_pro"`. Right now the function takes an immutable reference, so it cannot modify anything.

```rust
fn upgrade_plan(plan: &String) {
    plan.push_str("_pro");
}

fn main() {
    let plan = String::from("basic");
    upgrade_plan(&plan);
    println!("{}", plan);
}
```

**Add two `mut` keywords so the function can modify the plan. Don't add or remove any lines.**

#### Expected output

```
basic_pro
```

<details>
<summary>Answer</summary>

Three changes: `let plan` → `let mut plan`, `&String` → `&mut String`, `&plan` → `&mut plan`.

```rust
fn upgrade_plan(plan: &mut String) {
    plan.push_str("_pro");
}

fn main() {
    let mut plan = String::from("basic");
    upgrade_plan(&mut plan);
    println!("{}", plan);
}
```

</details>

---

### Exercise 4 - Two Helpers Can't Both Modify at Once

This exercise tests rule 1: only one mutable reference to the same data at a time. In a contract, two functions cannot both hold a mutable reference to the same subscriber record at the same time that would be a data race.

The code tries to give both `r1` and `r2` mutable access to `subscriber` at the same time. Rust refuses.

```rust
fn main() {
    let mut subscriber = String::from("sub_001");
    let r1 = &mut subscriber;
    let r2 = &mut subscriber;
    println!("{}, {}", r1, r2);
}
```

**Comment one line to make it compile.**

<details>
<summary>Answer</summary>

Comment out one of the mutable references. Only one can exist at a time.

```rust
fn main() {
    let mut subscriber = String::from("sub_001");
    // let r1 = &mut subscriber;
    let r2 = &mut subscriber;
    println!("{}", r2);
}
```

</details>

---

### Exercise 5 - Process Then Archive

This exercise tests sequential mutable references using inner scope. In a contract, you might need one helper to process a payment, then a second helper to archive it one at a time, not simultaneously.

The code wants to append `"_processed"` using `r1`, then append `"_archived"` using `r2`. Right now both references exist at the same time it fails.

```rust
fn main() {
    let mut record = String::from("payment");
    let r1 = &mut record;
    r1.push_str("_processed");
    let r2 = &mut record;
    r2.push_str("_archived");
    println!("{}", record);
}
```

**Wrap r1 in an inner block so it drops before r2 is created.**

#### Expected output

```
payment_processed_archived
```

<details>
<summary>Answer</summary>

The inner block ends r1's lifetime before r2 is created. Both mutable references are used one at a time rule 1 is satisfied.

```rust
fn main() {
    let mut record = String::from("payment");
    {
        let r1 = &mut record;
        r1.push_str("_processed");
    } // r1 dropped here
    let r2 = &mut record;
    r2.push_str("_archived");
    println!("{}", record);
}
```

</details>

---

### Exercise 6 - Reader and Writer Can't Coexist

This exercise tests the mixed-reference rule. In a contract, a reader and a writer cannot both hold references to the same subscriber record at the same time. The reader expects the data to stay the same the writer might change it.

The code creates a read-only reference `reader`, then tries to create a mutable reference `writer` to the same data. Rust sees the conflict.

```rust
fn main() {
    let mut balance = String::from("1000000");
    let reader = &balance;
    let writer = &mut balance;
    println!("{}, {}", reader, writer);
}
```

**Comment one line to make it compile.**

<details>
<summary>Answer</summary>

Comment out the immutable reference. You cannot have a reader (`&balance`) and a writer (`&mut balance`) alive at the same time.

```rust
fn main() {
    let mut balance = String::from("1000000");
    // let reader = &balance;
    let writer = &mut balance;
    println!("{}", writer);
}
```

</details>

---

### Exercise 7 - Fix a Non-Mutable Variable

This exercise tests the immutability mismatch. In a contract, `apply_discount` needs to modify the price string but the variable wasn't declared as changeable, so `&mut` is invalid.

The code wants to pass `price` to `apply_discount()` so the function can modify it. Right now `price` is not declared `mut`.

```rust
fn apply_discount(price: &mut String) {
    price.push_str("_discounted");
}

fn main() {
    let price = String::from("10000000");
    apply_discount(&mut price);
    println!("{}", price);
}
```

**Fix the error by modifying one line. Don't change the function.**

#### Expected output

```
10000000_discounted
```

<details>
<summary>Answer</summary>

Add `mut` to the variable declaration. A mutable reference requires the original variable to be mutable.

```rust
fn apply_discount(price: &mut String) {
    price.push_str("_discounted");
}

fn main() {
    let mut price = String::from("10000000");
    apply_discount(&mut price);
    println!("{}", price);
}
```

</details>

---

### Exercise 8 - Write Cold

No starter code. No hints. Write it from scratch.

A contract helper checks whether a subscriber is on the premium plan. Write a program that:

1. Creates a `String` called `plan` with the value `"premium"`
2. Passes it to a function called `check_plan` that borrows it (does NOT take ownership) and prints: `Checking plan: premium`
3. After the function returns, prints in main: `Plan still active: premium`

Both print statements must work. `check_plan` must NOT take ownership.

#### Expected output

```
Checking plan: premium
Plan still active: premium
```

<details>
<summary>Answer</summary>

```rust
fn check_plan(plan: &String) {
    println!("Checking plan: {}", plan);
}

fn main() {
    let plan = String::from("premium");
    check_plan(&plan);
    println!("Plan still active: {}", plan);
}
```

</details>

---

**End of Borrowing.**
