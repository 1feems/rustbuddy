# Practice - Structs

> Source for `structs.html` — follows `_docs/STYLE-GUIDE.md` and `_docs/EXERCISE-PAGE-DESIGN.md`

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
| struct | A custom compound type that groups values of different types under named fields. |
| Dot notation | Access a field with `instance.field_name`. |
| `let mut` | The whole struct must be mutable to change any field. Rust does not allow single-field mutability. |
| Shorthand | When a variable name matches a field name, write it once: `field_name` instead of `field_name: field_name`. |
| `..instance` | Struct update syntax: copy all remaining fields from another instance. |
| Tuple struct | A named tuple: `struct Color(i32, i32, i32);` instantiated with parentheses. |
| Unit-like struct | A struct with no fields, mainly used with traits. |
| `#[derive(Debug)]` | An attribute that lets you print a struct with `{:?}`. |
| Partial move | Moving one field out of a struct invalidates the whole struct afterward. |

---

### Exercise 1 - Instantiating a Struct

A `User` struct needs to be instantiated with concrete values. Right now three fields are blank.

A struct is a custom compound type that groups values of different types under named fields. It is similar to a tuple, but each value has a name so you can access it later. The struct itself is just a template — you must instantiate it with real data to create a usable record.

```rust
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

fn main() {
    let user1 = User {
        active: ___,
        username: ___,
        email: String::from("alice@example.com"),
        sign_in_count: ___,
    };
    println!("User created");
}
```

**Fill in all three blanks with concrete values so the struct is fully instantiated.**

#### Expected output

```
User created
```

> Common mistake: Keep the quote marks around string values like `"alice"`. Without quotes, Rust thinks you are naming a variable, not writing text.

<details>
<summary>Answer</summary>

```rust
struct User {               // ① the struct definition is the template — it declares field names and types, not values
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

fn main() {
    let user1 = User {
        active: true,                           // ② bool field — true or false
        username: String::from("alice"),        // ③ String field — must be an owned String, not a &str literal
        email: String::from("alice@example.com"), // ④ already provided — shows the correct pattern
        sign_in_count: 1,                       // ⑤ u64 field — an unsigned 64-bit integer
    };
    println!("User created"); // ⑥ user1 is fully instantiated and valid
}
```

**Why:** A struct definition is just a blueprint — it defines what fields exist and what types they hold. To use a struct, you instantiate it by providing a concrete value for every field. Field values must match the declared types exactly: a `bool` field needs `true` or `false`, a `String` field needs an owned `String`.

</details>

---

### Exercise 2 - Making a Struct Mutable

A struct field needs to change after the instance is created. Right now it fails because the instance is immutable.

To mutate a field, you must make the entire struct instance mutable with `let mut`. Rust does not allow you to mark only some fields as mutable.

```rust
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

fn main() {
    let user1 = User {
        active: true,
        username: String::from("alice"),
        email: String::from("alice@example.com"),
        sign_in_count: 1,
    };

    user1.email = String::from("new@example.com");
    println!("Email: {}", user1.email);
}
```

**Fix the code by modifying one line so the struct instance can be mutated. Do not add or remove any other lines.**

#### Expected output

```
Email: new@example.com
```

<details>
<summary>Answer</summary>

```rust
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

fn main() {
    let mut user1 = User {               // ① mut makes the entire struct instance mutable — Rust does not allow per-field mutability
        active: true,
        username: String::from("alice"),
        email: String::from("alice@example.com"),
        sign_in_count: 1,
    };

    user1.email = String::from("new@example.com"); // ② dot notation assigns a new value to the email field — only valid because user1 is mut
    println!("Email: {}", user1.email);            // ③ prints the updated field value
}
```

**Why:** In Rust, mutability applies to the entire binding, not individual fields. If you need to change any field, the whole struct instance must be declared `mut`. This keeps the ownership model simple — there is no partial mutability to track.

</details>

---

### Exercise 3 - Building a Struct with Shorthand Syntax

A function creates and returns a `User` using shorthand field syntax. Right now the return type and two shorthand fields are blank.

If a variable or argument has the same name as a struct field, you can write the field name once instead of `field: field`. A function can create and return a struct instance the same way you create one in `main`.

```rust
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

fn build_user(email: String, username: String) -> ___ {
    User {
        active: true,
        ___: email,
        ___: username,
        sign_in_count: 1,
    }
}

fn main() {
    let user = build_user(String::from("bob@example.com"), String::from("bob"));
    println!("User: {}", user.username);
}
```

**Fill in the return type and the two field names using shorthand syntax.**

#### Expected output

```
User: bob
```

<details>
<summary>Answer</summary>

```rust
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

fn build_user(email: String, username: String) -> User { // ① the return type is User — this function constructs and returns a struct instance
    User {
        active: true,
        email,    // ② shorthand: the parameter name matches the field name, so you write it once instead of email: email
        username, // ③ shorthand: same pattern — username parameter fills the username field
        sign_in_count: 1,
    }
}

fn main() {
    let user = build_user(String::from("bob@example.com"), String::from("bob")); // ④ calls the builder function — ownership of both Strings moves into build_user
    println!("User: {}", user.username); // ⑤ user now owns the returned struct — accesses the username field with dot notation
}
```

**Why:** Shorthand field initialization removes repetition when a variable name matches a field name. Instead of `email: email`, you write `email` once. The compiler knows you mean the field and the variable share the same name. This is especially useful in builder functions where argument names are chosen to match field names.

</details>

---

### Exercise 4 - Updating a Struct with Struct Update Syntax

A new `User` is created from an existing one with a different email. Right now the struct update syntax is missing.

Struct update syntax lets you say `..user1` at the end of a struct literal. Rust copies all remaining fields from `user1` into the new instance.

```rust
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

fn main() {
    let user1 = User {
        active: true,
        username: String::from("alice"),
        email: String::from("alice@example.com"),
        sign_in_count: 1,
    };

    let user2 = User {
        email: String::from("new@example.com"),
        ___,
    };

    println!("User2 email: {}", user2.email);
}
```

**Fill in the blank to copy all remaining fields from `user1`.**

#### Expected output

```
User2 email: new@example.com
```

<details>
<summary>Answer</summary>

```rust
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

fn main() {
    let user1 = User {                              // ① user1 is the source instance
        active: true,
        username: String::from("alice"),
        email: String::from("alice@example.com"),
        sign_in_count: 1,
    };

    let user2 = User {
        email: String::from("new@example.com"), // ② the new value — overrides the email field from user1
        ..user1                                  // ③ struct update syntax — copies active, username, and sign_in_count from user1; moves username because String does not implement Copy
    };

    println!("User2 email: {}", user2.email); // ④ user2.email is the new value — all other fields came from user1
}
```

**Why:** Struct update syntax `..user1` copies all fields not explicitly set in the new struct. Fields with `Copy` types (like `bool` and `u64`) are copied cheaply. Fields with non-`Copy` types (like `String`) are moved — which means `user1.username` becomes invalid after this. Only specify what changes; let `..` fill in the rest.

</details>

---

### Exercise 5 - Defining a Tuple Struct

A `Color` tuple struct holds three `i32` values. Right now the types in the struct definition are blank.

A tuple struct looks like a normal struct but uses tuple-like syntax for its fields. It is instantiated with parentheses instead of curly braces, and you access values with dot indexing.

```rust
struct Color(___, ___, ___);

fn main() {
    let c = Color(0, 127, 255);
    println!("Green: {}", c.1);
}
```

**Fill in the three field types in the tuple struct definition.**

#### Expected output

```
Green: 127
```

<details>
<summary>Answer</summary>

```rust
struct Color(i32, i32, i32); // ① tuple struct definition — the types go inside parentheses, no field names, just types in order

fn main() {
    let c = Color(0, 127, 255); // ② instantiate with parentheses, like calling a function — values match the declared types in order
    println!("Green: {}", c.1); // ③ dot-index access — c.0 is red (0), c.1 is green (127), c.2 is blue (255)
}
```

**Why:** A tuple struct gives a name to a tuple, making it a distinct type. `Color(i32, i32, i32)` and `Point(i32, i32, i32)` are different types even though they hold the same data — the compiler treats them as separate. Use tuple structs when the name adds meaning but individual field names would be unnecessary.

</details>

---

### Exercise 6 - Defining a Unit-Like Struct

A unit-like struct needs to be defined. Right now the definition is missing.

A unit-like struct has no fields. It does not hold any values. It is mainly used when working with traits — to attach behavior to a type without storing any data.

```rust
struct ___;

fn main() {
    let _ = Placeholder;
    println!("Placeholder created");
}
```

**Fill in the blank to declare a unit-like struct called `Placeholder`.**

#### Expected output

```
Placeholder created
```

<details>
<summary>Answer</summary>

```rust
struct Placeholder; // ① unit-like struct — no fields, no braces, just a name and a semicolon

fn main() {
    let _ = Placeholder; // ② instantiate with just the name, no parentheses or braces — there are no values to provide
    println!("Placeholder created"); // ③ the struct exists as a type even though it holds no data
}
```

**Why:** A unit-like struct is a type with no data. It takes zero bytes of memory. Its main use is with traits — you can implement behavior on it without storing any state. In contract code, unit-like structs are often used as markers or event types to signal that something happened.

</details>

---

**End of Structs.**
