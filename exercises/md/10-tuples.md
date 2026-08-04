# Practice - Tuples

> Source for `tuples.html` — follows `_docs/STYLE-GUIDE.md` and `_docs/EXERCISE-PAGE-DESIGN.md`

Work through each exercise in the [Rust Playground](https://play.rust-lang.org).  
Read the explainer, paste the starter code, fix it, then move on.  
Check your answer only after you've tried.

> Common mistakes to watch for:
> - The `:` labels the type. The `=` puts the value inside. They are two separate jobs.
> - When copying code, don't paste the backtick fence lines into the Rust Playground.
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

### Exercise 1 - Annotating a Tuple with Mixed Types

A tuple stores an integer and a string slice together. Right now the type annotation has blanks.

A tuple is a way to store related pieces of information in a single variable. It groups values of different types together as one compound value. Think of it like an address book entry that holds a name and a phone number together.

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

<details>
<summary>Answer</summary>

```rust
fn main() {
    let t: (i32, &str) = (1, "hello"); // ① the type annotation lists each element's type in order — 1 is i32, "hello" is &str
    println!("Second: {}", t.1);       // ② t.1 accesses the second element — tuple indexing starts at 0
}
```

**Why:** A tuple type lists the types of each element in parentheses, in the same order as the values. The `:` after the variable name introduces the type annotation — it does not assign a value. The `=` is where the actual value goes. Getting these mixed up is a common error when first writing tuple declarations.

</details>

---

### Exercise 2 - Annotating a Five-Element Tuple

A 5-element tuple needs a type annotation for each slot. Right now the type annotation has blanks.

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

```rust
fn main() {
    let t: (u8, i16, i64, &str, String) = (1u8, -1i16, 3i64, "hello", String::from("world")); // ① each type in the annotation matches its corresponding value — u8, i16, i64 are number types, &str is a borrowed string literal, String is an owned heap string
    println!("Tuple created"); // ② the tuple is created and valid — each element is stored at its own index
}
```

**Why:** Tuples can hold any mix of types. The type annotation must list every type in the exact same order as the values. The number suffixes on the literals (like `1u8`) tell the compiler what type that specific integer is — without them, the compiler might infer a different type than you intended.

</details>

---

### Exercise 3 - Reading a Nested Tuple

A program reads the second value inside a nested tuple. Right now it uses the wrong index.

Tuples can be nested: one tuple can hold another tuple inside it. Indexing is zero-based, so the first element is `.0`, the second is `.1`, and so on.

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

```rust
fn main() {
    let t: (u8, (i16, u32)) = (1, (-1, 3)); // ① t holds a u8 at index 0 and an inner tuple (i16, u32) at index 1
    println!("Inner second: {}", t.1.1);    // ② t.1 reaches the inner tuple (-1, 3), then .1 reaches the second element of that tuple — which is 3
}
```

**Why:** Chained dot notation navigates into nested tuples one level at a time. `t.1` gets the inner tuple at position 1. `.1` on that result gets the second element inside the inner tuple. Index 2 would be out of bounds — the inner tuple only has two elements (indices 0 and 1).

</details>

---

### Exercise 4 - Accessing the Third Element

A program prints the third element of a 5-element tuple. Right now the index is missing.

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

```rust
fn main() {
    let t: (u8, i16, i64, &str, String) = (1, -1, 3, "hello", String::from("world")); // ① t holds five values — u8 at .0, i16 at .1, i64 at .2, &str at .3, String at .4
    println!("Third: {}", t.2); // ② t.2 accesses the third element — 3 as an i64 — because indexing starts at 0
}
```

**Why:** Tuple indexing always starts at 0. The "third" element is at index 2. This is the same rule as arrays and slices — consistent across all indexed types in Rust. Writing `t.3` would get the fourth element (`"hello"`), not the third.

</details>

---

### Exercise 5 - Destructuring a Tuple with `let`

A tuple needs to be pulled apart into three named variables. Right now the destructuring pattern is missing.

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

```rust
fn main() {
    let t = (10, 20, 30);     // ① t is a tuple holding three i32 values
    let (x, y, z) = t;        // ② the destructuring pattern mirrors the tuple's shape — x gets 10, y gets 20, z gets 30
    println!("x = {}, y = {}, z = {}", x, y, z); // ③ x, y, z are now independent variables — each holds one value from the tuple
}
```

**Why:** Destructuring unpacks a tuple into separate named variables in one statement. The pattern on the left must match the shape of the tuple on the right — same number of elements, in the same order. This is more readable than accessing `t.0`, `t.1`, `t.2` every time you need the values.

</details>

---

### Exercise 6 - Destructuring into Existing Variables

Existing variables need to be updated with values from a tuple. Right now the assignment pattern is missing.

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

```rust
fn main() {
    let t = (100, 200);    // ① t holds two i32 values
    let mut a = 0;         // ② a is declared mutable — it will be overwritten by the destructuring assignment
    let mut b = 0;         // ③ b is declared mutable — same reason
    (a, b) = t;            // ④ destructuring assignment without let — updates a and b in place with t's values
    println!("a = {}, b = {}", a, b); // ⑤ a is now 100, b is now 200 — the tuple's values replaced the originals
}
```

**Why:** Destructuring without `let` updates existing variables instead of creating new ones. The variables must be declared `mut` because their values are being changed. This pattern is useful when you want to update several related variables at once from a tuple result.

</details>

---

**End of Tuples.**
