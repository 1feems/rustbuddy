# Practice - Enums

> DRAFT FOR REVIEW Follows `EXERCISE-STYLE-GUIDE.md`

Work through each exercise in the [Rust Playground](https://play.rust-lang.org).  
Read the explainer, paste the starter code, fix it, then move on.  
Check your answer only after you've tried.

---

## Quick reference

| Concept | What it means |
|---|---|
| `enum` | A custom type where only ONE value is active at a time. Think of a light switch: either ON or OFF, never both. |
| Variant | One of the possible values inside an enum. `On` and `Off` are variants of a `Switch` enum. |
| `EnumName::Variant` | Two colons (`::`) connect the enum name to the variant you picked. |
| Discriminator | A number Rust assigns to each variant (starting at 0). You can set your own too. |
| `match` | A way to say "if the value is this variant, do this; if it's that variant, do that." |
| `_` catch-all | An underscore arm in `match` that handles every variant you didn't name explicitly. |

---

## Track A - Generic Rust

---

### Exercise 1 Declaring an Enum

This exercise tests defining an enum with variants that hold different data. In a real contract, a `PaymentMethod` enum might be `Card(String)` or `Wallet(String)` one type, many shapes.

The code wants to model an IP address as either version 4 (four numbers) or version 6 (one text string). Right now the enum definition is missing.

An `enum` is a list of possible values, but only one can be active at a time. Each value is called a variant. Variants can hold extra data using tuples inside parentheses.

```rust
fn main() {
    let home = IpAddr::V4(127, 0, 0, 1);
    let loopback = IpAddr::V6(String::from("::1"));

    println!("{}, {}", home, loopback);
}
```

**Fill in the blank: define the `IpAddr` enum above `main` so it has two variants `V4` holding four `u8` values, and `V6` holding one `String`.**

<details>
<summary>Answer</summary>

```rust
enum IpAddr {
    V4(u8, u8, u8, u8),
    V6(String),
}

fn main() {
    let home = IpAddr::V4(127, 0, 0, 1);
    let loopback = IpAddr::V6(String::from("::1"));

    println!("{:?}, {:?}", home, loopback);
}
```

The enum has two variants. `V4` holds a tuple of four `u8` numbers. `V6` holds one `String`. You instantiate with `EnumName::VariantName(value)`.

</details>

---

### Exercise 2 Only One Variant at a Time

This exercise tests the rule that an enum instance holds exactly one variant. In a contract, a `SubscriptionStatus` is either `Active` or `Expired` it can't be both simultaneously.

The code tries to create an enum holding two active variants at the same time. Rust doesn't allow that.

In an enum, you pick ONE variant when you create it. That is the only value the instance holds. Think of it like picking a lane on a highway: you can only be in one lane at a time.

```rust
enum Direction {
    North,
    South,
    East,
    West,
}

fn main() {
    let way = Direction::North;
    println!("{:?}", way);
}
```

**Run this code as-is. Then change `North` to `South` and run again. Confirm that only one variant is active at a time.**

<details>
<summary>What's happening</summary>

An enum instance stores exactly one variant. Changing from `North` to `South` replaces the entire value. This is why enums are great for states that are mutually exclusive.

</details>

---

### Exercise 3 C-like Enums with Discriminators

This exercise tests assigning numeric values to enum variants. In a contract, you might number plan tiers as `Free = 0`, `Basic = 1`, `Premium = 2` so you can store the tier as a single number on-chain.

The code wants an enum where `Basic` starts at 5 and the others follow automatically. Right now the variants have no numbers assigned.

Discriminators are numbers Rust gives each variant. By default they start at 0. You can set a custom starting number the rest auto-increment from there. You can't use floating point numbers as discriminators.

```rust
enum Plan {
    Free,
    Basic,
    Premium,
}

fn main() {
    println!("Basic is {}", Plan::Basic as u8);
}
```

**Add explicit discriminators so `Basic` equals 5 and `Premium` equals 6. Run and confirm the output changes.**

<details>
<summary>Answer</summary>

```rust
enum Plan {
    Free,
    Basic = 5,
    Premium,
}

fn main() {
    println!("Basic is {}", Plan::Basic as u8);
    println!("Premium is {}", Plan::Premium as u8);
}
```

Setting `Basic = 5` makes `Premium` automatically 6. `Free` stays 0 because it comes before the custom start.

</details>

---

### Exercise 4 Converting a Variant to an Integer

This exercise tests using the `as` keyword to turn an enum variant into its underlying number. In a contract, you might store a plan tier as a raw `u8` to save space on-chain.

The code wants to convert `Message::Move` to its discriminator number. Right now the conversion line is wrong.

The `as` keyword casts a variant to its discriminator value. You write the variant name first, then `as`, then the number type you want.

```rust
enum Message {
    Quit,
    Move,
    Write,
}

fn main() {
    let m = Message::Move;
    let n = m as u8;
    println!("{}", n);
}
```

**Fix the line that converts `m` to an integer. Hint: you need `Message::` before the variant name in the cast expression.**

<details>
<summary>Answer</summary>

```rust
enum Message {
    Quit,
    Move,
    Write,
}

fn main() {
    let m = Message::Move;
    let n = Message::Move as u8;
    println!("{}", n);
}
```

The cast requires the full path `Message::Move as u8`. This returns 1 because discriminators start at 0 (`Quit` = 0, `Move` = 1).

</details>

---

### Exercise 5 Variants That Hold Different Data Shapes

This exercise tests enum variants with struct-like fields and tuple-like values living in the same enum. In a contract, a `Transaction` might be `Deposit { amount: u64 }`, `Withdraw(u64)`, or `Cancel` same enum, three shapes.

The code wants to instantiate the `Move` variant with `x` and `y` values. Right now the struct-like syntax is wrong.

An enum variant can hold data in different formats: no data at all, named fields like a struct, or unnamed values like a tuple. Struct-like variants use curly braces with field names. Tuple-like variants use parentheses.

```rust
enum Action {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

fn main() {
    let msg = Action::Move(1, 2);
    println!("{:?}", msg);
}
```

**Fix the line that creates `msg` so it uses struct-like syntax with field names `x` and `y`.**

<details>
<summary>Answer</summary>

```rust
enum Action {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

fn main() {
    let msg = Action::Move { x: 1, y: 2 };
    println!("{:?}", msg);
}
```

`Move` uses curly braces because it's defined with named fields. `Write` uses parentheses because it's defined with a tuple. The shape of the data must match the shape defined in the enum.

</details>

---

### Exercise 6 Array of Enum Instances

This exercise tests declaring an array where every element is an instance of the same enum type. In a contract, you might store a list of recent transactions that all share the same `Transaction` type.

The code wants an array holding three `Message` instances. Right now the array type annotation is missing and the compiler can't verify the types.

Array type annotations look like `[Type; count]`. Since every variant of an enum belongs to the same type, you can mix `Quit`, `Move`, and `Write` in one array.

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
}

fn main() {
    let msgs = [
        Message::Quit,
        Message::Move { x: 1, y: 2 },
        Message::Write(String::from("hello")),
    ];

    println!("Length: {}", msgs.len());
}
```

**Add the type annotation so `msgs` is declared as an array of exactly three `Message` values.**

<details>
<summary>Answer</summary>

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
}

fn main() {
    let msgs: [Message; 3] = [
        Message::Quit,
        Message::Move { x: 1, y: 2 },
        Message::Write(String::from("hello")),
    ];

    println!("Length: {}", msgs.len());
}
```

`[Message; 3]` tells Rust: this is an array of 3 elements, and every element is a `Message`. Different variants are fine because they all share the same `Message` type.

</details>

---

### Exercise 7 Pattern Matching with `match`

This exercise tests using `match` to extract data from an enum variant. In a contract, you might match on a `PaymentStatus` to decide whether to process, refund, or retry a payment.

The code wants to read the `x` and `y` values from a `Move` variant and print them. Right now the `match` arms are incomplete.

`match` compares a value against patterns. Each pattern names a variant. If the variant holds data, you can destructure it into variables inside the pattern.

```rust
enum Command {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
}

fn main() {
    let msg = Command::Move { x: 10, y: 20 };

    match msg {
        Command::Quit => println!("quitting"),
        Command::Move { x: a, y: b } => println!("{}, {}", a, b),
    }
}
```

**Add a third `match` arm for `Write` so the compiler doesn't complain about an uncovered variant. Don't remove the existing arms.**

<details>
<summary>Answer</summary>

```rust
enum Command {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
}

fn main() {
    let msg = Command::Move { x: 10, y: 20 };

    match msg {
        Command::Quit => println!("quitting"),
        Command::Move { x: a, y: b } => println!("{}, {}", a, b),
        Command::Write(text) => println!("writing: {}", text),
    }
}
```

The `Write(text)` arm destructures the `String` into a variable called `text`. Every variant must have a match arm, or you can use `_ => {}` as a catch-all.

</details>

---

### Exercise 8 Write Cold

No starter code. No hints. Write it from scratch.

Write a program that:

1. Declares an enum called `Shape` with three variants: `Circle` holding one `f64`, `Rectangle` holding two `f64`s, and `Nothing` holding no data.
2. In `main`, creates `s1` as `Shape::Circle(3.0)`.
3. Uses `match` to check `s1`. If it's a circle, print `Area candidate: 3.0`. If it's anything else, print `Not a circle`.

**Write the full program. Make sure it compiles and prints `Area candidate: 3.0`.**

<details>
<summary>Answer</summary>

```rust
enum Shape {
    Circle(f64),
    Rectangle(f64, f64),
    Nothing,
}

fn main() {
    let s1 = Shape::Circle(3.0);

    match s1 {
        Shape::Circle(radius) => println!("Area candidate: {}", radius),
        _ => println!("Not a circle"),
    }
}
```

`_ =>` is a catch-all arm that handles every variant you didn't name. This keeps `match` exhaustive even when you only care about one variant.

</details>

---

## Track B - Contract

All exercises below use the same concepts in a subscription-payment contract. The contract grows as we progress.

---

### Exercise 1 Declaring a Plan Enum

This exercise tests defining an enum with variants that hold different data. In a contract, a `Plan` enum lets a subscriber be on `Free`, `Basic(months)`, or `Premium(yearly_price)` one at a time, never overlapping.

The code wants to model a subscription plan with three tiers. Right now the enum definition is missing.

An `enum` is a list of possible values, but only one can be active at a time. Each value is called a variant. Variants can hold extra data to describe the variant more precisely.

```rust
fn main() {
    let user_plan = Plan::Premium(10_000_000);
    println!("{:?}", user_plan);
}
```

**Fill in the blank: define the `Plan` enum above `main` with three variants `Free`, `Basic(u8)`, and `Premium(u64)`.**

<details>
<summary>Answer</summary>

```rust
enum Plan {
    Free,
    Basic(u8),
    Premium(u64),
}

fn main() {
    let user_plan = Plan::Premium(10_000_000);
    println!("{:?}", user_plan);
}
```

`Premium(10_000_000)` stores 10 million lamports as its associated value. Only one variant is active, so a subscriber can't be both `Basic` and `Premium` at the same time.

</details>

---

### Exercise 2 Only One Plan at a Time

This exercise tests the rule that an enum instance holds exactly one variant. In a contract, a subscriber's status is either `Active` or `Expired` it can't be both.

The code declares a plan then tries to use it with another variant name. Rust rejects this because the instance is not that variant.

In an enum, you pick ONE variant when you create it. Think of it like a subscription tier selector on a website: the user can only pick one box at a time.

```rust
enum Plan {
    Free,
    Basic(u8),
    Premium(u64),
}

fn main() {
    let p = Plan::Basic(3);
    println!("Subscribed to Basic for 3 months");
}
```

**Run this code as-is. Then change `Basic(3)` to `Premium(10_000_000)` and run again. Confirm the program now prints the premium line.**

<details>
<summary>What's happening</summary>

An enum instance stores exactly one variant. Changing from `Basic(3)` to `Premium(10_000_000)` replaces the entire value. This prevents logical contradictions like a user being on two plans simultaneously.

</details>

---

### Exercise 3 Status Discriminators

This exercise tests assigning numeric values to enum variants. In a contract, you might store a payment status as a raw `u8` to save on-chain space.

The code wants `Pending` to have discriminator 10, `Confirmed` to be 11, and `Failed` to be 12.

Discriminators are numbers Rust gives each variant. By default they start at 0. You can set custom starting numbers and the rest auto-increment.

```rust
enum PaymentStatus {
    Pending,
    Confirmed,
    Failed,
}

fn main() {
    println!("Pending is {}", PaymentStatus::Pending as u8);
    println!("Confirmed is {}", PaymentStatus::Confirmed as u8);
}
```

**Add explicit discriminators so `Pending` equals 10. Run and confirm the outputs become 10, 11, and 12.**

<details>
<summary>Answer</summary>

```rust
enum PaymentStatus {
    Pending = 10,
    Confirmed,
    Failed,
}

fn main() {
    println!("Pending is {}", PaymentStatus::Pending as u8);
    println!("Confirmed is {}", PaymentStatus::Confirmed as u8);
    println!("Failed is {}", PaymentStatus::Failed as u8);
}
```

Setting `Pending = 10` makes `Confirmed` equal 11 and `Failed` equal 12 automatically. This is useful for encoding states as compact numbers.

</details>

---

### Exercise 4 Converting Payment Status to a Number

This exercise tests using `as` to turn an enum variant into its underlying number. In a contract, a facilitator checking an X402 payment might compare status codes.

The code wants to convert `PaymentStatus::Confirmed` to its underlying `u8` value. Right now the conversion line is wrong.

The `as` keyword casts a variant to its discriminator value. You need the full enum path, not just the variant name.

```rust
enum PaymentStatus {
    Pending,
    Confirmed,
    Failed,
}

fn main() {
    let status = PaymentStatus::Confirmed;
    let code = PaymentStatus::Confirmed as u8;
    println!("Raw status code: {}", code);
}
```

**Fix the line that creates `code` so it compiles and prints `1`.**

<details>
<summary>Answer</summary>

```rust
enum PaymentStatus {
    Pending,
    Confirmed,
    Failed,
}

fn main() {
    let status = PaymentStatus::Confirmed;
    let code = PaymentStatus::Confirmed as u8;
    println!("Raw status code: {}", code);
}
```

`PaymentStatus::Confirmed as u8` is the correct syntax. Without `PaymentStatus::`, Rust doesn't know which enum the variant belongs to.

</details>

---

### Exercise 5 Payment Event Variants with Different Data

This exercise tests enum variants with struct-like fields and tuple-like values together. In a contract, a `PaymentEvent` might be `Created { amount: u64 }`, `Processed(u64)`, or `Cancelled`.

The code wants to instantiate `Created` with an amount of `5_000_000`. Right now it uses tuple syntax instead of struct-like syntax.

An enum variant can hold data in different formats: no data, named fields like a struct, or unnamed values like a tuple. The syntax you use to create it must match the syntax used in the definition.

```rust
enum PaymentEvent {
    Created { amount: u64 },
    Processed(u64),
    Cancelled,
}

fn main() {
    let event = PaymentEvent::Created(5_000_000);
    println!("{:?}", event);
}
```

**Fix the line that creates `event` so it uses named-field syntax with `amount`.**

<details>
<summary>Answer</summary>

```rust
enum PaymentEvent {
    Created { amount: u64 },
    Processed(u64),
    Cancelled,
}

fn main() {
    let event = PaymentEvent::Created { amount: 5_000_000 };
    println!("{:?}", event);
}
```

`Created` uses curly braces because it's defined with named fields. `Processed` uses parentheses because it's defined with a tuple. The shapes must match.

</details>

---

### Exercise 6 Array of Payment Events

This exercise tests declaring an array where every element is the same enum type. In a contract, you might store a history of recent payment events to show in a dashboard.

The code wants an array holding three `PaymentEvent` instances. Right now the type annotation is missing.

Array type annotations look like `[Type; count]`. Every variant of an enum belongs to the same type, so you can mix `Created`, `Processed`, and `Cancelled` in one array.

```rust
enum PaymentEvent {
    Created { amount: u64 },
    Processed(u64),
    Cancelled,
}

fn main() {
    let history = [
        PaymentEvent::Created { amount: 1_000_000 },
        PaymentEvent::Processed(1_000_000),
        PaymentEvent::Cancelled,
    ];

    println!("Events: {}", history.len());
}
```

**Add the type annotation so `history` is an array of exactly three `PaymentEvent` values.**

<details>
<summary>Answer</summary>

```rust
enum PaymentEvent {
    Created { amount: u64 },
    Processed(u64),
    Cancelled,
}

fn main() {
    let history: [PaymentEvent; 3] = [
        PaymentEvent::Created { amount: 1_000_000 },
        PaymentEvent::Processed(1_000_000),
        PaymentEvent::Cancelled,
    ];

    println!("Events: {}", history.len());
}
```

`[PaymentEvent; 3]` tells Rust: array of 3 elements, each a `PaymentEvent`. Different variants are fine because they all share the same `PaymentEvent` type.

</details>

---

### Exercise 7 Matching Payment Events

This exercise tests using `match` to decide what to do with each event variant. In a contract, matching on a `PaymentEvent` tells you whether to update balances, log a success, or send a refund.

The code wants to extract the `amount` from a `Created` event and print it. Right now the `match` arms only handle `Processed`.

`match` compares a value against patterns. Each pattern names a variant. If the variant holds data, you can destructure it into variables.

```rust
enum PaymentEvent {
    Created { amount: u64 },
    Processed(u64),
    Cancelled,
}

fn main() {
    let event = PaymentEvent::Created { amount: 7_500_000 };

    match event {
        PaymentEvent::Processed(fee) => println!("Processed: {}", fee),
    }
}
```

**Add `match` arms for `Created` and `Cancelled` so the program compiles. For `Created`, print the amount. For `Cancelled`, print `Payment cancelled`.**

<details>
<summary>Answer</summary>

```rust
enum PaymentEvent {
    Created { amount: u64 },
    Processed(u64),
    Cancelled,
}

fn main() {
    let event = PaymentEvent::Created { amount: 7_500_000 };

    match event {
        PaymentEvent::Created { amount: a } => println!("Created: {}", a),
        PaymentEvent::Processed(fee) => println!("Processed: {}", fee),
        PaymentEvent::Cancelled => println!("Payment cancelled"),
    }
}
```

Every variant must have a match arm. `amount: a` destructures the `amount` field into a variable called `a`. `_ => {}` could also handle `Cancelled` as a catch-all.

</details>

---

### Exercise 8 Write Cold

No starter code. No hints. Write it from scratch.

A contract needs to check what kind of payment was received. Write a program that:

1. Declares an enum called `Payment` with three variants: `Sol(amount: u64)`, `Card(last_four: String)`, and `None`.
2. In `main`, creates `p1` as `Payment::Sol { amount: 5_000_000 }`.
3. Uses `match` on `p1`. If it's a `Sol` payment, print `Received 5000000 lamports`. If it's anything else, print `Other payment method`.

**Write the full program. Make sure it compiles and prints the right message.**

<details>
<summary>Answer</summary>

```rust
enum Payment {
    Sol { amount: u64 },
    Card(String),
    None,
}

fn main() {
    let p1 = Payment::Sol { amount: 5_000_000 };

    match p1 {
        Payment::Sol { amount } => println!("Received {} lamports", amount),
        _ => println!("Other payment method"),
    }
}
```

`_ =>` is a catch-all arm that handles every variant you didn't name. This is useful when you only care about one specific case in a contract.

</details>

---

## What's next

These enums grow naturally into `Option` (Section 9), which is just an enum with two special variants: `Some(value)` and `None`. The `match` skills you practiced here are exactly what you need to handle `Option` safely.
