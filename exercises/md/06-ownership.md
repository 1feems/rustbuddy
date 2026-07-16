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

<answer>
<summary>Answer</summary>

There are two approaches:

**Option 1 — Clone:** Give `s2` its own copy so both variables stay valid:

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1.clone();

    println!("s1 = {}", s1);
    println!("s2 = {}", s2);
}
```

**Option 2 — Accept the move:** If you only need `s2`, remove the `s1` print and change the expected output to `s2 = hello`:

```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;

    println!("s2 = {}", s2);
}
```

</answer>

---

## Exercise 2 - Clone

Sometimes you need both variables to stay valid after an assignment. Moving does not allow that. Cloning does.

`.clone()` duplicates the entire heap allocation. Rust allocates new memory and copies every byte of the original into it. Both variables end up with completely independent copies of the data. Changing one does not affect the other.

This is explicit and intentional. For large data, cloning takes time and memory. That is why Rust does not do it automatically. You have to ask for it.

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

<answer>
<summary>Answer</summary>

Call `.clone()` on `s1` before assigning. `s2` gets its own copy. `s1` stays valid:

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

## Exercise 3 - Copy Trait

Some types implement the **Copy trait**. Assignment duplicates the value automatically. Both variables stay valid. No `.clone()` needed.

These are stack-only types with a fixed size: `i32`, `u64`, `f64`, `bool`, `char`. Because their size is always known and small, Rust copies them instantly at no meaningful cost.

This is different from `String`. A `String` lives on the heap and can grow to any size. Rust moves it instead of copying. With `i32`, the size is always fixed at 4 bytes, so Rust copies it automatically.

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

<answer>
<summary>Answer</summary>

Add `println!("x2 = {}", x2);`. Both variables hold independent copies of `10`:

```rust
fn main() {
    let x1: i32 = 10;
    let x2 = x1;

    println!("x1 = {}", x1);
    println!("x2 = {}", x2);
}
```

If `x1` were a `String` instead of an `i32`, the `println!("x1 = {}", x1)` line would not compile — `x1` would have been moved into `x2`. Because `i32` implements Copy, both lines work.

</answer>

---

## Exercise 4 - Scope and Drop

A scope is the block of code between `{` and `}`. A variable is valid from where it is declared until the end of that block. When the block closes, the variable goes out of scope. Rust calls `drop` and frees the memory automatically. This is the third ownership rule: when the owner goes out of scope, the value is dropped.

This is why moves matter. If two variables owned the same data, Rust would try to free it twice when both went out of scope. That is a double-free error. Ownership prevents it by allowing only one owner.

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

<answer>
<summary>Answer</summary>

Remove the `println!` that uses `s` after the block closes. Once the `}` is reached, `s` goes out of scope and is dropped:

```rust
fn main() {
    {
        let s = String::from("hello");
        println!("Inside: {}", s);
    }
}
```

`s` was declared inside the inner block. When that block closed, Rust called `drop` and freed the memory. The `s` in the outer scope no longer exists.

</answer>

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

<answer>
<summary>Answer</summary>

After `greet(s)`, ownership moved into the function. When `greet` ended, `s` was dropped. Remove the line in `main` that tries to use `s` after the call:

```rust
fn greet(s: String) {
    println!("Hello, {}!", s);
}

fn main() {
    let s = String::from("world");
    greet(s);
}
```

</answer>

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

<answer>
<summary>Answer</summary>

Add a return type to `process` and return `s` at the end with no semicolon. The last expression without a semicolon is the return value:

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

<answer>
<summary>Answer</summary>

`main` calls `log_plan` and binds the return value to `plan`, so `log_plan` must take a `String` and return a `String`. It also needs to print before returning:

```rust
fn log_plan(name: String) -> String {
    println!("Plan logged: {}", name);
    name
}

fn main() {
    let plan = log_plan(String::from("premium"));
    let backup = plan.clone();
    println!("Active: {}", plan);
    println!("Backup: {}", backup);
}
```

</answer>

---

**End of Ownership.**
