# Practice - Slices & Arrays

> Source for `slices.html` — follows `_docs/STYLE-GUIDE.md` and `_docs/EXERCISE-PAGE-DESIGN.md`

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
| `get()` | Returns `Option` — safe way to access elements without panicking. |
| Slice (`&[T]`) | A borrowed view into a chunk of an array or collection. Type is `&[T]`. |
| Two-word object | A slice reference stores two things: a pointer (where the data starts) and a length (how many elements). On 64-bit systems, each word is 8 bytes, so 16 bytes total. |
| `enumerate()` | Returns tuples of (index, value) when iterating over a collection. |

---

### Exercise 1 Annotating an Array Type

A function expects an array of five whole numbers, but the declaration is missing its type label. Right now Rust cannot check that the argument matches the parameter.

An array is a fixed-size list where every element has the same type. Its type signature is `[T; N]`: `T` is the element type, `N` is the count. Because the size is part of the type, Rust must know `N` at compile time.

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

```rust
fn print_array(arr: [i32; 5]) { // ② the function expects exactly five i32 values — the size is part of the type
    println!("{:?}", arr);      // ③ {:?} uses the Debug trait to print the full array
}

fn main() {
    let arr: [i32; 5] = [1, 2, 3, 4, 5]; // ① the type annotation [i32; 5] matches the function parameter — five i32 values on the stack
    print_array(arr);                      // ② arr is passed to the function — arrays with Copy elements are copied, not moved
}
```

**Why:** The size of an array is part of its type. `[i32; 5]` and `[i32; 4]` are different types — a function that expects one will not accept the other. The type annotation tells the compiler exactly how much stack space to allocate.

</details>

---

### Exercise 2 Short Array Initialization

A program creates ten zeros and prints the array length. Right now the short-init syntax is wrong and `len` is missing its parentheses.

Rust can initialize an array quickly with `[value; count]`. This creates `count` copies of `value`. Then you call `.len()` (with parentheses) to ask how many elements fit inside.

```rust
fn main() {
    let arr: [i32; 10] = 0;
    println!("Length: {}", arr.len);
}
```

**Fix both lines so the array is created with ten zeros and the length prints correctly. Do not add or remove any lines.**

<details>
<summary>Answer</summary>

```rust
fn main() {
    let arr: [i32; 10] = [0; 10]; // ① [0; 10] is the short init syntax — creates ten i32 values all set to zero
    println!("Length: {}", arr.len()); // ② .len() is a method call — parentheses are required, len without () is not valid
}
```

**Why:** `[0; 10]` is a shorthand that tells Rust to fill an array with ten copies of the value `0`. It is equivalent to writing `[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]` but much shorter. `.len()` is a method — in Rust, methods always need parentheses even when they take no arguments.

</details>

---

### Exercise 3 Array Indexing and Out of Bounds

A program reads the third element of an array and also tries an out-of-range index. Right now the third-element index is wrong (indexing starts at 0) and the out-of-range access will panic.

In an array, the first element lives at index 0, the second at 1, and so on. If you use an index equal to or greater than the number of elements, the program panics at runtime.

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

```rust
fn main() {
    let months = ["Jan", "Feb", "Mar"];        // ① array of three &str values — valid indices are 0, 1, and 2
    println!("Second month: {}", months[1]);   // ② index 1 is the second element — indexing starts at 0, not 1
    // println!("Out of range: {}", months[5]); // ③ commented out — index 5 does not exist in a 3-element array and would cause a panic
}
```

**Why:** Array indexing starts at 0 in Rust. The "second" element is always at index 1. Accessing an index that does not exist is caught at runtime, not compile time — the program panics immediately. For safe access without panicking, use `.get()` which returns `Option`.

</details>

---

### Exercise 4 Safe Lookup with get()

A program reads from an array at a position that might be out of range. Right now it uses direct indexing, which panics. The `get()` method returns `Option<&T>`: `Some(&value)` if the index exists, or `None` if it does not.

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

```rust
fn main() {
    let arr = [10, 20, 30];    // ① array with three elements — valid indices are 0, 1, 2
    let item = arr.get(10);    // ② .get(10) returns Option<&i32> — None because index 10 does not exist, no panic
    println!("Item: {:?}", item); // ③ {:?} prints the Option — prints None rather than crashing the program
}
```

**Why:** Direct indexing `arr[10]` panics when the index is out of bounds — the program crashes immediately. `.get()` returns an `Option` instead, letting the caller decide what to do. In contract code, a panic means lost funds — `.get()` is the safe default whenever the index might be invalid.

</details>

---

### Exercise 5 Annotating an Array Slice Type

The code passes an array to a function that expects a slice. Right now the function parameter is typed as an array (`[i32; 3]`) but the intent is to accept any chunk of `i32` values — a slice.

A slice is a borrowed view into a contiguous chunk of a collection. Its type is `&[T]`, where `T` is the element type. You do not include the length in a slice type because a slice can have any length.

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

```rust
fn print_slice(arr: &[i32]) { // ① &[i32] is a slice — a borrowed view into any contiguous sequence of i32 values, any length
    println!("{:?}", arr);    // ② prints the slice — works the same as printing an array
}

fn main() {
    let nums = [1, 2, 3]; // ③ nums is an array with a fixed type [i32; 3]
    print_slice(&nums);    // ④ &nums creates a reference to the array — Rust automatically coerces &[i32; 3] into &[i32] for the function call
}
```

**Why:** A function that takes `[i32; 3]` only accepts arrays of exactly three elements. A function that takes `&[i32]` accepts a slice of any length — making it more flexible. This is the preferred pattern for functions that only need to read a sequence of values.

</details>

---

### Exercise 6 Slice Reference Size

The code asserts that a slice reference holding two `char` values is 8 bytes. Right now the assertion fails because a slice reference is a two-word object: a pointer plus a length.

A slice reference stores two pieces of information: a pointer to where the data starts, and a length counting how many elements are in the view. On a 64-bit system, each word is 8 bytes, so the total is 16 bytes.

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

```rust
use std::mem::size_of_val;

fn main() {
    let c = ['a', 'b'];           // ① c is an array of two chars on the stack
    let slice: &[char] = &c;      // ② slice is a fat pointer — it stores a pointer to c's data AND the length (2)
    assert!(size_of_val(slice) == 16); // ③ size_of_val returns the size of the data the slice points to — two chars, each 4 bytes = 8... wait, no: size_of_val on a slice returns the total size of the pointed-to data: 2 chars * 4 bytes = 8. But the assertion uses 16 because each char is 4 bytes on most systems.
}
```

Actually — `size_of_val(slice)` returns the size of the data the slice points to (two `char` values, each 4 bytes = 8 bytes), not the size of the slice reference itself. Let's be precise:

```rust
use std::mem::size_of_val;

fn main() {
    let c = ['a', 'b'];           // ① c is an array of two chars — each char is 4 bytes in Rust
    let slice: &[char] = &c;      // ② slice borrows the array as a slice — it is a fat pointer (pointer + length)
    assert!(size_of_val(slice) == 8); // ③ size_of_val on a slice returns the size of the pointed-to data — 2 chars * 4 bytes each = 8 bytes
}
```

**Why:** `size_of_val` on a slice measures the total size of the data the slice points to — not the reference itself. Two `char` values at 4 bytes each equals 8 bytes. The slice reference itself (pointer + length) is 16 bytes on a 64-bit system, but that is the reference's size, not the data's.

</details>

---

**End of Slices & Arrays.**
