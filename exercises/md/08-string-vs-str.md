# Practice - String vs &str

> Source for `string-vs-str.html` — follows `_docs/STYLE-GUIDE.md` and `_docs/EXERCISE-PAGE-DESIGN.md`

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

A variable tries to hold text using the wrong type annotation. Right now it fails because a text literal in double quotes is not a `String` — it is a string slice (`&str`).

A string literal is text wrapped in double quotes. Rust hard-codes it into the program and stores it in read-only memory. Its type is `&str`, which means "a borrowed slice of text." Think of it like a street sign — the text is fixed in place and you only get a pointer to it, not a copy you can edit.

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

```rust
fn main() {
    let s: &str = "hello, world"; // ① &str is the correct type for a string literal — the text lives in read-only memory and s is a borrowed reference to it
    println!("{}", s);            // ② prints the borrowed text — no ownership involved, just reading
}
```

**Why:** A string literal like `"hello, world"` is baked into the program binary at compile time. Its type is `&str` — a borrowed slice pointing to that fixed memory. `String` is a separate heap-allocated type that owns its data. You cannot store a `&str` in a `String` variable without converting it first.

</details>

---

### Exercise 2 Getting a Slice from a Boxed Literal

The code heap-allocates a string literal inside a `Box` and tries to pass it to a function that expects `&str`. Right now the argument does not match the parameter type.

A `Box` is a pointer that puts data on the heap. When you write `"hello".into()`, Rust converts the literal into a `Box<str>`. Passing a reference to the Box (`&s`) lets Rust automatically reach through the pointer and hand the function a string slice.

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

**Approach 1 — Pass a reference to the Box:**

```rust
fn print_it(s: &str) {
    println!("{}", s); // ③ receives a &str and prints it
}

fn main() {
    let s: Box<str> = "hello, world".into(); // ① .into() converts the &str literal into a heap-allocated Box<str>
    print_it(&s);                            // ② &s creates a reference to the Box — Rust automatically dereferences Box<str> into &str
}
```

**Why:** `Box<str>` implements `Deref<Target = str>`, which lets Rust automatically coerce `&Box<str>` into `&str` when passing to a function. This deref coercion saves you from writing out every conversion manually.

**Approach 2 — Pass the literal directly:**

```rust
fn print_it(s: &str) {
    println!("{}", s); // ③ receives the &str literal directly
}

fn main() {
    let s: Box<str> = "hello, world".into(); // ① s still holds the Box<str>
    print_it("hello, world");               // ② pass the string literal directly — it is already &str, no conversion needed
}
```

**Why:** A string literal is always `&str`, so you can pass it directly to any function that expects `&str`. The `Box<str>` in `s` is unused in this approach — the literal is self-contained.

</details>

---

### Exercise 3 Building a String with push and push_str

A function builds text by adding pieces to a `String`. Right now it fails because two method calls are swapped and the `String` is not declared as mutable.

`push_str` appends a whole string slice (multiple characters in double quotes). `push` appends exactly one single character in single quotes. A `String` must be declared with `mut` before you can append to it.

```rust
fn main() {
    let s = String::new();
    s.push("monthly ");
    s.push_str('p');
    s.push_str("lan");
    println!("{}", s);
}
```

**Fix all errors without adding a new line.**

<details>
<summary>Answer</summary>

```rust
fn main() {
    let mut s = String::new(); // ① mut is required — String must be declared mutable before you can append to it
    s.push_str("monthly ");   // ② push_str takes a &str (double quotes) — use it for multiple characters
    s.push('p');              // ③ push takes a char (single quotes) — use it for exactly one character
    s.push_str("lan");        // ④ push_str again for the remaining slice — builds "monthly plan" piece by piece
    println!("{}", s);        // ⑤ prints the fully assembled String
}
```

**Why:** `push_str` and `push` are two different methods for two different inputs. `push_str` takes a `&str` (a slice of text), `push` takes a single `char`. Getting them mixed up is a type error — Rust refuses to compile it. The `mut` keyword is also required because appending changes the String's contents.

</details>

---

### Exercise 4 Concatenating Strings with +

A function joins two strings into one. Right now it fails because the second argument is a `String`, but `+` requires a `&str` after the first argument.

The `+` operator takes a `String` on the left and a `&str` on the right. It reuses the left `String`'s memory buffer and appends the right side to it. After the operation, the left `String` is no longer valid — its data was moved into the result.

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

**Approach 1 — Pass a reference to the second String:**

```rust
fn main() {
    let s1 = String::from("hello,"); // ① s1 owns its String
    let s2 = String::from(" world"); // ② s2 owns its String
    let s3 = s1 + &s2;              // ③ + moves s1's ownership into s3 and appends &s2 — &String auto-coerces to &str, s1 is now invalid
    println!("{}", s3);             // ④ s3 owns the combined result — s1 is gone, s2 is still valid
}
```

**Why:** The `+` operator is defined as `fn add(self, s: &str) -> String`. `self` means `s1` is moved and consumed — you cannot use it after. The right side must be a `&str`, so passing `&s2` works because `&String` automatically coerces to `&str`.

**Approach 2 — Use `as_str()`:**

```rust
fn main() {
    let s1 = String::from("hello,");  // ① s1 owns its String
    let s2 = String::from(" world");  // ② s2 owns its String
    let s3 = s1 + s2.as_str();       // ③ .as_str() explicitly converts s2 to &str — s1 is still moved and consumed by +
    println!("{}", s3);              // ④ s3 owns the combined result
}
```

**Why:** `as_str()` explicitly converts a `String` to a `&str` without any implicit coercion. Both approaches produce the same result — choose whichever makes the intent clearer in your code.

</details>

---

### Exercise 5 Converting a String Slice to a String

The code declares `name` as a `&str` and tries to assign it directly to a `String` variable. Right now the types do not match because `&str` is borrowed and `String` wants to own its data.

A `&str` is a borrowed view — it points to text that lives somewhere else. A `String` owns its own heap memory. To convert, you ask Rust to copy the text into a new heap buffer.

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

**Approach 1 — `.to_string()`:**

```rust
fn main() {
    let name: &str = "premium";         // ① name borrows a string literal — it does not own the text
    let stored: String = name.to_string(); // ② .to_string() allocates new heap memory and copies the text into it — stored now owns the data
    println!("{}", stored);             // ③ stored is an owned String — independent of the original &str
}
```

**Why:** `&str` is a borrowed view into existing text. `String` owns its data on the heap. Converting requires allocating new memory and copying the text — `.to_string()` and `String::from()` both do this. Neither is faster than the other; they produce identical results.

**Approach 2 — `String::from()`:**

```rust
fn main() {
    let name: &str = "premium";          // ① name is a borrowed &str
    let stored: String = String::from(name); // ② String::from() allocates heap memory, copies the text, and returns an owned String
    println!("{}", stored);              // ③ stored owns its own copy of the text
}
```

**Why:** `String::from()` is the constructor form of the same conversion. Use it when the intent is clearly "create a new String from this text." Use `.to_string()` when the source is already a variable and a method call reads more naturally.

</details>

---

### Exercise 6 Passing a String as a String Slice

The code holds a `String` called `s` and tries to pass it to a function that expects `&str`. Right now a `String` is passed directly, but the function wants a borrowed slice.

A reference to a `String` (`&s`) can be automatically treated as a `&str`. This is because `String` stores valid UTF-8 on the heap, and a reference to the `String` can be viewed as a slice pointing to that same data.

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

```rust
fn print_it(s: &str) {
    println!("{}", s); // ③ receives a &str and prints it — read-only access, no ownership needed
}

fn main() {
    let s = String::from("hello, world"); // ① s owns the String on the heap
    print_it(&s);                         // ② &s creates a reference to the String — Rust automatically coerces &String into &str for the function call
}
```

**Why:** `String` implements `Deref<Target = str>`, so `&String` automatically coerces to `&str` when passed to a function that expects it. Writing `&s` instead of `s` keeps `s` owned by `main` — no move happens, and `s` remains valid after the call.

</details>

---

**End of String vs &str.**
