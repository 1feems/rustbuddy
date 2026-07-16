# Practice - Slices & Arrays

> Follows `EXERCISE-STYLE-GUIDE.md`

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
| Two-word object | A slice reference stores two things: a pointer (where the data starts) and a length (how many elements). On 64-bit systems, each word is 8 bytes, so 16 bytes total. |
| `enumerate()` | Returns tuples of (index, value) when iterating over a collection. |

---

### Exercise 1 Annotating an Array Type

This exercise tests how to write the full type of an array. In a real contract, you might store a fixed list of plan prices as an array and every slot must have the same type and a known size.

A function expects an array of five whole numbers, but the declaration is missing its type label. Right now Rust cannot check that the argument matches the parameter.

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

A program creates ten zeros and prints the array length. Right now the short-init syntax is wrong and `len` is missing its parentheses.

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

A program reads the third element of an array and also tries an out-of-range index. Right now the third-element index is wrong (indexing starts at 0) and the out-of-range access will panic.

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

**End of Slices & Arrays.**
