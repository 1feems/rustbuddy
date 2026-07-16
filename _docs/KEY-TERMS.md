# Rust Bud — Key Terms

Source of truth for the Terms to Know tab on every exercise page.
Each section maps to one exercise page.

Sources:
- Topics 1–4: pulled from `lessons/solana/rust-for-solana/lesson-0X/03-lesson.md` Key Terms sections
- Topics 5–11: pulled from `game/exercises/` Quick Reference sections (lesson files not yet built for these)

---

## Variables

| Term | What it means | When you use it |
|---|---|---|
| `let` | Creates a new variable | Every time you store a value |
| `mut` | Allows a variable to change after it is set | When your program needs to update state |
| `u64` | Unsigned 64-bit integer — whole number, no negatives | Payment amounts, token balances, timestamps |
| `u8` | Unsigned 8-bit integer — whole number 0 to 255 | Bytes, wallet address components |
| `bool` | True or false — nothing else | Status flags: `is_paid`, `is_verified` |
| `[u8; 32]` | An array of 32 unsigned bytes | Wallet addresses on Solana |
| `&str` | A piece of text | Labels, names, error messages |
| `f64` | A decimal number | Rarely used in Solana — integer math is preferred |
| `as` | Converts one type to another | When you need to use two different types together |

---

## Functions

| Term | What it means | When you use it |
|---|---|---|
| `fn` | The keyword that starts a function definition | Every time you define a function |
| Parameter | A typed input slot in the function signature: `name: &str` | When your function needs values from the caller |
| Argument | The actual value passed when calling: `"Shane"` | When you call a function |
| `->` | Arrow separating parameters from return type | When your function gives a value back |
| Return type | The type of value the function sends back | Declared after `->` |
| `return` | Sends a value back to the caller and exits the function | At the end of a function with a return value |
| `String` | An owned piece of text — what `format!` gives you | When combining text pieces into one new value |
| `format!` | Macro that builds a new `String` from a template | When you need the result as a value, not printed |
| `#[allow(dead_code)]` | Tells Rust to skip the "function never used" warning | During development, before wiring everything together |

---

## Modules

| Term | What it means | When you use it |
|---|---|---|
| `mod` | Declares a module | Any time you create or reference a module |
| `pub mod helpers;` | Declare a module backed by the file `helpers.rs` | In `main.rs` or `lib.rs` when you want a separate file |
| `pub fn` | Make a function callable from outside its module | When other files need to use this function |
| Private by default | Everything inside a module is hidden unless `pub` | Default Rust behavior — you choose what is visible |
| `::` | The separator in a module path | Every time you navigate into a module |
| Path | The full address of a function: `helpers::function_name` | When calling a function from another module |
| Child module | A module declared inside another module | When you want to group within a module further |
| Inline module | `pub mod name { ... }` — body is right here, not a file | For small sub-groups that do not need their own file |

---

## Ownership

| Term | What it means | When you use it |
|---|---|---|
| Owner | The variable responsible for a value. When it goes out of scope, the value is freed. | Always. Every value has one. |
| Move | Ownership transfers to a new variable. The original can no longer be used. | When assigning a `String` or `Vec` to a new variable or passing it to a function |
| Clone | `.clone()` makes a full independent copy of heap data. Both variables stay valid. Costs memory. | When you need two valid copies of a `String` or `Vec` |
| Copy | Stack-only types copy automatically on assignment. Both variables stay valid. Free. | With integers, booleans, floats. They copy automatically. |
| Scope | The block between `{` and `}` where a variable is valid. | Every time you open a code block. Determines when variables are created and dropped. |
| Drop | Rust frees a value's memory automatically when its owner goes out of scope. | Every time a scope ends. No manual cleanup needed. |

---

## Borrowing

| Term | What it means | When you use it |
|---|---|---|
| Borrow `&T` | A read-only reference — you can look but not change | When a function only needs to read a value |
| Mutable borrow `&mut T` | A read-write reference — you can change the value | When a function needs to modify a value |
| Lifetime | How long a reference stays valid — compiler tracks this automatically | You read lifetimes in Anchor; rarely write them yourself |

---

## String vs &str

| Term | What it means |
|---|---|
| `String` | Heap-allocated, owns its data, can grow and shrink, mutable with `mut` |
| `&str` | String slice — an immutable view into a string. Read-only. |
| String literal | Text in double quotes, type `&str`, stored in read-only memory at compile time |
| `push_str` | Appends a string slice (`&str`) to a `String` |
| `push` | Appends a single character to a `String` |
| `+` | Concatenates a `String` with `&str`. The first `String` is consumed (moved). |
| `as_str()` / `&s` | Convert `String` to `&str` |
| `to_string()` / `String::from()` | Convert `&str` to `String` |
| `chars()` | Iterate over individual characters of a string |

---

## Slices

| Term | What it means |
|---|---|
| Array | Fixed-size list where every element has the same type. Stored on the stack. |
| `[T; N]` | Array type signature: `T` is the element type, `N` is the count (must be known at compile time). |
| `[value; count]` | Short init syntax: create an array with `count` copies of `value`. |
| `len()` | Returns how many elements are in an array or slice. |
| Indexing | Access an element with `[index]`. First element is at 0. Out of bounds panics. |
| `get()` | Returns `Option` — safe way to access elements without panicking. |
| Slice `&[T]` | A borrowed view into a chunk of an array or collection. |
| `enumerate()` | Returns tuples of (index, value) when iterating over a collection. |

---

## Tuples

| Term | What it means |
|---|---|
| Tuple | A single variable that holds multiple values of different types grouped together. |
| `(i32, &str)` | Tuple type signature: parentheses with the types inside, separated by commas. |
| `t.0` | Tuple indexing: the first element is at index 0, the second at 1, and so on. |
| Destructuring | Pulling a tuple apart into separate variables with `let (a, b) = t;`. |
| Nested tuple | A tuple inside another tuple, like `(u8, (i32, i32))`. |

---

## Structs

| Term | What it means |
|---|---|
| `struct` | A custom compound type that groups values of different types under named fields. |
| Dot notation | Access a field with `instance.field_name`. |
| `let mut` | The whole struct must be mutable to change any field. Rust does not allow single-field mutability. |
| Shorthand | When a variable name matches a field name, write it once: `field_name` instead of `field_name: field_name`. |
| `..instance` | Struct update syntax: copy all remaining fields from another instance. |
| Tuple struct | A named tuple: `struct Color(i32, i32, i32);` |
| Unit-like struct | A struct with no fields, mainly used with traits. |
| `#[derive(Debug)]` | An attribute that lets you print a struct with `{:?}`. |
| Partial move | Moving one field out of a struct invalidates the whole struct afterward. |

---

## Enums

| Term | What it means |
|---|---|
| `enum` | A custom type where only ONE value is active at a time. |
| Variant | One of the possible values inside an enum. |
| `EnumName::Variant` | Two colons (`::`) connect the enum name to the variant you picked. |
| Discriminator | A number Rust assigns to each variant (starting at 0). |
| `match` | A way to say "if the value is this variant, do this; if it's that variant, do that." |
| `_` catch-all | An underscore arm in `match` that handles every variant you didn't name explicitly. |

---

## Option

| Term | What it means |
|---|---|
| `Option` | A built-in enum that replaces "null" in Rust. It says "this might have a value, or it might not." |
| `Some(T)` | The variant that wraps an actual value. `Some(5)` means "there is a value, and it's 5." |
| `None` | The variant that means "there is no value." |
| `match` on `Option` | The standard way to handle both possibilities. |
| `if let` | A shorter way to unwrap `Some` when you only care about the value-carrying case. |
| Prelude | Rust's built-in types (like `Option`) that you can use without importing anything. |

---

## Flow Control

| Term | What it means |
|---|---|
| `if` / `else if` / `else` | Check a condition. If true, run the first block. If not, check the next condition. |
| `for` over `..` | `1..5` means 1, 2, 3, 4. The last number is EXCLUDED. |
| `for` over `..=` | `1..=5` means 1, 2, 3, 4, 5. The last number is INCLUDED. |
| `while` | Keep running the block as long as the condition is `true`. |
| `break` | Immediately exit the loop. |
| `continue` | Skip the rest of this iteration and jump to the next one. |
| `loop` | An infinite loop. You must use `break` inside it to stop. |
| `loop` as expression | `let result = loop { ... break value; }` — `break` returns a value from the loop. |
| Loop labels | `'outer:` labels a loop so `break 'outer;` exits that specific loop from inside a nested one. |
