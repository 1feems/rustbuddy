# Practice - Structs

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

This exercise tests struct definition and instantiation. In a contract, a `Subscriber` struct is the template that groups a wallet, a plan, and an amount into one named record.

A `User` struct needs to be instantiated with concrete values. Right now three fields are blank.

A struct is a custom compound type that groups values of different types under named fields. It's similar to a tuple, but each value has a name so you can access it later. The struct itself is just a template you must instantiate it with real data to create a usable record.

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

Provide a boolean, a `String`, and a `u64`.

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
    println!("User created");
}
```

</details>

---

### Exercise 2 - Making a Struct Mutable

This exercise tests explicit mutability on a struct instance. In a contract, upgrading a subscriber's plan requires changing a field but Rust only allows that if the whole instance is declared mutable.

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

Change `let user1` to `let mut user1`.

```rust
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

fn main() {
    let mut user1 = User {
        active: true,
        username: String::from("alice"),
        email: String::from("alice@example.com"),
        sign_in_count: 1,
    };

    user1.email = String::from("new@example.com");
    println!("Email: {}", user1.email);
}
```

</details>

---

### Exercise 3 - Building a Struct with Shorthand Syntax

This exercise tests functions that return struct instances and the shorthand field init syntax. In a contract, a helper like `build_subscriber` creates a record from arguments without repeating field names.

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

> Common mistake: In struct initialization, `:` separates the field name from its value. Don't confuse it with `=` you're inside the struct body, not doing a variable assignment.

<details>
<summary>Answer</summary>

The return type is `User`. The field names that match the arguments are `email` and `username`.

```rust
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

fn build_user(email: String, username: String) -> User {
    User {
        active: true,
        email,
        username,
        sign_in_count: 1,
    }
}

fn main() {
    let user = build_user(String::from("bob@example.com"), String::from("bob"));
    println!("User: {}", user.username);
}
```

</details>

---

### Exercise 4 - Updating a Struct with Struct Update Syntax

This exercise tests struct update syntax: creating a new instance from an existing one while changing only some fields. In a contract, you might create an upgraded subscription by copying most fields from the original and changing just the plan.

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

Use `..user1` to fill in the rest.

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
        ..user1
    };

    println!("User2 email: {}", user2.email);
}
```

</details>

---

### Exercise 5 - Defining a Tuple Struct

This exercise tests tuple structs: named tuples that are instantiated with parentheses and accessed with dot notation. In a contract, a `Color` tuple struct might store RGB values for a UI badge.

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

The fields are all `i32`.

```rust
struct Color(i32, i32, i32);

fn main() {
    let c = Color(0, 127, 255);
    println!("Green: {}", c.1);
}
```

</details>

---

### Exercise 6 - Defining a Unit-Like Struct

This exercise tests unit-like structs: structs with no fields. In a contract, a unit-like struct might act as a marker type for a trait or event.

A unit-like struct needs to be defined. Right now the definition is missing.

A unit-like struct has no fields. It doesn't hold any values. It is mainly used when working with traits.

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

A unit-like struct is written with the name followed by a semicolon and no braces.

```rust
struct Placeholder;

fn main() {
    let _ = Placeholder;
    println!("Placeholder created");
}
```

</details>


---

**End of Structs.**
