# Practice - Lifetimes

> Source for `lifetimes.html` — follows `_docs/STYLE-GUIDE.md` and `_docs/EXERCISE-PAGE-DESIGN.md`

Work through each exercise in the [Rust Playground](https://play.rust-lang.org).
Read the explainer, paste the starter code, fix it, then move on.
Check your answer only after you've tried.

---

## Quick reference

| Concept | What it means |
|---|---|
| Lifetime | How long a reference stays valid. Every reference has one. |
| `'a` | The syntax for a lifetime annotation. The apostrophe followed by a letter. |
| Dangling reference | A reference that points to data that has already been dropped. Rust refuses to compile this. |
| Borrow checker | The part of the Rust compiler that checks that every reference is valid for as long as it is used. |
| Lifetime annotation | A label you add to a function signature to tell the compiler how the lifetimes of its references relate to each other. |
| Lifetime elision | Rules that let the compiler infer lifetimes automatically so you don't have to write them. |
| `'static` | A special lifetime meaning the reference lives for the entire program. String literals have this lifetime. |

---

## Exercise 1 - A Reference Must Not Outlive Its Value

The main job of lifetimes is to prevent dangling references. A dangling reference points to memory that has already been freed. Rust catches this at compile time.

The rule is simple: a reference to a value must never outlive the value itself.

#### Your Task

`r` is declared in the outer scope. Inside an inner block, `x` is created and `r` is set to point to it. When the inner block ends, `x` is dropped but `r` still tries to use it. Rust will not compile this. Fix it by moving the `println!` inside the inner block.

```rust
fn main() {
    let r;

    {
        let x = 5;
        r = &x;
    }

    println!("r: {}", r);
}
```

#### Expected Output

```text
r: 5
```

<details>
<summary>Answer</summary>

```rust
fn main() {
    let r; // ① r is declared in the outer scope — its lifetime spans to the end of main

    {
        let x = 5;         // ② x is declared inside the inner block — its lifetime ends when the block closes
        r = &x;            // ③ r now holds a reference to x — the reference's lifetime is tied to x
        println!("r: {}", r); // ④ r is used here while x is still in scope — the reference is valid at this point
    }                      // ⑤ x is dropped here — if println! were after this brace, r would be a dangling reference
}
```

**Why:** A reference cannot outlive the value it points to. When `x` is dropped at the end of the inner block, any reference to it becomes invalid. Moving the `println!` inside the block ensures `r` is used before `x` is gone. This is the borrow checker's core job: guarantee no dangling references exist.

</details>

---

## Exercise 2 - The Borrow Checker in Action

The borrow checker compares the lifetime of the value with the lifetime of the reference. If the reference lives longer than the value it points to, the compiler stops you.

This exercise shows the rule working correctly. Both the value and the reference live in the same scope, so there is no problem.

#### Your Task

This code already compiles. Read it, run it, and confirm you understand why it works. Then change `x = 5` to be declared inside a separate inner block and see what error you get.

```rust
fn main() {
    let x = 5;
    let r = &x;
    println!("r: {}", r);
}
```

#### Expected Output

```text
r: 5
```

<details>
<summary>What's happening</summary>

```rust
fn main() {
    let x = 5;    // ① x is declared in the main scope — its lifetime spans to the end of main
    let r = &x;   // ② r holds an immutable reference to x — the reference's lifetime is also in the main scope
    println!("r: {}", r); // ③ r is used while x is still alive — the reference is valid, the borrow checker approves
}
```

**Why:** Both `x` and `r` live until the end of `main`. The reference never outlives the value. When you move `x` into an inner block and use `r` after the block closes, the compiler tells you `x does not live long enough` — that error is the borrow checker preventing a dangling reference.

</details>

---

## Exercise 3 - Lifetime Annotations on Functions

When a function takes two references and returns one of them, the compiler needs to know which input the returned reference comes from. It cannot always figure this out on its own. That is when you add a lifetime annotation.

`'a` is the annotation. You declare it in angle brackets after the function name, then apply it to the parameters and return type that share that lifetime.

#### Your Task

A function returns the longer of two string slices. Right now it is missing lifetime annotations. The compiler cannot tell whether the returned reference comes from `x` or `y`, so it refuses to compile. Add `'a` to the function signature so the compiler knows both inputs and the output share the same lifetime.

```rust
fn longest(x: &str, y: &str) -> &str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}

fn main() {
    let s1 = String::from("long string");
    let result;
    {
        let s2 = String::from("xyz");
        result = longest(s1.as_str(), s2.as_str());
        println!("longest: {}", result);
    }
}
```

#### Expected Output

```text
longest: long string
```

<details>
<summary>Answer</summary>

```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str { // ① <'a> declares the lifetime — both inputs and the return share it
    if x.len() > y.len() {                            // ② compares lengths — either x or y may be returned
        x                                             // ③ returns a reference with lifetime 'a — valid as long as both inputs are
    } else {
        y                                             // ④ same lifetime — the compiler knows the return lives as long as the shorter input
    }
}

fn main() {
    let s1 = String::from("long string"); // ⑤ s1 is owned by main
    let result;
    {
        let s2 = String::from("xyz");            // ⑥ s2 is owned by this inner block
        result = longest(s1.as_str(), s2.as_str()); // ⑦ both references passed in — result's lifetime is bounded by the shorter (s2)
        println!("longest: {}", result);         // ⑧ result used while both s1 and s2 are still alive — valid
    }
}
```

**Why:** The lifetime annotation `'a` does not change how long references actually live — it just tells the compiler how they relate to each other. Saying both inputs and the return share `'a` means: the returned reference will live at least as long as the shorter of the two inputs. Without this, the compiler cannot verify the returned reference is safe.

</details>

---

## Exercise 4 - Multiple Lifetime Annotations

A function can have more than one lifetime. When two parameters have different lifetimes and only one is returned, they get different labels.

#### Your Task

A function takes two references: one that will be returned, one that will only be printed. Add two lifetime annotations `'a` and `'b` so the return type is tied only to the reference that gets returned.

```rust
fn print_and_return(x: &str, y: &str) -> &str {
    println!("y is: {}", y);
    x
}

fn main() {
    let s1 = String::from("hello");
    let result;
    {
        let s2 = String::from("world");
        result = print_and_return(s1.as_str(), s2.as_str());
    }
    println!("result: {}", result);
}
```

#### Expected Output

```text
y is: world
result: hello
```

<details>
<summary>Answer</summary>

```rust
fn print_and_return<'a, 'b>(x: &'a str, y: &'b str) -> &'a str { // ① two lifetimes declared — 'a for x (returned), 'b for y (only printed)
    println!("y is: {}", y); // ② y is used inside the function — its lifetime 'b only needs to cover the function call
    x                        // ③ x is returned — the return type carries 'a, so the caller knows this reference lives as long as x
}

fn main() {
    let s1 = String::from("hello"); // ④ s1 is owned by main — lifetime 'a lasts until end of main
    let result;
    {
        let s2 = String::from("world");                           // ⑤ s2 is owned by this block — lifetime 'b only needs to last through the function call
        result = print_and_return(s1.as_str(), s2.as_str());      // ⑥ result's lifetime is 'a (tied to s1), not 'b (tied to s2)
    }                                                              // ⑦ s2 is dropped here — fine because result is not tied to s2
    println!("result: {}", result); // ⑧ result is valid — its reference points to s1, which is still alive
}
```

**Why:** Separate lifetime annotations let you express that the return is tied to one input but not the other. `'a` on `x` and the return type says: the caller can use the returned reference as long as `x` is alive. `'b` on `y` is independent — `y` only needs to live through the function call itself.

</details>

---

## Exercise 5 - Lifetime Elision

Most of the time you do not need to write lifetime annotations. Rust has a set of built-in rules called lifetime elision rules that let the compiler fill them in automatically.

The most common case: a function that takes one reference and returns a reference. The compiler assumes the output has the same lifetime as the input.

#### Your Task

This function takes a string slice and returns the first word. It works without any lifetime annotations because elision handles it. Run it and confirm it compiles. Then add the lifetime annotation manually and confirm it still compiles.

```rust
fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }
    &s[..]
}

fn main() {
    let sentence = String::from("hello world");
    let word = first_word(&sentence);
    println!("{}", word);
}
```

#### Expected Output

```text
hello
```

<details>
<summary>Answer with explicit annotation</summary>

```rust
fn first_word<'a>(s: &'a str) -> &'a str { // ① explicit lifetime annotation — 'a ties the return to the input (same as what elision does automatically)
    let bytes = s.as_bytes();               // ② converts the string to a byte slice for scanning
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i]; // ③ returns a slice of s — the returned reference has lifetime 'a because it comes from s
        }
    }
    &s[..]  // ④ returns the whole string if no space found — also lifetime 'a
}

fn main() {
    let sentence = String::from("hello world"); // ⑤ sentence owns the String
    let word = first_word(&sentence);           // ⑥ borrows sentence — word's lifetime is tied to sentence's
    println!("{}", word);                       // ⑦ word is valid here because sentence is still in scope
}
```

**Why:** Lifetime elision rule: one reference input, one reference output — the compiler assumes they share the same lifetime. The explicit annotation above is identical to what the compiler infers silently. Understanding what elision does helps you know when you need to write annotations (multiple inputs, different possible sources for the return).

</details>

---

## Exercise 6 - Build: Longest Plan Name in a Contract

A contract stores plan names for multiple subscribers. A helper function compares two plan name slices and returns the longer one. The caller uses the result after both inputs are still in scope.

#### Your Task

Write a function `longest_plan` that:
1. Takes two `&str` parameters.
2. Returns the longer one as a `&str`.
3. Uses a lifetime annotation so it compiles.

The `main` function is written for you.

```rust
fn main() {
    let plan_a = String::from("basic");
    let plan_b = String::from("enterprise");
    let result = longest_plan(plan_a.as_str(), plan_b.as_str());
    println!("Longer plan: {}", result);
}
```

#### Expected Output

```text
Longer plan: enterprise
```

<details>
<summary>Answer</summary>

```rust
fn longest_plan<'a>(x: &'a str, y: &'a str) -> &'a str { // ① <'a> declares the shared lifetime — both inputs and the return use it
    if x.len() >= y.len() { // ② compares lengths — >= means x wins on a tie
        x                   // ③ returns x with lifetime 'a
    } else {
        y                   // ④ returns y with lifetime 'a
    }
}

fn main() {
    let plan_a = String::from("basic");      // ⑤ plan_a is owned by main
    let plan_b = String::from("enterprise"); // ⑥ plan_b is owned by main
    let result = longest_plan(plan_a.as_str(), plan_b.as_str()); // ⑦ result's lifetime is bounded by the shorter of plan_a and plan_b
    println!("Longer plan: {}", result);     // ⑧ both plan_a and plan_b are still alive — result is valid
}
```

**Why:** The lifetime annotation `<'a>` tells the compiler that the returned reference will be valid as long as both inputs are. Without it, the compiler cannot determine which input the return came from and refuses to compile. In a contract, this pattern appears whenever you compare or select between borrowed string values.

</details>

---

**End of Lifetimes.**
