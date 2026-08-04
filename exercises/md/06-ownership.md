# Practice - Ownership

> Source for `ownership.html` — follows `_docs/STYLE-GUIDE.md` and `_docs/EXERCISE-PAGE-DESIGN.md`

Work through each exercise in the [Rust Playground](https://play.rust-lang.org).  
Read the explainer, paste the starter code, fix it, then move on.  
Check your answer only after you've tried.

---

## Quick reference

| Concept | What it means |
|---|---|
| Owner | The variable that holds a value. Only one owner at a time. |
| Move | Assigning a `String` to a new variable transfers ownership. The old variable becomes invalid. |
| Clone | `.clone()` makes a full independent copy of heap data. Both variables stay valid. Costs memory. |
| Copy | Stack types (`i32`, `u64`, `bool`, `char`) copy automatically on assignment. Free and instant. |
| Scope | The block between `{` and `}` where a variable is valid. |
| Drop | When the owner goes out of scope, Rust frees the memory automatically. No manual cleanup needed. |
| Heap | Where `String` and `Vec` live. Data can grow. Must be moved or cloned. |
| Stack | Where `i32`, `bool`, `char` live. Fixed size. Copied automatically. |

---

## Exercise 1 - Move Semantics

Assigning a `String` to a new variable moves ownership. The original variable becomes invalid. Only one variable can own the data at a time.

#### Your Task

`s1` is assigned to `s2`. The code then tries to use both variables. Rust will not compile. There is more than one way to fix this.

Find a solution that compiles and produces the expected output.

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

<details>
<summary>Answer</summary>

**Option 1 — Clone:**

```rust
fn main() {
    let s1 = String::from("hello"); // ① s1 owns this String on the heap
    let s2 = s1.clone();            // ② .clone() creates a second independent copy — s1 keeps its ownership
    println!("s1 = {}", s1);       // ③ s1 is still valid because its ownership was never moved
    println!("s2 = {}", s2);       // ④ s2 owns its own separate copy — both can be used at the same time
}
```

**Why:** In Rust, assigning a `String` to a new variable moves ownership and the original becomes invalid. `.clone()` allocates a brand new copy on the heap so both variables have their own data. This is intentionally explicit because cloning costs memory and time.

**Option 2 — Accept the move:**

```rust
fn main() {
    let s1 = String::from("hello"); // ① s1 owns the String
    let s2 = s1;                    // ② ownership moves to s2 — s1 is now invalid, Rust enforces this at compile time
    println!("s2 = {}", s2);       // ③ only s2 can be used now — attempting to print s1 would not compile
}
```

**Why:** When you only need one variable, accepting the move is the right call. The original variable is gone and Rust enforces this at compile time so you never accidentally use data that was moved away.

</details>

---

## Exercise 2 - Clone

Sometimes you need both variables to stay valid after an assignment. Moving does not allow that. Cloning does.

`.clone()` duplicates the entire heap allocation. Rust allocates new memory and copies every byte of the original into it. Both variables end up with completely independent copies of the data. Changing one does not affect the other.

**Rules to remember:**

| What happens | Result |
|---|---|
| Move | Ownership transfers to the new variable. The old variable becomes invalid. |
| Clone | A new copy is made. Both variables are valid. Costs memory and time. |
| Copy | Stack types copy automatically. Both variables are valid. Free and instant. |

**Type rules:**

| Type | What happens on assignment |
|---|---|
| `String`, `Vec` | Moves by default |
| `String`, `Vec` + `.clone()` | Makes an independent copy |
| `i32`, `f64`, `bool`, `char` | Copies automatically — no `.clone()` needed |

#### Your Task

`s1` is assigned to `s2`, which moves ownership. `s1` is now invalid. Right now the code will not compile because both are used after the assignment.

1. Add `.clone()` after `s1` on the assignment line so `s2` gets its own copy.

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

<details>
<summary>Answer</summary>

```rust
fn main() {
    let s1 = String::from("hello"); // ① s1 is the original owner of the String
    let s2 = s1.clone();            // ② .clone() allocates new heap memory and copies every byte — s2 gets its own data, s1 keeps its ownership
    println!("s1 = {}", s1);       // ③ s1 is still valid — clone() never moved ownership, it duplicated the data
    println!("s2 = {}", s2);       // ④ s2 holds a completely independent copy — the two Strings share no memory
}
```

**Why:** A move transfers single ownership from one variable to another. A clone creates a second equal copy so both variables become owners of their own separate data. Use clone when you genuinely need two independent copies — Rust does not do it automatically because it has a real cost.

</details>

---

## Exercise 3 - Copy Trait

Some types implement the **Copy trait**. Assignment duplicates the value automatically. Both variables stay valid. No `.clone()` needed.

These are stack-only types with a fixed size: `i32`, `u64`, `f64`, `bool`, `char`. Because their size is always known and small, Rust copies them instantly at no meaningful cost.

#### Your Task

`x1` is assigned to `x2`. Because `i32` implements Copy, both variables hold independent values. `x1` is still valid after the assignment. Right now only `x1` is printed.

1. Add a line to print `x2`.

**Add one `println!` line so both values appear in the output:**

```rust
fn main() {
    let x1: i32 = 10;
    let x2 = x1;

    println!("x1 = {}", x1);

    // Print x2 here
}
```

#### Expected Output

```text
x1 = 10
x2 = 10
```

<details>
<summary>Answer</summary>

```rust
fn main() {
    let x1: i32 = 10; // ① x1 stores an i32 on the stack — i32 has the Copy trait, so assignment duplicates it instead of moving it
    let x2 = x1;      // ② Copy kicks in here — x2 gets its own independent value, x1 is still valid
    println!("x1 = {}", x1); // ③ x1 is still valid — no move happened, just a cheap stack copy
    println!("x2 = {}", x2); // ④ x2 holds its own copy of 10 — both variables are completely independent
}
```

**Why:** Types like `i32`, `bool`, and `char` implement the `Copy` trait because their size is fixed and small. Rust copies them automatically on assignment. `String` cannot implement `Copy` because its size varies — copying it requires a heap allocation, which Rust makes you do explicitly with `.clone()`.

</details>

---

## Exercise 4 - Scope and Drop

A scope is the block of code between `{` and `}`. A variable is valid from where it is declared until the end of that block. When the block closes, the variable goes out of scope. Rust calls `drop` and frees the memory automatically. This is the third ownership rule: when the owner goes out of scope, the value is dropped.

#### Your Task

`s` is declared inside an inner block. The block closes before `main` ends. The code then tries to use `s` after the block. Rust will not compile. Fix the error.

```rust
fn main() {
    {
        let s = String::from("hello");
        println!("Inside: {}", s);
    }

    println!("Outside: {}", s);
}
```

#### Expected Output

```text
Inside: hello
```

<details>
<summary>Answer</summary>

```rust
fn main() {
    {
        let s = String::from("hello"); // ① s is declared inside this inner block — its lifetime is limited to this scope
        println!("Inside: {}", s);    // ② s is used while it is still in scope — valid here
    }                                  // ③ the block ends here — Rust automatically calls drop() and frees s's memory
}
```

**Why:** Every variable lives from where it is declared to the closing `}` of the block it belongs to. When that block ends, Rust automatically frees the memory — no manual cleanup needed. This is how Rust avoids memory leaks and double-free errors without a garbage collector.

</details>

---

## Exercise 5 - A Function Call Is a Move

Passing a `String` to a function moves ownership into that function. When the function's scope ends, drop is called and the memory is freed. The caller can no longer use the value.

#### Your Task

`greet(s)` is called in `main`. The code has an ownership error after the call. Rust will not compile. Fix the error.

```rust
fn greet(s: String) {
    println!("Hello, {}!", s);
}

fn main() {
    let s = String::from("world");
    greet(s);
    println!("s is still: {}", s);
}
```

#### Expected Output

```text
Hello, world!
```

<details>
<summary>Answer</summary>

```rust
fn greet(s: String) {          // ② s is now the owner — ownership moved from main into this function parameter
    println!("Hello, {}!", s); // ③ s is used while greet owns it
}                              // ④ s goes out of scope here — Rust calls drop and frees the memory

fn main() {
    let s = String::from("world"); // ① s owns the String in main
    greet(s);                      // ② ownership moves into greet — s in main is invalid after this line
}
```

**Why:** Passing a value to a function is the same as assignment — it moves ownership. Once `greet(s)` runs, the `s` in `main` no longer exists. When the function ends, the value is dropped. To use the value again after the call, the function must return it.

</details>

---

## Exercise 6 - Returning Ownership

A function can return ownership back to the caller. Ownership moves in, the function does its work, and ownership moves back out on return. No new memory is allocated. It is the same data moving back.

#### Your Task

`process` takes ownership of `s` but `main` needs the value back after the call. Right now it will not compile. Fix `process` so the caller gets the value back.

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

<details>
<summary>Answer</summary>

```rust
fn process(s: String) -> String { // ② ownership of s moves in — the return type declares that ownership will move back out
    println!("Processing: {}", s); // ③ s is used while process owns it
    s                              // ④ no semicolon — this expression is the return value, ownership transfers back to the caller
}

fn main() {
    let s = String::from("hello"); // ① s owns the String in main
    let s = process(s);            // ② ownership moves into process, then comes back — the new s receives it
    println!("Done: {}", s);       // ⑤ s is valid again because process returned ownership
}
```

**Why:** Functions can give ownership back to the caller by returning the value. The last expression in a function without a semicolon is the return value — ownership moves out of the function and into whoever receives the result. This pattern lets functions do work on a value without permanently consuming it.

</details>

---

## Exercise 7 - Build: Log and Return

A payment contract needs to log which plan a user is on and keep using the plan name after logging.

#### Your Task

`main` is written for you. Write the `log_plan` function so the code compiles and produces the expected output.

```rust
fn main() {
    let plan = log_plan(String::from("premium"));
    let backup = plan.clone();
    println!("Active: {}", plan);
    println!("Backup: {}", backup);
}
```

#### Expected Output

```text
Plan logged: premium
Active: premium
Backup: premium
```

<details>
<summary>Answer</summary>

```rust
fn log_plan(name: String) -> String {  // ② log_plan receives ownership of name — the return type says ownership comes back out
    println!("Plan logged: {}", name); // ③ uses name while log_plan owns it
    name                               // ④ returns ownership back to the caller — no semicolon makes this the return value
}

fn main() {
    let plan = log_plan(String::from("premium")); // ① creates the String, moves ownership into log_plan, then receives it back
    let backup = plan.clone();                    // ⑤ plan is still owned by main — .clone() creates a fully independent copy on the heap
    println!("Active: {}", plan);                 // ⑥ plan is valid — ownership was returned from log_plan, not lost
    println!("Backup: {}", backup);               // ⑦ backup is a separate String — changes to one would not affect the other
}
```

**Why:** To use a value both inside and after a function call, the function must either borrow the value or return ownership back. Here `log_plan` takes ownership, prints, and hands it back. Calling `.clone()` creates a second independent copy — both `plan` and `backup` are valid, separately owned `String` values.

</details>

---

**End of Ownership.**
