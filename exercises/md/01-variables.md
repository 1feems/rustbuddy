# Practice - Variables

> This file follows the format in `EXERCISE-STYLE-GUIDE.md`.
> Read the style guide before editing.

Work through each exercise in the [Rust Playground](https://play.rust-lang.org).  
Read the explainer, paste the starter code, fix it, then move on.  
Check your answer only after you've tried.

---

## Quick reference

| Concept | What it means |
|---|---|
| `let x = 5` | Declare a variable and give it a value |
| `let mut x = 5` | Declare a variable you can change later |
| `i32` | A whole number - can be positive or negative |
| `u64` | A whole number - always positive, used for lamports |
| Scope | A variable only exists inside the `{ }` block where it was declared |
| Shadowing | Declaring a new variable with the same name - the new one takes over |
| Destructuring | Unpacking a tuple into separate variables in one line |

---

### Exercise 1 - Binding

**Binding** means giving a variable its value, by tying a name to a piece of data. Until you bind it, the variable is just a label with nothing attached.

In Rust, declaring a variable and giving it a value are two separate steps. The `:` labels the type, meaning what kind of value it holds. The `=` assigns the actual value. Both must happen before you can use the variable.

#### Your Task

A variable `x` is declared but never given a value. Right now it fails because `x` has no value and cannot be used.

1. Set `x` to `5`
2. Check that it equals `5`
3. Print `Success!`

> **Note:** `:` means "is of type." It labels what kind of value the variable will hold.

**Fix this so it compiles and prints `Success!`:**

```rust
fn main() {
    let x: i32;
    assert_eq!(x, 5);
    println!("Success!");
}
```

#### Expected Output

```text
Success!
```

<answer>
<summary>Answer</summary>

```rust
fn main() {
    let x: i32 = 5;
    assert_eq!(x, 5);
    println!("Success!");
}
```

</answer>

---

### Exercise 2 - Mutability

In Rust, every variable is locked by default. Once you give it a value, that value can't change.

If you need to change it later, add `mut` (short for **mutable**) when you declare it. This unlocks the variable so its value can be updated.

For example, a game tracks your score as you complete levels. You need `mut` because that number keeps changing.

#### Your Task

A variable starts at `1` and needs to be updated to `3`. Right now it fails because `x` is locked and cannot be changed.

1. Start `x` at `1`
2. Add `2` to `x`
3. Print `x = 3`

**Fill in `___` so the code compiles and prints `x = 3`:**

```rust
fn main() {
    let ___ x: i32 = 1;
    x += 2;
    println!("x = {}", x);
}
```

#### Expected Output

```text
x = 3
```

<answer>
<summary>Answer</summary>

```rust
fn main() {
    let mut x: i32 = 1;
    x += 2;
    println!("x = {}", x);
}
```

</answer>

---

### Exercise 3 - Scope

Every `{ }` block in Rust creates a scope. A variable declared inside a scope only exists inside that scope. Once the closing `}` is reached, the variable is gone.

Think of it like rooms - a variable only exists in the room where it was declared. A variable declared inside a helper block won't be visible to code outside it.

#### Your Task

Two variables need to be visible both inside and outside an inner block. Right now it fails because `y` is declared inside the block and isn't visible outside it.

1. Declare `x = 10` and `y = 5`
2. Print both inside an inner block
3. Print both outside the inner block

**Fix this with the least amount of changes so both print statements can see `y`:**

```rust
fn main() {
    let x: i32 = 10;

    {
        let y: i32 = 5;
        println!("x = {}, y = {}", x, y);
    }

    println!("x = {}, y = {}", x, y);
}
```

#### Expected Output

```text
x = 10, y = 5
x = 10, y = 5
```

<answer>
<summary>Answer</summary>

Move `y` out of the inner block so both prints can see it:

```rust
fn main() {
    let x: i32 = 10;
    let y: i32 = 5;

    {
        println!("x = {}, y = {}", x, y);
    }

    println!("x = {}, y = {}", x, y);
}
```

</answer>

---

### Exercise 4 - Shadowing

Shadowing means declaring a new variable with the same name. The new one hides the old one inside its scope. When you leave that scope, the old variable is visible again.

This is different from mutation - shadowing creates a brand new variable. The old one still exists, just hidden.

For example, you might temporarily give a user access to premium features during a trial. Inside that scope, they have `"premium"` access. Once the scope ends, they return to their original plan.

#### Your Task

A variable `plan` starts as `"basic"`. Inside a block, it gets shadowed with `"premium"`. After the block exits, `plan` returns to `"basic"`.

**Fill in the two blanks so both asserts pass:**

```rust
fn main() {
    let plan = "basic";

    {
        let plan = "premium";
        assert_eq!(plan, ___);
    }

    assert_eq!(plan, ___);
    println!("Success!");
}
```

#### Expected Output

```text
Success!
```

<answer>
<summary>Answer</summary>

```rust
fn main() {
    let plan = "basic";

    {
        let plan = "premium";
        assert_eq!(plan, "premium");
    }

    assert_eq!(plan, "basic");
    println!("Success!");
}
```

Inside the block, the shadowed `plan` is `"premium"`. Once the block exits, the original `"basic"` is visible again. Each `let plan` is a brand new variable - the old one is hidden, not replaced.

</answer>

---

### Exercise 5 - Destructuring

Destructuring lets you unpack a tuple into separate variables in one line. Instead of reaching into a tuple by index (`profile.0`, `profile.1`), you pull everything out at once and give each piece its own name.

This is useful any time a function or value groups two pieces of data together - you name both in one step.

#### Your Task

A profile is packed as a tuple with a name and an age. Right now the blanks need to be filled in so each piece gets its own variable.

**Fill in the two blanks so the code compiles and prints correctly:**

```rust
fn main() {
    let profile = ("Alex", 42);
    let (___, ___) = profile;
    println!("Name: {}, Age: {}", name, age);
}
```

#### Expected Output

```text
Name: Alex, Age: 42
```

<answer>
<summary>Answer</summary>

```rust
fn main() {
    let profile = ("Alex", 42);
    let (name, age) = profile;
    println!("Name: {}, Age: {}", name, age);
}
```

`let (name, age) = profile` unpacks the tuple in one step. Each blank becomes a variable name that matches one slot in the tuple, left to right.

</answer>

---

### Exercise 6 - Build: Subscription Variables

Before a Solana payment contract can do anything, it needs to know four things about a subscriber: who they are, how much they owe, what plan they are on, and whether their subscription is active.

Each piece of information has a type. The type tells Rust what the value is allowed to be - a whole number, a piece of text, true or false. Getting the types right is the first step in any contract.

#### Your Task

Declare four variables for a subscription contract:

- `wallet` - the subscriber's address, type `&str`, value `"ABC123"`
- `amount` - the payment in lamports, type `u64`, value `1_000_000`
- `plan` - the plan name, type `&str`, value `"pro"`
- `is_active` - whether the subscription is live, type `bool`, value `true`

Then print all four on one line.

**Write this from scratch:**

```rust
fn main() {
    // Your code here
}
```

#### Expected Output

```text
Wallet: ABC123, Amount: 1000000, Plan: pro, Active: true
```

<answer>
<summary>Answer</summary>

```rust
fn main() {
    let wallet: &str = "ABC123";
    let amount: u64 = 1_000_000;
    let plan: &str = "pro";
    let is_active: bool = true;
    println!("Wallet: {}, Amount: {}, Plan: {}, Active: {}", wallet, amount, plan, is_active);
}
```

</answer>

---

**End of Variables.**
