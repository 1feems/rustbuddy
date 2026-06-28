# Practice - Structs

> DRAFT FOR REVIEW - Follows `EXERCISE-STYLE-GUIDE.md`

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

## Track A - Generic Rust

---

### Exercise 1 - Instantiating a Struct

This exercise tests struct definition and instantiation. In a contract, a `Subscriber` struct is the template that groups a wallet, a plan, and an amount into one named record.

The code wants to create a `User` instance with concrete values for every field. Right now three fields are blank.

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

The code wants to change the email field after creating the user. Right now the code fails because the instance is immutable.

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

The code wants a function `build_user()` that returns a `User`, using shorthand where the argument names match the field names. Right now the return type and two shorthand fields are blank.

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

The code wants to create `user2` based on `user1`, but with a different email. Right now the update syntax is missing.

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

The code wants to define a `Color` tuple struct with three `i32` values, then instantiate it and print the second element. Right now the types in the struct definition are blank.

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

The code wants to define a unit-like struct called `Placeholder`. Right now the definition is missing.

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

### Exercise 7 - Deriving Debug to Print a Struct

This exercise tests deriving the `Debug` trait so a struct can be printed. In a contract, you often need to log a record for debugging, and `#[derive(Debug)]` makes that possible.

The code wants to print a `Rectangle` using debug formatting and assign `width` as `30 * scale`. Right now the derive attribute is missing, the width blank is empty, and the format placeholder is missing.

Rust cannot print a struct with normal `println!` unless you derive the `Debug` trait. Once you add `#[derive(Debug)]` above the struct, you can use `{:?}` in the format string.

```rust
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let scale = 2;
    let rect1 = Rectangle {
        width: ___,
        height: 50,
    };

    println!("___", rect1);
}
```

**Add the derive attribute above the struct, fill in the width blank with `30 * scale`, and fill in the format placeholder with the debug notation. Do not remove any lines.**

#### Expected output

```
Rectangle { width: 60, height: 50 }
```

<details>
<summary>Answer</summary>

Add `#[derive(Debug)]` above `struct Rectangle`. Set `width: 30 * scale` and use `{:?}` in the format string.

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let scale = 2;
    let rect1 = Rectangle {
        width: 30 * scale,
        height: 50,
    };

    println!("{:?}", rect1);
}
```

</details>

---

### Exercise 8 - Fixing a Partial Move

This exercise tests partial moves. In a contract, if you move one field out of a struct record, the whole record becomes invalid unless you clone the field instead.

The code moves `user1.username` into `name`, then tries to use `user1` afterward. Right now it fails because a partial move happened.

When one field of a struct is moved to a new owner, the parent struct cannot be used as a whole afterward. To keep the struct usable, clone the field so the original stays intact.

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

    let name = user1.username;
    println!("Name: {}", name);
    println!("User1 active: {}", user1.active);
}
```

**Fix the code so you can still access `user1.active` after moving the username out. Do not remove any lines.**

#### Expected output

```
Name: alice
User1 active: true
```

<details>
<summary>Answer</summary>

Clone the field to avoid the partial move.

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

    let name = user1.username.clone();
    println!("Name: {}", name);
    println!("User1 active: {}", user1.active);
}
```

</details>

---

## Track B - Contract

All exercises below apply the same struct concepts to a subscription payment contract. The same Rust rules different clothes.

---

### Exercise 1 - Instantiating a Subscription Struct

This exercise tests struct definition and instantiation. In a contract, a `Subscription` struct is the template that groups a wallet, a plan, and an amount into one named record.

The code wants to create a `Subscription` instance with concrete values for every field. Right now two fields are blank.

A struct is a custom compound type that groups values of different types into named fields. It must be instantiated with real data the struct itself is just the template.

```rust
struct Subscription {
    active: bool,
    plan: String,
    wallet: String,
    amount: u64,
}

fn main() {
    let sub = Subscription {
        active: ___,
        plan: String::from("basic"),
        wallet: String::from("wallet_abc"),
        amount: ___,
    };
    println!("Subscription created");
}
```

**Fill in all blanks with concrete values so the struct is fully instantiated.**

#### Expected output

```
Subscription created
```

> Common mistake: Keep the quote marks around strings like `"basic"`. Without quotes, Rust thinks you are naming a variable.

<details>
<summary>Answer</summary>

Provide a boolean and a `u64`.

```rust
struct Subscription {
    active: bool,
    plan: String,
    wallet: String,
    amount: u64,
}

fn main() {
    let sub = Subscription {
        active: true,
        plan: String::from("basic"),
        wallet: String::from("wallet_abc"),
        amount: 5_000_000,
    };
    println!("Subscription created");
}
```

</details>

---

### Exercise 2 - Upgrading a Plan with a Mutable Struct

This exercise tests explicit mutability on a struct instance. In a contract, changing a subscriber's plan requires mutating a field but Rust only allows that if the whole instance is declared mutable.

The code wants to upgrade the plan after creating the subscription. Right now it fails because the instance is immutable.

To mutate any field, the entire struct instance must be declared with `let mut`. Rust does not allow marking individual fields as mutable.

```rust
struct Subscription {
    active: bool,
    plan: String,
    wallet: String,
    amount: u64,
}

fn main() {
    let sub = Subscription {
        active: true,
        plan: String::from("basic"),
        wallet: String::from("wallet_abc"),
        amount: 5_000_000,
    };

    sub.plan = String::from("premium");
    println!("Plan: {}", sub.plan);
}
```

**Fix the code by modifying one line so the struct instance can be mutated. Do not add or remove any other lines.**

#### Expected output

```
Plan: premium
```

<details>
<summary>Answer</summary>

Change `let sub` to `let mut sub`.

```rust
struct Subscription {
    active: bool,
    plan: String,
    wallet: String,
    amount: u64,
}

fn main() {
    let mut sub = Subscription {
        active: true,
        plan: String::from("basic"),
        wallet: String::from("wallet_abc"),
        amount: 5_000_000,
    };

    sub.plan = String::from("premium");
    println!("Plan: {}", sub.plan);
}
```

</details>

---

### Exercise 3 - Building a Subscription with a Helper Function

This exercise tests functions that return struct instances and the shorthand field init syntax. In a contract, a `build_subscription` helper creates a record from arguments without repeating field names.

The code wants a function `build_subscription()` that returns a `Subscription`, using shorthand where argument names match field names. Right now the return type and two shorthand fields are blank.

If a variable or argument has the same name as a struct field, you can write the field name once instead of `field: field`. A function can create and return a struct instance the same way you create one in `main`.

```rust
struct Subscription {
    active: bool,
    plan: String,
    wallet: String,
    amount: u64,
}

fn build_subscription(wallet: String, plan: String, amount: u64) -> ___ {
    Subscription {
        active: true,
        ___: wallet,
        ___: plan,
        amount,
    }
}

fn main() {
    let sub = build_subscription(String::from("wallet_xyz"), String::from("premium"), 10_000_000);
    println!("Plan: {}", sub.plan);
}
```

**Fill in the return type and the two field names using shorthand syntax.**

#### Expected output

```
Plan: premium
```

<details>
<summary>Answer</summary>

The return type is `Subscription`. The matching fields are `wallet` and `plan`.

```rust
struct Subscription {
    active: bool,
    plan: String,
    wallet: String,
    amount: u64,
}

fn build_subscription(wallet: String, plan: String, amount: u64) -> Subscription {
    Subscription {
        active: true,
        wallet,
        plan,
        amount,
    }
}

fn main() {
    let sub = build_subscription(String::from("wallet_xyz"), String::from("premium"), 10_000_000);
    println!("Plan: {}", sub.plan);
}
```

</details>

---

### Exercise 4 - Upgrading a Subscription with Update Syntax

This exercise tests struct update syntax: creating a new instance from an existing one while changing only some fields. In a contract, you might create an upgraded subscription by copying most fields from the original and changing just the plan and amount.

The code wants to create `upgraded` based on `original`, but with a new plan and amount. Right now the update syntax is missing.

Struct update syntax lets you say `..original` at the end of a struct literal. Rust copies all remaining fields from the original instance into the new one.

```rust
struct Subscription {
    active: bool,
    plan: String,
    wallet: String,
    amount: u64,
}

fn main() {
    let original = Subscription {
        active: true,
        plan: String::from("basic"),
        wallet: String::from("wallet_abc"),
        amount: 5_000_000,
    };

    let upgraded = Subscription {
        plan: String::from("premium"),
        amount: 10_000_000,
        ___,
    };

    println!("Upgraded plan: {}", upgraded.plan);
}
```

**Fill in the blank to copy all remaining fields from `original`.**

#### Expected output

```
Upgraded plan: premium
```

<details>
<summary>Answer</summary>

Use `..original` to fill in the rest.

```rust
struct Subscription {
    active: bool,
    plan: String,
    wallet: String,
    amount: u64,
}

fn main() {
    let original = Subscription {
        active: true,
        plan: String::from("basic"),
        wallet: String::from("wallet_abc"),
        amount: 5_000_000,
    };

    let upgraded = Subscription {
        plan: String::from("premium"),
        amount: 10_000_000,
        ..original
    };

    println!("Upgraded plan: {}", upgraded.plan);
}
```

</details>

---

### Exercise 5 - Using a Tuple Struct for a Coordinate

This exercise tests tuple structs. In a contract, a `Coordinate` tuple struct might store a `(balance, nonce)` pair as a named type.

The code wants to define a `Coordinate` tuple struct with two `u64` values, instantiate it, and print the first element. Right now the types are blank.

A tuple struct uses tuple-like syntax. It is instantiated with parentheses and accessed with dot indexing.

```rust
struct Coordinate(___, ___);

fn main() {
    let point = Coordinate(1_000_000, 42);
    println!("Balance: {}", point.0);
}
```

**Fill in the two field types in the tuple struct definition.**

#### Expected output

```
Balance: 1000000
```

<details>
<summary>Answer</summary>

Both fields are `u64`.

```rust
struct Coordinate(u64, u64);

fn main() {
    let point = Coordinate(1_000_000, 42);
    println!("Balance: {}", point.0);
}
```

</details>

---

### Exercise 6 - Defining a Unit-Like Struct for Events

This exercise tests unit-like structs. In a contract, a unit-like struct might act as a marker type for a trait or a payment-processed event.

The code wants to define a unit-like struct called `PaymentProcessed`. Right now the definition is missing.

A unit-like struct has no fields. It is mainly used when working with traits.

```rust
struct ___;

fn main() {
    let _event = PaymentProcessed;
    println!("Event placeholder created");
}
```

**Fill in the blank to declare a unit-like struct called `PaymentProcessed`.**

#### Expected output

```
Event placeholder created
```

<details>
<summary>Answer</summary>

```rust
struct PaymentProcessed;

fn main() {
    let _event = PaymentProcessed;
    println!("Event placeholder created");
}
```

</details>

---

### Exercise 7 - Deriving Debug to Print a Subscription Record

This exercise tests deriving the `Debug` trait so a struct can be printed. In a contract, logging a subscription record for debugging requires `#[derive(Debug)]`.

The code wants to print a `Subscription` using debug formatting. Right now the derive attribute is missing and the format placeholder is blank.

Rust cannot print a struct with normal `println!` unless you derive the `Debug` trait. Once added, you can use `{:?}` in the format string.

```rust
struct Subscription {
    active: bool,
    plan: String,
    wallet: String,
    amount: u64,
}

fn main() {
    let sub = Subscription {
        active: true,
        plan: String::from("premium"),
        wallet: String::from("wallet_abc"),
        amount: 10_000_000,
    };

    println!("___", sub);
}
```

**Add the derive attribute above the struct, and fill in the format placeholder to print debug info. Do not remove any lines.**

#### Expected output

```
Subscription { active: true, plan: "premium", wallet: "wallet_abc", amount: 10000000 }
```

<details>
<summary>Answer</summary>

Add `#[derive(Debug)]` above the struct and use `{:?}` in the format string.

```rust
#[derive(Debug)]
struct Subscription {
    active: bool,
    plan: String,
    wallet: String,
    amount: u64,
}

fn main() {
    let sub = Subscription {
        active: true,
        plan: String::from("premium"),
        wallet: String::from("wallet_abc"),
        amount: 10_000_000,
    };

    println!("{:?}", sub);
}
```

</details>

---

### Exercise 8 - Fixing a Partial Move in a Subscription Record

This exercise tests partial moves. In a contract, if you move the wallet string out of a subscriber record, the whole record becomes invalid unless you clone the field instead.

The code moves `sub.wallet` into `wallet_copy`, then tries to use `sub` afterward. Right now it fails because a partial move happened.

When one field of a struct is moved to a new owner, the parent struct cannot be used as a whole afterward. To keep the struct usable, clone the field so the original stays intact.

```rust
struct Subscription {
    active: bool,
    plan: String,
    wallet: String,
    amount: u64,
}

fn main() {
    let sub = Subscription {
        active: true,
        plan: String::from("premium"),
        wallet: String::from("wallet_abc"),
        amount: 10_000_000,
    };

    let wallet_copy = sub.wallet;
    println!("Wallet: {}", wallet_copy);
    println!("Plan: {}", sub.plan);
}
```

**Fix the code so you can still access `sub.plan` after moving the wallet out. Do not remove any lines.**

#### Expected output

```
Wallet: wallet_abc
Plan: premium
```

<details>
<summary>Answer</summary>

Clone the field to avoid the partial move.

```rust
struct Subscription {
    active: bool,
    plan: String,
    wallet: String,
    amount: u64,
}

fn main() {
    let sub = Subscription {
        active: true,
        plan: String::from("premium"),
        wallet: String::from("wallet_abc"),
        amount: 10_000_000,
    };

    let wallet_copy = sub.wallet.clone();
    println!("Wallet: {}", wallet_copy);
    println!("Plan: {}", sub.plan);
}
```

</details>

---

**End of Structs.**
