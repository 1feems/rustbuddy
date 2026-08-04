# Practice - Borrowing

> Source for `borrowing.html` — follows `_docs/STYLE-GUIDE.md` and `_docs/EXERCISE-PAGE-DESIGN.md`

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
| Borrowing rule 2 | References must always be valid — no dangling pointers. |
| Dangling reference | A reference to data that has already been dropped. Rust refuses to compile this. |

---

### Exercise 1 - Passing a Reference

Borrowing means passing a reference to a value instead of the value itself. The function can use the data without taking ownership. The original variable stays valid after the call.

A function calculates the length of a string. Right now it fails because `s1` is passed directly, moving ownership into the function, and the final `println!` can't use it.

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

**Fix this so both println! lines work. Change the minimum number of things — don't rewrite the whole function.**

#### Expected output

```
Length: 5
Original: hello
```

<details>
<summary>Answer</summary>

```rust
fn calculate_length(s: &String) -> usize { // ② &String means this function borrows the value — it does not own it
    s.len()                                 // ③ reads the length through the reference — no ownership needed for read-only access
}

fn main() {
    let s1 = String::from("hello");    // ① s1 owns the String
    let len = calculate_length(&s1);   // ② &s1 passes a reference — s1 keeps ownership, the function just borrows it
    println!("Length: {}", len);       // ③ len holds the returned usize — no ownership involved
    println!("Original: {}", s1);      // ④ s1 is still valid because ownership was never moved — only borrowed
}
```

**Why:** Borrowing with `&` lets a function read a value without taking it. The original variable stays valid because ownership never transferred. Think of it like lending your key — the borrower can use it, but you still own it.

</details>

---

### Exercise 2 - The Two Borrowing Rules

This exercise tests the two rules that govern every reference in Rust. These rules prevent data races and dangling pointers — the two most common memory bugs in other languages.

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

```rust
fn main() {
    let s = String::from("hello"); // ① s owns the String
    let r1 = &s;                   // ② r1 is an immutable reference — it borrows s for reading only
    let r2 = &s;                   // ③ r2 is also an immutable reference — multiple read-only borrows are allowed at the same time
    println!("r1: {}, r2: {}", r1, r2); // ④ both references are valid — neither can change s, so they do not conflict
}
```

**Why:** Rule 1 says any number of immutable references are fine as long as there are no mutable references at the same time. Both `r1` and `r2` are read-only — neither can change the data — so Rust allows them to coexist.

</details>

---

### Exercise 3 - Adding a Mutable Reference

A mutable reference lets a function borrow a value AND change it. Only one mutable reference can exist at a time. The variable being borrowed must also be declared `mut`.

A function needs to add `!` to a string. Right now it fails because the function takes an immutable reference, so it cannot modify the string.

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

```rust
fn add_exclamation(s: &mut String) { // ② &mut String declares a mutable borrow — this function can change the value
    s.push_str("!");                  // ③ push_str appends to the String through the mutable reference
}

fn main() {
    let mut s = String::from("hello"); // ① mut here allows s to be borrowed mutably — a variable must be mutable before it can be mutably borrowed
    add_exclamation(&mut s);           // ② &mut s passes a mutable reference — s stays owned by main but the function can change it
    println!("{}", s);                 // ④ s reflects the change — the mutation happened through the borrow, not a move
}
```

**Why:** Three things change together: the variable needs `mut`, the reference needs `&mut`, and the parameter type needs `&mut`. All three must match. Without `mut`, Rust treats the value as read-only and refuses to compile any code that tries to change it.

</details>

---

### Exercise 4 - Only One Mutable Reference at a Time

You cannot have two mutable references to the same data at the same time. This prevents two parts of your code from changing the same value simultaneously — the root cause of data races.

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

```rust
fn main() {
    let mut s = String::from("hello"); // ① s is declared mutable — it can be borrowed mutably
    // let r1 = &mut s;               // ② commented out — two mutable references at the same time violate rule 1
    let r2 = &mut s;                   // ③ only one mutable reference exists now — r2 is the sole mutable borrow of s
    println!("{}", r2);                // ④ r2 is valid and used before it goes out of scope
}
```

**Why:** Rust allows only one mutable reference to a value at a time. If two mutable references existed simultaneously, two parts of the code could change the same memory at once — a data race. Rust catches this at compile time, not at runtime.

</details>

---

### Exercise 5 - Inner Scope for Sequential Mutable References

You can use two mutable references to the same value as long as they are sequential, not simultaneous. Wrapping the first reference in an inner block drops it before the second one is created.

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

```rust
fn main() {
    let mut s = String::from("hello"); // ① s is mutable so it can be borrowed mutably
    {
        let r1 = &mut s;               // ② r1 is the first mutable reference — it is the only one active right now
        r1.push_str(" world");         // ③ r1 modifies s through the mutable borrow
    }                                  // ④ r1 goes out of scope here and the mutable borrow ends
    let r2 = &mut s;                   // ⑤ r2 is a new mutable reference — r1 is gone so rule 1 is satisfied
    r2.push_str("!");                  // ⑥ r2 modifies s through its own mutable borrow
    println!("{}", s);                 // ⑦ both modifications are visible — s was changed twice, sequentially
}
```

**Why:** The inner block `{ }` ends `r1`'s lifetime before `r2` is created. Rule 1 is satisfied because only one mutable reference exists at any moment. Sequential mutable borrows are allowed — it is simultaneous ones that cause data races.

</details>

---

### Exercise 6 - Can't Mix Immutable and Mutable References

You cannot have an immutable reference and a mutable reference to the same data at the same time. An immutable reference promises the data won't change. A mutable reference might change it. Both cannot be true at once.

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

```rust
fn main() {
    let mut s = String::from("hello"); // ① s is mutable — it could be borrowed either way
    // let r1 = &s;                   // ② commented out — an immutable borrow while a mutable borrow exists violates rule 1
    let r2 = &mut s;                   // ③ r2 holds the only active reference — a mutable one, with no immutable references competing
    println!("{}", r2);                // ④ r2 is valid and used — no conflict with any other borrow
}
```

**Why:** An immutable reference guarantees the data will not change while you hold it. A mutable reference is a promise that you might change it. Having both at once would break the guarantee — Rust refuses to compile it. You must choose: read-only (any number) or read-write (exactly one).

</details>

---

**End of Borrowing.**
