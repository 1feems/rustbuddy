# Practice - String vs &str

> Follows `EXERCISE-STYLE-GUIDE.md`

Work through each exercise in the [Rust Playground](https://play.rust-lang.org).  
Read the explainer, paste the starter code, fix it, then move on.  
Check your answer only after you've tried.

---

## Quick reference

| Concept | What it means |
|---|---|
| `String` | Heap-allocated, owns its data, can grow and shrink, mutable with `mut` |
| `&str` | String slice, an immutable view into a string. Read-only. |
| String literal | Text in double quotes, type `&str`, stored in read-only memory at compile time |
| `push_str` | Appends a string slice (`&str`) to a `String` |
| `push` | Appends a single character to a `String` |
| `+` | Concatenates a `String` with `&str`. The first `String` is consumed (moved). |
| `as_str()` / `&s` | Convert `String` to `&str` |
| `to_string()` / `String::from()` | Convert `&str` to `String` |
| `chars()` | Iterate over individual characters of a string |

---

### Exercise 1 Annotating a String Literal Type

This exercise tests how Rust assigns a type to a text literal. In a real contract, a plan name like `"premium"` is a string literal getting its type wrong blocks compilation when you store or pass it.

A variable tries to hold text using the wrong type annotation. Right now it fails because a text literal in double quotes is not a `String`, it is a string slice (`&str`).

A string literal is text wrapped in double quotes. Rust hard-codes it into the program and stores it in read-only memory. Its type is `&str`, which means "a borrowed slice of text." Think of it like a street sign the text is fixed in place and you only get a pointer to it, not a copy you can edit.

```rust
fn main() {
    let s: String = "hello, world";
    println!("{}", s);
}
```

**Fix this error by changing only the type annotation. Do not add or remove any lines.**

> Common mistake: If you write `let s = hello, world;` without quotes, Rust thinks `hello` and `world` are variable names, not text. Always wrap text in double quotes.

<details>
<summary>Answer</summary>

Change the type annotation from `String` to `&str`. A text literal in quotes is a string slice, not a heap-allocated `String`.

```rust
fn main() {
    let s: &str = "hello, world";
    println!("{}", s);
}
```

</details>

---

### Exercise 2 Getting a Slice from a Boxed Literal

This exercise tests `into()` and `Box`. In a real contract, you might heap-allocate a fixed merchant address and then borrow it as a slice for a lookup helper.

The code heap-allocates a string literal inside a `Box` and tries to pass it to a function that expects `&str`. Right now the argument does not match the parameter type.

A `Box` is a pointer that puts data on the heap. When you write `"hello".into()`, Rust converts the literal into a `Box<str>`. Passing a reference to the Box (`&s`) lets Rust automatically reach through the pointer and hand the function a string slice. You can also skip the Box and pass the literal directly.

```rust
fn print_it(s: &str) {
    println!("{}", s);
}

fn main() {
    let s: Box<str> = "hello, world".into();
    print_it(___);
}
```

**Use as many approaches as you can to make the `print_it` call work. Do not add or remove any lines.**

<details>
<summary>Answer</summary>

Approach 1 Pass a reference to the Box:

A reference to a `Box<str>` automatically derefs to `&str` when passed to a function that expects it.

```rust
fn print_it(s: &str) {
    println!("{}", s);
}

fn main() {
    let s: Box<str> = "hello, world".into();
    print_it(&s);
}
```

Approach 2 Pass the literal directly:

Skip the Box entirely. A string literal is already `&str`, so you can pass it straight to the function.

```rust
fn print_it(s: &str) {
    println!("{}", s);
}

fn main() {
    let s: Box<str> = "hello, world".into();
    print_it("hello, world");
}
```

</details>

---

### Exercise 3 Building a String with push and push_str

This exercise tests `String` mutation and the difference between `push` and `push_str`. In a real contract, a helper might build a dynamic plan description by joining fixed prefixes with configurable options.

A function builds text by adding pieces to a `String`. Right now it fails because two method calls are swapped and the `String` is not declared as mutable.

`push_str` appends a whole string slice (multiple characters in double quotes). `push` appends exactly one single character in single quotes. A `String` must be declared with `mut` before you can append to it. Think of `mut` as an unlock switch without it, the `String` is sealed shut.

```rust
fn main() {
    let s = String::new();
    s.push("monthly ");
    s.push_str('p');
    s.push_str("lan");
    println!("{}", s);
}
```

**Fix all arrows without adding a new line.**

<details>
<summary>Answer</summary>

1. `let s` → `let mut s` (must be mutable to append)
2. `push("monthly ")` → `push_str("monthly ")` (needs a slice, not a char)
3. `push_str('p')` → `push('p')` (needs a single char, not a slice)

```rust
fn main() {
    let mut s = String::new();
    s.push_str("monthly ");
    s.push('p');
    s.push_str("lan");
    println!("{}", s);
}
```

</details>

---

### Exercise 4 Concatenating Strings with +

This exercise tests the `+` operator for string concatenation. In a real contract, you might join a plan name with a suffix to create a display label.

A function joins two strings into one. Right now it fails because the second argument is a `String`, but `+` requires a `&str` after the first argument.

The `+` operator takes a `String` on the left and a `&str` on the right. It reuses the left `String`'s memory buffer and appends the right side to it. After the operation, the left `String` is no longer valid its data was moved into the result.

```rust
fn main() {
    let s1 = String::from("hello,");
    let s2 = String::from(" world");
    let s3 = s1 + s2;
    println!("{}", s3);
}
```

**Use two approaches to make the concatenation work. Do not add or remove any lines.**

<details>
<summary>Answer</summary>

Approach 1 Pass a reference to the second String:

A reference to `String` (`&s2`) can be automatically treated as `&str`.

```rust
fn main() {
    let s1 = String::from("hello,");
    let s2 = String::from(" world");
    let s3 = s1 + &s2;
    println!("{}", s3);
}
```

Approach 2 Use `as_str()`:

The `as_str()` method on `String` returns a `&str` directly.

```rust
fn main() {
    let s1 = String::from("hello,");
    let s2 = String::from(" world");
    let s3 = s1 + s2.as_str();
    println!("{}", s3);
}
```

</details>

---

### Exercise 5 Converting a String Slice to a String

This exercise tests converting `&str` into an owned `String`. In a real contract, when a user selects a plan, the plan name is received as a borrowed `&str` and must be copied into an owned `String` stored in the program state.

The code declares `name` as a `&str` and tries to assign it directly to a `String` variable. Right now the types do not match because `&str` is borrowed and `String` wants to own its data.

A `&str` is a borrowed view it points to text that lives somewhere else. A `String` owns its own heap memory. To convert, you ask Rust to copy the text into a new heap buffer. Two common ways are `.to_string()` and `String::from()`.

```rust
fn main() {
    let name: &str = "premium";
    let stored: String = name;
    println!("{}", stored);
}
```

**Use two approaches to make this compile. Do not add or remove any lines.**

<details>
<summary>Answer</summary>

Approach 1 `.to_string()`:

This creates a new `String` by copying the slice's text into heap memory.

```rust
fn main() {
    let name: &str = "premium";
    let stored: String = name.to_string();
    println!("{}", stored);
}
```

Approach 2 `String::from()`:

This does the same conversion through the `String` type itself.

```rust
fn main() {
    let name: &str = "premium";
    let stored: String = String::from(name);
    println!("{}", stored);
}
```

</details>

---

### Exercise 6 Passing a String as a String Slice

This exercise tests converting `String` to `&str` by passing a reference. In a real contract, a helper that prints a wallet address expects `&str` for read-only access, but the caller holds a `String`.

The code holds a `String` called `s` and tries to pass it to a function that expects `&str`. Right now a `String` is passed directly, but the function wants a borrowed slice.

A reference to a `String` (`&s`) can be automatically treated as a `&str`. This is because `String` keeps its text in valid UTF-8 on the heap, and a reference to the `String` can be viewed as a slice pointing to that same heap data.

```rust
fn print_it(s: &str) {
    println!("{}", s);
}

fn main() {
    let s = String::from("hello, world");
    print_it(s);
}
```

**Fix this without adding a new line.**

<details>
<summary>Answer</summary>

Pass `&s` instead of `s`. A reference to `String` automatically becomes a `&str` when the function expects it.

```rust
fn print_it(s: &str) {
    println!("{}", s);
}

fn main() {
    let s = String::from("hello, world");
    print_it(&s);
}
```

</details>


---

**End of String vs &str.**
