# Practice - Tuples

> Follows `EXERCISE-STYLE-GUIDE.md`

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

### Exercise 1 - Annotating a Tuple with Mixed Types

This exercise tests tuple creation and type annotation. In a contract, a single record might group a subscriber ID and their balance together as one unit.

A tuple stores an integer and a string slice together. Right now the type annotation has blanks.

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

A program reads the second value inside a nested tuple. Right now it uses the wrong index.

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

**End of Tuples.**
