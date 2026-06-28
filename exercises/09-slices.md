# Practice - Slices & Arrays

> DRAFT FOR REVIEW - Follows `EXERCISE-STYLE-GUIDE.md`

Work through each exercise in the [Rust Playground](https://play.rust-lang.org).  
Read the explainer, paste the starter code, fix it, then move on.  
Check your answer only after you've tried.

---

## Quick reference

| Concept | What it means |
|---|---|
| Array | Fixed-size list where every element has the same type. Stored on the stack. |
| `[T; N]` | Array type signature: `T` is the element type, `N` is the count (must be known at compile time). |
| `[value; count]` | Short init syntax: create an array with `count` copies of `value`. |
| `len()` | Returns how many elements are in an array or slice. |
| Indexing | Access an element with `[index]`. First element is at 0. Out of bounds panics. |
| `get()` | Returns `Option` safe way to access elements without panicking. |
| Slice (`&[T]`) | A borrowed view into a chunk of an array or collection. Type is `&[T]`. |
| Two-word object | A slice reference stores two things: a pointer (where the data starts) and a length (how many elements). On 64-bit systems, each word is 8 bytes 16 bytes total. |
| `enumerate()` | Returns tuples of (index, value) when iterating over a collection. |

---

## Track A - Generic Rust

---

### Exercise 1 Annotating an Array Type

This exercise tests how to write the full type of an array. In a real contract, you might store a fixed list of plan prices as an array and every slot must have the same type and a known size.

The code wants to declare an array of five whole numbers and pass it to a function that expects `[i32; 5]`. Right now the array declaration is missing its type label, so Rust cannot check that the argument matches the parameter.

An array is a fixed-size list where every element has the same type. Its type signature is `[T; N]`: `T` is the element type, `N` is the count. Because the size is part of the type, Rust must know `N` at compile time. Think of it like a row of identical lockers each one holds the same kind of thing, and the total count is locked in when the building is built.

```rust
fn print_array(arr: [i32; 5]) {
    println!("{:?}", arr);
}

fn main() {
    let arr = [1, 2, 3, 4, 5];
    print_array(arr);
}
```

**Fill in the type label for `arr` so it matches the function parameter.**

<details>
<summary>Answer</summary>

The array type is `[i32; 5]` five `i32` values. Add that label after the variable name.

```rust
fn print_array(arr: [i32; 5]) {
    println!("{:?}", arr);
}

fn main() {
    let arr: [i32; 5] = [1, 2, 3, 4, 5];
    print_array(arr);
}
```

</details>

---

### Exercise 2 Short Array Initialization

This exercise tests the short syntax for creating arrays and reading their length. In a real contract, you might initialize an array with the same default value and then check how many slots exist.

The code wants to create ten `i32` values all set to `0` and print the length. Right now the short-init syntax is wrong, and the `len()` call is missing its parentheses.

Rust can initialize an array quickly with `[value; count]`. This creates `count` copies of `value`. Then you can call `.len()` (with parentheses) to ask how many elements fit inside.

```rust
fn main() {
    let arr: [i32; 10] = 0;
    println!("Length: {}", arr.len);
}
```

**Fix both lines so the array is created with ten zeros and the length prints correctly. Do not add or remove any lines.**

<details>
<summary>Answer</summary>

1. `[0; 10]` is the short init syntax: zero repeated ten times.
2. `arr.len()` is the method call syntax `len` is a method, so it needs parentheses.

```rust
fn main() {
    let arr: [i32; 10] = [0; 10];
    println!("Length: {}", arr.len());
}
```

</details>

---

### Exercise 3 Array Indexing and Out of Bounds

This exercise tests array indexing rules. In a real contract, accessing a fixed list of supported token symbols by position is common but requesting a position that does not exist crashes the program.

The code wants to read the third element of an array. Right now the index is wrong indexing starts at 0, so element 3 is at index 2. Also, the code tries index 5, which is past the end and will panic.

In an array, the first element lives at index 0, the second at 1, and so on. If you use an index equal to or greater than the number of elements, the program panics at runtime. Think of it like numbered parking spots spot 0 is the first one, and asking for spot 5 when only three exist is an error.

```rust
fn main() {
    let months = ["Jan", "Feb", "Mar"];
    println!("Second month: {}", months[2]);
    println!("Out of range: {}", months[5]);
}
```

**Fix the second-month line and comment out the out-of-range line so the program runs safely.**

<details>
<summary>Answer</summary>

`months[1]` is the second element (index starts at 0). `months[5]` does not exist, so it must be commented out.

```rust
fn main() {
    let months = ["Jan", "Feb", "Mar"];
    println!("Second month: {}", months[1]);
    // println!("Out of range: {}", months[5]);
}
```

</details>

---

### Exercise 4 Safe Lookup with get()

This exercise tests the `get()` method as a safer alternative to direct indexing. In a real contract, reading a position that might be empty is safer with `get()` because it returns `Option` instead of crashing.

The code wants to access an element that might be out of range. Right now it uses direct indexing, which panics. The `get()` method returns `Option<&T>`: `Some(&value)` if the index exists, or `None` if it does not.

```rust
fn main() {
    let arr = [10, 20, 30];
    let item = arr[10];
    println!("Item: {:?}", item);
}
```

**Replace direct indexing with `get()` so the program compiles and prints `None` for an out-of-range index. Do not add or remove any lines.**

<details>
<summary>Answer</summary>

`arr.get(10)` returns `None` instead of panicking. The type becomes `Option<&i32>`.

```rust
fn main() {
    let arr = [10, 20, 30];
    let item = arr.get(10);
    println!("Item: {:?}", item);
}
```

</details>

---

### Exercise 5 Annotating an Array Slice Type

This exercise tests the type signature of an array slice. In a real contract, a helper that reads only part of a fixed plan list must accept a slice, not a full array.

The code passes an array to a function that expects a slice. Right now the function parameter is typed as an array (`[i32; 3]`) but the intent is to accept any chunk of `i32` values a slice.

A slice is a borrowed view into a contiguous chunk of a collection. Its type is `&[T]`, where `T` is the element type. You do not include the length in a slice type because a slice can have any length it is just a window.

```rust
fn print_slice(arr: [i32; 3]) {
    println!("{:?}", arr);
}

fn main() {
    let nums = [1, 2, 3];
    print_slice(&nums);
}
```

**Fix the function parameter type so it accepts a slice (`&[i32]`). Do not add or remove any lines.**

<details>
<summary>Answer</summary>

Change `[i32; 3]` to `&[i32]`. The function now borrows a slice of any length, not only a 3-element array.

```rust
fn print_slice(arr: &[i32]) {
    println!("{:?}", arr);
}

fn main() {
    let nums = [1, 2, 3];
    print_slice(&nums);
}
```

</details>

---

### Exercise 6 Slice Reference Size

This exercise tests the memory layout of a slice reference. In a real contract, knowing how much space a reference takes helps you plan on-chain storage and avoid size surprises.

The code asserts that a slice reference holding two `char` values is 8 bytes. Right now the assertion fails because a slice reference is a two-word object: a pointer plus a length, not the data itself.

A slice reference stores two pieces of information: a pointer to where the data starts, and a length counting how many elements are in the view. On a 64-bit system, each word is 8 bytes, so the total is 16 bytes. Think of it like a museum ticket the ticket does not contain the art; it only holds the room number and how many pieces are inside.

```rust
use std::mem::size_of_val;

fn main() {
    let c = ['a', 'b'];
    let slice: &[char] = &c;
    assert!(size_of_val(slice) == 8);
}
```

**Modify the number 8 so the assertion passes on a 64-bit system.**

<details>
<summary>Answer</summary>

A slice reference is 16 bytes: 8 bytes for the pointer + 8 bytes for the length (`usize` on 64-bit).

```rust
use std::mem::size_of_val;

fn main() {
    let c = ['a', 'b'];
    let slice: &[char] = &c;
    assert!(size_of_val(slice) == 16);
}
```

</details>

---

### Exercise 7 Borrowing a String Slice from a String

This exercise tests string slices as views into heap strings. In a real contract, extracting a temporary prefix from a stored label without copying saves memory.

The code wants to borrow the first five characters of a `String` as a `&str`. Right now the slice notation is missing, and the variable type does not match.

A string slice is a borrowed view into a string. You create it with range notation inside brackets: `&s[0..5]`. The result is a `&str`, not a `String`. This is the same slice concept as array slices it is a window, not a copy.

```rust
fn main() {
    let name = String::from("hello, world");
    let prefix: &str = name;
    assert_eq!(prefix, "hello");
}
```

**Fix this so `prefix` borrows the first five characters. Do not add or remove any lines.**

<details>
<summary>Answer</summary>

Use `&name[0..5]` to create a borrowed slice of the first five bytes.

```rust
fn main() {
    let name = String::from("hello, world");
    let prefix: &str = &name[0..5];
    assert_eq!(prefix, "hello");
}
```

</details>

---

### Exercise 8 Write From Scratch Using enumerate()

No starter code. No hints. Write it from scratch.

A program needs to print each element of an array along with its position number. Write a program that:

1. Creates an array called `days` with the values `["Mon", "Tue", "Wed"]`
2. Uses `enumerate()` in a loop to print each line as: `0: Mon`, `1: Tue`, `2: Wed`

`enumerate()` returns a tuple `(index, value)` for each element. You must first call `.iter()` on the array to create an iterator before using `.enumerate()`.

#### Expected output

```
0: Mon
1: Tue
2: Wed
```

<details>
<summary>Answer</summary>

`days.iter().enumerate()` produces tuples `(index, &value)`. We destructure each tuple inside the loop.

```rust
fn main() {
    let days = ["Mon", "Tue", "Wed"];
    for (i, day) in days.iter().enumerate() {
        println!("{}: {}", i, day);
    }
}
```

</details>

---

## Track B - Progressive Contract

All exercises below apply the same array and slice concepts to a subscription payment contract. The same Rust rules different clothes.

---

### Exercise 1 Annotating a Plan Prices Array

This exercise tests how to write the full type of an array. In a real contract, a fixed list of plan prices (basic, premium, enterprise) is stored as an array where every slot is a `u64`.

The code wants to declare an array of three plan prices and pass it to a function. Right now the array declaration is missing its type label.

An array is a fixed-size list where every element has the same type. Its type signature is `[T; N]`: `T` is the element type, `N` is the count. The size must be known at compile time.

```rust
fn total_prices(prices: [u64; 3]) -> u64 {
    prices[0] + prices[1] + prices[2]
}

fn main() {
    let prices = [5_000_000, 10_000_000, 25_000_000];
    println!("Total: {}", total_prices(prices));
}
```

**Fill in the type label for `prices` so it matches the function parameter.**

<details>
<summary>Answer</summary>

The type is `[u64; 3]` three `u64` values.

```rust
fn total_prices(prices: [u64; 3]) -> u64 {
    prices[0] + prices[1] + prices[2]
}

fn main() {
    let prices: [u64; 3] = [5_000_000, 10_000_000, 25_000_000];
    println!("Total: {}", total_prices(prices));
}
```

</details>

---

### Exercise 2 Short Initialization of Token Symbols

This exercise tests short array init syntax and array length. In a real contract, you might initialize a list of accepted token symbols with a default placeholder and confirm the slot count.

The code wants to create five identical placeholder symbols and print how many slots exist. Right now the short-init syntax is wrong, and `len` is missing parentheses.

Rust can fill an array quickly with `[value; count]`. The `.len()` method returns the element count. Both the initialization and the method call need the correct syntax.

```rust
fn main() {
    let tokens: [&str; 5] = "TBD";
    println!("Supported tokens: {}", tokens.len);
}
```

**Fix both lines so the array has five `"TBD"` placeholders and the length prints correctly. Do not add or remove any lines.**

<details>
<summary>Answer</summary>

1. `["TBD"; 5]` is the short init syntax for repeated string slices.
2. `len()` is a method and needs parentheses.

```rust
fn main() {
    let tokens: [&str; 5] = ["TBD"; 5];
    println!("Supported tokens: {}", tokens.len());
}
```

</details>

---

### Exercise 3 Accessing Tier Data Safely

This exercise tests array indexing bounds. In a real contract, a function might look up a tier label by numeric index but requesting an index beyond the array crashes the program.

The code wants to print the third tier label. Right now the index is off by one (index starts at 0), and there is an extra line that requests an index past the end.

In an array, the first element is at index 0. An index equal to or greater than the length causes a panic at runtime.

```rust
fn main() {
    let tiers = ["basic", "premium", "enterprise"];
    println!("Third tier: {}", tiers[3]);
    println!("Out of range: {}", tiers[5]);
}
```

**Fix the third-tier line and comment out the out-of-range line so the program runs safely.**

<details>
<summary>Answer</summary>

The third element is at index 2. `tiers[5]` is out of bounds and must be removed.

```rust
fn main() {
    let tiers = ["basic", "premium", "enterprise"];
    println!("Third tier: {}", tiers[2]);
    // println!("Out of range: {}", tiers[5]);
}
```

</details>

---

### Exercise 4 Safe Plan Lookup with get()

This exercise tests `get()` as a safe alternative to direct indexing. In a real contract, a frontend might request a plan at a position that does not exist `get()` prevents a crash.

The code wants to read a plan price that might be out of range. Right now it uses direct indexing, which panics.

`get()` returns `Option<&T>`. If the index is valid you get `Some(&value)`; if not, you get `None`. This is safer than direct indexing when the index comes from user input.

```rust
fn main() {
    let prices = [5_000_000u64, 10_000_000, 25_000_000];
    let plan = prices[10];
    println!("Plan price: {:?}", plan);
}
```

**Replace direct indexing with `get()` so the program compiles and prints `None` for an out-of-range index. Do not add or remove any lines.**

<details>
<summary>Answer</summary>

`prices.get(10)` returns `None` instead of panicking.

```rust
fn main() {
    let prices = [5_000_000u64, 10_000_000, 25_000_000];
    let plan = prices.get(10);
    println!("Plan price: {:?}", plan);
}
```

</details>

---

### Exercise 5 Annotating a Wallet List Slice

This exercise tests the type signature of an array slice. In a real contract, a helper that reads a variable number of wallet balances should accept a slice, not a fixed-size array.

The code passes an array reference to a function. Right now the function parameter is typed as a fixed array (`[u64; 4]`) but it should accept any length chunk.

A slice is a borrowed view into a contiguous chunk. Its type is `&[T]`. You leave out the length because a slice can be any size it is just a window onto the data.

```rust
fn print_balances(balances: [u64; 4]) {
    println!("{:?}", balances);
}

fn main() {
    let wallets = [1_000_000u64, 2_000_000, 3_000_000, 4_000_000];
    print_balances(&wallets);
}
```

**Fix the function parameter type so it accepts a slice (`&[u64]`). Do not add or remove any lines.**

<details>
<summary>Answer</summary>

Change `[u64; 4]` to `&[u64]`.

```rust
fn print_balances(balances: &[u64]) {
    println!("{:?}", balances);
}

fn main() {
    let wallets = [1_000_000u64, 2_000_000, 3_000_000, 4_000_000];
    print_balances(&wallets);
}
```

</details>

---

### Exercise 6 Slice Reference Size on 64-bit

This exercise tests the memory layout of a slice reference. In a real contract, referencing a list of region codes as a slice means understanding that the reference itself is small, even if the data is large.

The code asserts that a slice reference holding two `char` values is 8 bytes. Right now the number is wrong.

A slice reference is a two-word object: pointer + length. On 64-bit, each word is 8 bytes, so the reference takes 16 bytes total. The actual characters live elsewhere in memory; the slice reference only points to them.

```rust
use std::mem::size_of_val;

fn main() {
    let regions = ['A', 'B'];
    let view: &[char] = &regions;
    assert!(size_of_val(view) == 8);
}
```

**Modify the number 8 so the assertion passes on a 64-bit system.**

<details>
<summary>Answer</summary>

16 bytes = 8-byte pointer + 8-byte length.

```rust
use std::mem::size_of_val;

fn main() {
    let regions = ['A', 'B'];
    let view: &[char] = &regions;
    assert!(size_of_val(view) == 16);
}
```

</details>

---

### Exercise 7 Borrowing a Prefix from a Plan Description

This exercise tests string slices as views into a heap `String`. In a real contract, extracting a short status prefix from a stored description without copying saves heap space.

The code wants to borrow the first six characters of a `String` as a `&str`. Right now the slice notation is missing.

A string slice is a borrowed view. You create it with range notation: `&s[0..6]`. The end index is exclusive. The result is a `&str`, not an owned `String`.

```rust
fn main() {
    let desc = String::from("active since 2024");
    let status: &str = desc;
    assert_eq!(status, "active");
}
```

**Fix this so `status` borrows the first six characters. Do not add or remove any lines.**

<details>
<summary>Answer</summary>

Use `&desc[0..6]` to create a borrowed view of the first six bytes.

```rust
fn main() {
    let desc = String::from("active since 2024");
    let status: &str = &desc[0..6];
    assert_eq!(status, "active");
}
```

</details>

---

### Exercise 8 Write From Scratch Using enumerate()

No starter code. No hints. Write it from scratch.

A contract needs to list active merchant IDs with their position numbers. Write a program that:

1. Creates an array called `merchants` with the values `["m_001", "m_002", "m_003"]`
2. Uses `enumerate()` in a loop to print each line as: `0: m_001`, `1: m_002`, `2: m_003`

`enumerate()` returns a tuple `(index, value)` for each element. You must first call `.iter()` on the array before using `.enumerate()`.

#### Expected output

```
0: m_001
1: m_002
2: m_003
```

<details>
<summary>Answer</summary>

`merchants.iter().enumerate()` produces `(index, &value)` tuples. Destructure them in the loop.

```rust
fn main() {
    let merchants = ["m_001", "m_002", "m_003"];
    for (i, m) in merchants.iter().enumerate() {
        println!("{}: {}", i, m);
    }
}
```

</details>

---

**End of Slices & Arrays.**
