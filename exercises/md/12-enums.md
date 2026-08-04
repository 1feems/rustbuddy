# Practice - Enums

> Source for `enums.html` — follows `_docs/STYLE-GUIDE.md` and `_docs/EXERCISE-PAGE-DESIGN.md`

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

A program models an IP address as either version 4 or version 6. Right now the enum definition is missing.

An `enum` is a list of possible values, but only one can be active at a time. Each value is called a variant. Variants can hold extra data using tuples inside parentheses.

```rust
fn main() {
    let home = IpAddr::V4(127, 0, 0, 1);
    let loopback = IpAddr::V6(String::from("::1"));

    println!("{:?}, {:?}", home, loopback);
}
```

**Fill in the blank: define the `IpAddr` enum above `main` so it has two variants — `V4` holding four `u8` values, and `V6` holding one `String`.**

<details>
<summary>Answer</summary>

```rust
#[derive(Debug)]
enum IpAddr {
    V4(u8, u8, u8, u8), // ① V4 variant holds four u8 values — each octet of an IPv4 address stored as a tuple inside the variant
    V6(String),          // ② V6 variant holds one String — the full IPv6 address as text
}

fn main() {
    let home = IpAddr::V4(127, 0, 0, 1);           // ③ EnumName::Variant syntax creates a V4 instance — the four u8 values are stored inside
    let loopback = IpAddr::V6(String::from("::1")); // ④ creates a V6 instance — the String is stored inside the variant
    println!("{:?}, {:?}", home, loopback);          // ⑤ {:?} uses the Debug trait to print both enum instances
}
```

**Why:** An enum defines a type that can be one of several named forms. Each variant can optionally hold data — and the data shape can differ between variants. `V4` holds four numbers while `V6` holds a string, but both are the same `IpAddr` type. This lets you represent different kinds of data under one unified type.

</details>

---

### Exercise 2 Only One Variant at a Time

This code already compiles. Run it and make sure you understand why an enum instance holds exactly one variant at a time.

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

```rust
#[derive(Debug)]
enum Direction {
    North, // ① one of four possible variants — this enum can only ever be one of these at a time
    South,
    East,
    West,
}

fn main() {
    let way = Direction::North; // ② way holds exactly one variant — North — and nothing else
    println!("{:?}", way);      // ③ changing North to South replaces the entire value — way cannot hold two directions at once
}
```

**Why:** An enum instance stores exactly one variant. Changing from `North` to `South` replaces the entire value — you are not adding to it. This mutual exclusivity makes enums ideal for representing states like subscription status (`Active` or `Expired`) where only one can be true at a time.

</details>

---

### Exercise 3 C-like Enums with Discriminators

An enum needs explicit discriminators so `Basic` equals 5 and the rest follow automatically. Right now the variants have no numbers assigned.

Discriminators are numbers Rust gives each variant. By default they start at 0. You can set a custom starting number — the rest auto-increment from there.

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
    Free,      // ① no explicit discriminator — Free stays at 0 because it comes before the custom start
    Basic = 5, // ② explicit discriminator set to 5 — overrides the default sequence starting here
    Premium,   // ③ no explicit discriminator — auto-increments from Basic, so Premium = 6
}

fn main() {
    println!("Basic is {}", Plan::Basic as u8);     // ④ as u8 casts the variant to its discriminator value — prints 5
    println!("Premium is {}", Plan::Premium as u8); // ⑤ Premium auto-incremented from Basic — prints 6
}
```

**Why:** C-like enums assign a number to each variant. Setting one explicitly changes where the sequence starts from that point. This pattern is used when you need to store a plan tier or status as a single compact number — useful for on-chain storage where every byte counts.

</details>

---

### Exercise 4 Converting a Variant to an Integer

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
    Quit,  // ① discriminator 0 — default, auto-assigned
    Move,  // ② discriminator 1 — default, auto-assigned
    Write, // ③ discriminator 2 — default, auto-assigned
}

fn main() {
    let m = Message::Move;        // ④ m holds the Move variant
    let n = Message::Move as u8;  // ⑤ as u8 casts the variant to its discriminator — Move is 1 because it is the second variant (0-indexed)
    println!("{}", n);            // ⑥ prints 1
}
```

**Why:** The `as` keyword casts an enum variant to its underlying integer discriminator. Default discriminators start at 0 and increment by 1. You must use the full `EnumName::Variant` path in the cast expression — using the variable `m` directly does not work for casting.

</details>

---

### Exercise 5 Variants That Hold Different Data Shapes

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
#[derive(Debug)]
enum Action {
    Quit,                         // ① no data — just a marker variant
    Move { x: i32, y: i32 },     // ② struct-like variant — named fields with curly braces
    Write(String),                // ③ tuple-like variant — unnamed field with parentheses
    ChangeColor(i32, i32, i32),   // ④ tuple-like variant — three unnamed i32 fields
}

fn main() {
    let msg = Action::Move { x: 1, y: 2 }; // ⑤ struct-like syntax requires curly braces and field names — must match the definition exactly
    println!("{:?}", msg);                  // ⑥ {:?} prints the variant name and its field values
}
```

**Why:** The syntax for creating a variant must match how that variant was defined. `Move` was defined with named fields `{ x: i32, y: i32 }`, so you must use curly brace syntax with field names. Using parentheses like `Move(1, 2)` would not compile — the data shape is part of the type contract.

</details>

---

### Exercise 6 Array of Enum Instances

An array holds three `Message` instances. Right now the array type annotation is missing.

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
    let msgs: [Message; 3] = [               // ① [Message; 3] is the type annotation — an array of exactly three Message values
        Message::Quit,                       // ② first element — the Quit variant, no data
        Message::Move { x: 1, y: 2 },       // ③ second element — the Move variant with named fields
        Message::Write(String::from("hello")), // ④ third element — the Write variant with a String inside
    ];
    println!("Length: {}", msgs.len()); // ⑤ .len() returns 3 — all three different variants stored in one array under the same Message type
}
```

**Why:** All variants of an enum belong to the same type. `Quit`, `Move`, and `Write` are all `Message` — so they can be stored together in a `[Message; 3]` array. This is a key advantage of enums: one type that can represent many different shapes of data, making it safe and easy to work with collections of mixed variants.

</details>

---

**End of Enums.**
