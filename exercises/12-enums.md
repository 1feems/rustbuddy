# Practice - Enums

> Follows `EXERCISE-STYLE-GUIDE.md`

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

### Exercise 1 Declaring an Enum

This exercise tests defining an enum with variants that hold different data. In a real contract, a `PaymentMethod` enum might be `Card(String)` or `Wallet(String)` one type, many shapes.

A program models an IP address as either version 4 or version 6. Right now the enum definition is missing.

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

An enum needs explicit discriminators so `Basic` equals 5 and the rest follow automatically. Right now the variants have no numbers assigned.

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

A program converts an enum variant to its discriminator number. Right now the conversion line is wrong.

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

A program creates a `Move` variant with named `x` and `y` values. Right now the struct-like syntax is wrong.

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

An array holds three `Message` instances. Right now the array type annotation is missing and the compiler can't verify the types.

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

**End of Enums.**
