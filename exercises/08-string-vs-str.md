# Practice - String vs &str

> DRAFT FOR REVIEW - Follows `EXERCISE-STYLE-GUIDE.md`

Work through each exercise in the [Rust Playground](https://play.rust-lang.org).  
Read the explainer, paste the starter code, fix it, then move on.  
Check your answer only after you've tried.

---

## Quick reference

| Concept | What it means |
|---|---|
| `String` | Heap-allocated, owns its data, can grow and shrink, mutable with `mut` |
| `&str` | String slice an immutable view into a string. Read-only. |
| String literal | Text in double quotes, type `&str`, stored in read-only memory at compile time |
| `push_str` | Appends a string slice (`&str`) to a `String` |
| `push` | Appends a single character to a `String` |
| `+` | Concatenates a `String` with `&str`. The first `String` is consumed (moved). |
| `as_str()` / `&s` | Convert `String` to `&str` |
| `to_string()` / `String::from()` | Convert `&str` to `String` |
| `chars()` | Iterate over individual characters of a string |

---

## Track A - Generic Rust

---

### Exercise 1 Annotating a String Literal Type

This exercise tests how Rust assigns a type to a text literal. In a real contract, a plan name like `"premium"` is a string literal getting its type wrong blocks compilation when you store or pass it.

The code wants to declare a variable `s` that holds the text `"hello, world"`. Right now the type label says `String`, but a text literal in double quotes is not a `String` it is a string slice (`&str`).

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

The code wants to build the text `"monthly plan"` inside a `String` by adding pieces step by step. Right now two method calls are swapped, and the `String` is not declared as mutable.

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

The code wants to join `"hello,"` and `" world"` into one `String`. Right now the second argument is a `String`, but `+` requires a `&str` after the first argument. Also, the first `String` is consumed (moved) during concatenation.

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

### Exercise 7 Slicing a String Instead of Indexing

This exercise tests string slicing. In a real contract, you might extract a prefix from a transaction note or a country code from a region string.

The code tries to grab the first character of `s1` using index `[0]`. Right now this fails because Rust does not allow indexing into a string a character might use multiple bytes in UTF-8, so a single index would be ambiguous.

Instead of an index, Rust uses a range slice like `&s1[0..1]`. This says "give me a view from byte 0 up to but not including byte 1." Even a single character comes back as a `&str` slice, not a single `char`.

```rust
fn main() {
    let s1 = String::from("hi,中国");
    let h = s1[0];
    assert_eq!(h, "h");
}
```

**Modify this line to fix the error.**

> Common mistake: `let h = s1[0..1];` without the leading `&` will not compile. A string slice is a borrowed view, so you need the borrow symbol: `&s1[0..1]`.

<details>
<summary>Answer</summary>

Replace `s1[0]` with `&s1[0..1]`. Rust string slices use byte offsets inside square brackets, and the result is a borrowed `&str`.

```rust
fn main() {
    let s1 = String::from("hi,中国");
    let h = &s1[0..1];
    assert_eq!(h, "h");
}
```

</details>

---

### Exercise 8 Slicing a Multi-Byte UTF-8 Character

This exercise tests UTF-8 byte slicing. In a real contract, a username or region code might contain multi-byte characters your slice must land on exact character boundaries.

The code wants to extract the first Chinese character from a string. Right now the byte range ends in the middle of the character, which causes a panic.

UTF-8 stores ASCII in 1 byte, but many international characters use 3 bytes. `"hi,中国"` uses 3 bytes for `"中"` and 3 for `"国"`. The first Chinese byte starts at index 3 (after the ASCII `"hi,"`).

```rust
fn main() {
    let s = String::from("hi,中国");
    let c = &s[3..5];
    assert_eq!(c, "中");
}
```

**Modify the byte range so the slice returns `"中"`.**

<details>
<summary>Answer</summary>

`"中"` is 3 bytes in UTF-8, starting at byte 3. The correct range is `[3..6]`.

```rust
fn main() {
    let s = String::from("hi,中国");
    let c = &s[3..6];
    assert_eq!(c, "中");
}
```

</details>

---

## Track B - Progressive Contract

All exercises below apply the same string concepts to a subscription payment contract. The same Rust rules different clothes.

---

### Exercise 1 Annotating a Plan Name Literal

This exercise tests how Rust types a text literal. In a real contract, plan names like `"basic"` and `"premium"` are string literals passed into price lookup helpers the type must match what the helper expects.

The code wants to declare a plan name as a text literal. Right now the type label says `String`, but text in double quotes is always a string slice (`&str`), not a `String`.

A string literal is text wrapped in double quotes. Rust bakes it into the program binary and stores it in read-only memory. Its type is `&str`, meaning it is borrowed and cannot be changed.

```rust
fn main() {
    let plan: String = "premium";
    println!("Plan: {}", plan);
}
```

**Fix this error by changing only the type annotation. Do not add or remove any lines.**

> Common mistake: Writing `let plan = premium;` without quotes makes Rust look for a variable called `premium`. Always wrap text in double quotes.

<details>
<summary>Answer</summary>

Change `String` to `&str`. A text literal in quotes is a borrowed slice, not an owned heap `String`.

```rust
fn main() {
    let plan: &str = "premium";
    println!("Plan: {}", plan);
}
```

</details>

---

### Exercise 2 Borrowing a Boxed Merchant Address

This exercise tests `into()` and `Box`. In a real contract, a fixed treasury address might be heap-allocated for consistency, then borrowed as a slice for a verification check.

The code heap-allocates a merchant address string and tries to pass it to a verifier function that expects `&str`. Right now the argument type does not match.

A `Box` is a pointer that puts data on the heap. Passing a reference to the Box lets Rust automatically reach through the pointer and hand the function a string slice. You can also skip the Box and pass the literal directly.

```rust
fn verify_address(addr: &str) {
    println!("Verified: {}", addr);
}

fn main() {
    let addr: Box<str> = "treasury_7a3f".into();
    verify_address(___);
}
```

**Use as many approaches as you can to make the call work. Do not add or remove any lines.**

<details>
<summary>Answer</summary>

Approach 1 Pass a reference to the Box:

```rust
fn verify_address(addr: &str) {
    println!("Verified: {}", addr);
}

fn main() {
    let addr: Box<str> = "treasury_7a3f".into();
    verify_address(&addr);
}
```

Approach 2 Pass the literal directly:

```rust
fn verify_address(addr: &str) {
    println!("Verified: {}", addr);
}

fn main() {
    let addr: Box<str> = "treasury_7a3f".into();
    verify_address("treasury_7a3f");
}
```

</details>

---

### Exercise 3 Building a Plan Description

This exercise tests `String` mutation. In a real contract, a helper might build a dynamic plan description by joining fixed prefixes with configurable options.

The code wants to build the text `"monthly plan"` by appending pieces to an empty `String`. Right now two methods are swapped, and the `String` is not declared as mutable.

`push_str` takes a string slice (multiple characters in double quotes). `push` takes a single character in single quotes. A `String` must be declared with `mut` before you can append to it.

```rust
fn main() {
    let desc = String::new();
    desc.push("monthly ");
    desc.push_str('p');
    desc.push_str("lan");
    println!("{}", desc);
}
```

**Fix all arrows without adding a new line.**

<details>
<summary>Answer</summary>

1. `let desc` → `let mut desc`
2. `push("monthly ")` → `push_str("monthly ")` (needs a slice, not a char)
3. `push_str('p')` → `push('p')` (needs a single char, not a slice)

```rust
fn main() {
    let mut desc = String::new();
    desc.push_str("monthly ");
    desc.push('p');
    desc.push_str("lan");
    println!("{}", desc);
}
```

</details>

---

### Exercise 4 Joining a Plan Name with a Tier

This exercise tests the `+` concatenation operator. In a real contract, you might join a base plan name with a tier suffix before storing it in a subscriber record.

The code wants to join `"basic"` and `"_plan"` into one `String`. Right now the second argument is a `String`, but `+` requires a `&str` after the first argument.

The `+` operator takes a `String` on the left and a `&str` on the right. It appends the right side into the left `String`'s buffer. The left `String` is consumed in the process.

```rust
fn main() {
    let name = String::from("basic");
    let tier = String::from("_plan");
    let full = name + tier;
    println!("{}", full);
}
```

**Use two approaches to make the concatenation work. Do not add or remove any lines.**

<details>
<summary>Answer</summary>

Approach 1 Pass a reference:

```rust
fn main() {
    let name = String::from("basic");
    let tier = String::from("_plan");
    let full = name + &tier;
    println!("{}", full);
}
```

Approach 2 Use `as_str()`:

```rust
fn main() {
    let name = String::from("basic");
    let tier = String::from("_plan");
    let full = name + tier.as_str();
    println!("{}", full);
}
```

</details>

---

### Exercise 5 Storing a Plan Name as an Owned String

This exercise tests converting a `&str` into an owned `String`. In a real contract, when a user selects a plan, the plan name is received as a borrowed `&str` and must be copied into an owned `String` stored in the program state.

The code receives `name` as a `&str` and tries to assign it directly to a `String`. Right now the types do not match a borrowed view cannot become an owned value without an explicit copy.

A `&str` is borrowed. A `String` owns its bytes on the heap. To convert, Rust must allocate new heap memory and copy the text. Both `.to_string()` and `String::from()` do this.

```rust
fn main() {
    let name: &str = "premium";
    let stored: String = name;
    println!("Stored plan: {}", stored);
}
```

**Use two approaches to make this compile. Do not add or remove any lines.**

<details>
<summary>Answer</summary>

Approach 1 `.to_string()`:

```rust
fn main() {
    let name: &str = "premium";
    let stored: String = name.to_string();
    println!("Stored plan: {}", stored);
}
```

Approach 2 `String::from()`:

```rust
fn main() {
    let name: &str = "premium";
    let stored: String = String::from(name);
    println!("Stored plan: {}", stored);
}
```

</details>

---

### Exercise 6 Displaying a Stored Plan as a Slice

This exercise tests converting `String` to `&str` by passing a reference. In a real contract, a stored plan name is a `String`, but a display helper only needs read-only access through a `&str`.

The code holds a `String` called `plan` and tries to pass it to a function that expects `&str`. Right now the `String` is passed directly, but the function wants a borrowed slice.

A reference to a `String` (`&plan`) can be automatically treated as a `&str` because the function only needs to read the bytes.

```rust
fn display_plan(name: &str) {
    println!("Active plan: {}", name);
}

fn main() {
    let plan = String::from("premium");
    display_plan(plan);
}
```

**Fix this without adding a new line.**

<details>
<summary>Answer</summary>

Pass `&plan` instead of `plan`. A reference to `String` coerces to `&str`.

```rust
fn display_plan(name: &str) {
    println!("Active plan: {}", name);
}

fn main() {
    let plan = String::from("premium");
    display_plan(&plan);
}
```

</details>

---

### Exercise 7 Extracting a Status Prefix

This exercise tests string slicing. In a real contract, you might extract a short prefix from a status string like `"active:user_123"` without copying the whole string.

The code tries to grab the first character of `status` using index `[0]`. Right now this fails because Rust does not allow direct string indexing.

Instead of an index, use a range slice like `&status[0..1]`. This creates a borrowed view from byte 0 up to (but not including) byte 1. The result is always a `&str`, even for a single byte.

```rust
fn main() {
    let status = String::from("active:user_123");
    let prefix = status[0];
    assert_eq!(prefix, "a");
}
```

**Modify this line to fix the error.**

<details>
<summary>Answer</summary>

Replace `status[0]` with `&status[0..1]`. The result is a borrowed `&str` slice.

```rust
fn main() {
    let status = String::from("active:user_123");
    let prefix = &status[0..1];
    assert_eq!(prefix, "a");
}
```

</details>

---

### Exercise 8 Slicing a Multi-Byte Region Code

This exercise tests UTF-8 byte slicing. In a real contract, a region label might contain multi-byte characters your slice must land on exact byte boundaries.

The code wants to extract the region name `"日本"` from a label. Right now the byte range is off.

UTF-8 stores ASCII in 1 byte, but many non-English characters use 3 bytes. The text `"region:"` is 7 ASCII bytes. `"日"` starts at byte 7 and spans 3 bytes. `"本"` starts at byte 10 and spans 3 bytes.

```rust
fn main() {
    let label = String::from("region:日本");
    let region = &label[7..12];
    assert_eq!(region, "日本");
}
```

**Modify the byte range so the slice returns `"日本"`.**

<details>
<summary>Answer</summary>

`"region:"` = 7 bytes. `"日"` = bytes 7-9. `"本"` = bytes 10-12. The full region spans bytes 7-13.

```rust
fn main() {
    let label = String::from("region:日本");
    let region = &label[7..13];
    assert_eq!(region, "日本");
}
```

</details>

---

**End of String vs &str.**
