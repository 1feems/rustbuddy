# Practice - Borrowing

> Follows `EXERCISE-STYLE-GUIDE.md`

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
| Borrowing rule 1 | Either one mutable reference OR any number of immutable ones, never both at the same time. |
| Borrowing rule 2 | References must always be valid no dangling pointers. |
| Dangling reference | A reference to data that has already been dropped. Rust refuses to compile this. |

---

### Exercise 1 - Passing a Reference

This exercise tests borrowing: using a value in a function without giving up ownership. In a contract, reading a subscriber's plan without moving it means the plan is still usable after the call.

A function calculates the length of a string. Right now it fails because `s1` is passed directly, moving ownership into the function, and the final `println!` can't use it.

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

A function needs to add `!` to a string. Right now it fails because the function takes an immutable reference, so it cannot modify the string.

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

This exercise tests rule 1: you cannot have two mutable references to the same data at the same time. This prevents two parts of your code from changing the same value simultaneously, which is the root cause of data races.

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

This works because only one mutable reference exists at any given moment. They are sequential, not simultaneous.

A string needs two sequential modifications using two different references. Right now it fails because both references exist at the same time, which violates rule 1.

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

**End of Borrowing.**
