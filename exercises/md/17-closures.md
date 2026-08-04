# Practice - Closures

> Source for `closures.html` — follows `_docs/STYLE-GUIDE.md` and `_docs/EXERCISE-PAGE-DESIGN.md`

Work through each exercise in the [Rust Playground](https://play.rust-lang.org).
Read the explainer, paste the starter code, fix it, then move on.
Check your answer only after you've tried.

---

## Quick reference

| Concept | What it means |
|---|---|
| Closure | An anonymous function you can store in a variable and call later. Written with `|params| body`. |
| Capture | A closure can use variables from the surrounding code without being passed them as arguments. |
| Type inference | You do not need to annotate parameter or return types on closures. The compiler figures them out. |
| `move` | Forces the closure to take ownership of captured variables instead of borrowing them. |
| Borrow in closure | By default, closures capture variables by the least restrictive method: immutable borrow if possible, then mutable, then move. |
| Stored closure | A closure assigned to a variable so it can be called multiple times: `let double = |x| x * 2;` |

---

## Exercise 1 - Writing a Closure

A closure uses `|` pipes `|` around its parameters, then the body. No `fn` keyword, no name. You assign it to a variable and call it like a function.

A regular function and a closure that do the same thing look almost identical — the closure just skips the type annotations and the name.

#### Your Task

A program needs to add 1 to a number. Right now it only has a regular function. Add a closure that does the same thing and assign it to a variable called `closure_add_one`. Call both and print the results.

```rust
fn add_one(x: i32) -> i32 {
    x + 1
}

fn main() {
    let i = 5;

    // add a closure here that does the same thing as add_one
    // assign it to closure_add_one

    println!("function: {}", add_one(i));
    println!("closure:  {}", closure_add_one(i));
}
```

#### Expected Output

```text
function: 6
closure:  6
```

<details>
<summary>Answer</summary>

```rust
fn add_one(x: i32) -> i32 { // ① regular function — needs a name, parameter type, and return type written explicitly
    x + 1
}

fn main() {
    let i = 5;
    let closure_add_one = |x| x + 1; // ② closure — no name, no type annotations; the compiler infers i32 from how it is called

    println!("function: {}", add_one(i));          // ③ calls the named function — same result as the closure
    println!("closure:  {}", closure_add_one(i));  // ④ calls the closure stored in closure_add_one — same syntax as calling a function
}
```

**Why:** A closure is an anonymous function stored in a variable. The `|x|` syntax replaces `fn name(x: Type) -> Type`. The compiler infers the parameter and return types from the first time the closure is called, so you do not need to write them. Closures and functions produce identical results when they contain the same logic.

</details>

---

## Exercise 2 - Capturing a Variable

A closure can use variables from the surrounding scope without receiving them as arguments. This is called capturing. By default, the closure borrows the variable — it does not take ownership.

#### Your Task

A variable `color` holds a string. A closure called `print` should print it without taking `color` as a parameter. Right now `print` is missing. Write the closure and call it twice.

```rust
fn main() {
    let color = String::from("green");

    // write a closure called `print` that prints color
    // then call it twice

    println!("color is still: {}", color);
}
```

#### Expected Output

```text
color: green
color: green
color is still: green
```

<details>
<summary>Answer</summary>

```rust
fn main() {
    let color = String::from("green"); // ① color is declared in the outer scope — the closure will borrow it

    let print = || println!("color: {}", color); // ② || means no parameters — the closure captures color by immutable borrow from the surrounding scope
    print(); // ③ first call — color is borrowed while the closure runs, then the borrow is released
    print(); // ④ second call — the closure can be called again because it only borrows, not owns

    println!("color is still: {}", color); // ⑤ color is still valid because the closure only borrowed it, never took ownership
}
```

**Why:** A closure captures variables it uses from the surrounding code automatically. By default, it borrows the variable, which means the original is still available after the closure runs. This is different from passing a value as a function argument, where ownership rules apply. Capture lets closures work like small callbacks that remember their environment.

</details>

---

## Exercise 3 - Mutable Capture

To mutate a captured variable, the closure must capture it as a mutable borrow. The variable must be declared `mut` and the closure must also be declared `mut`.

While a mutable borrow is active, no other code can use the variable. The borrow ends when the closure is dropped.

#### Your Task

A counter starts at 0. A closure called `inc` should increment it by 1 each time it is called. Right now the code does not compile because the closure is immutable. Fix it by adding `mut` in the right places.

```rust
fn main() {
    let mut count = 0;

    let inc = || {
        count += 1;
        println!("count: {}", count);
    };

    inc();
    inc();
    inc();
}
```

#### Expected Output

```text
count: 1
count: 2
count: 3
```

<details>
<summary>Answer</summary>

```rust
fn main() {
    let mut count = 0; // ① count must be mut because the closure will modify it

    let mut inc = || { // ② the closure itself must be mut — it holds a mutable borrow on count, and mutating a capture requires the closure binding to be mut
        count += 1;                    // ③ increments the captured count — only works because count is mut and inc is mut
        println!("count: {}", count); // ④ prints the updated value — the mutable borrow is still active during this call
    };

    inc(); // ⑤ first call — count becomes 1
    inc(); // ⑥ second call — count becomes 2
    inc(); // ⑦ third call — count becomes 3
}
```

**Why:** Mutating a captured variable requires two things: the variable must be `mut`, and the closure binding must also be `mut`. The closure holds a mutable borrow on `count` for its entire lifetime, which means `count` cannot be used directly by other code while `inc` exists. The `mut` on the closure tells the compiler this closure modifies its captured state.

</details>

---

## Exercise 4 - The move Keyword

`move` forces the closure to take ownership of the variables it captures. After a `move` closure is created, the original variable is no longer usable by the surrounding code.

`move` is useful when you need to send a closure to another thread or keep it alive longer than the scope where the variable was created.

#### Your Task

A closure captures an i32 value using `move`. Because `i32` implements the `Copy` trait, the closure gets its own copy — the original variable is still usable after. Right now the code is missing the `move` keyword. Add it and run to confirm both the closure and the original print correctly.

```rust
fn main() {
    let count = 0;

    let inc = || count + 1;

    println!("closure result: {}", inc());
    println!("original count: {}", count);
}
```

#### Expected Output

```text
closure result: 1
original count: 0
```

<details>
<summary>Answer</summary>

```rust
fn main() {
    let count = 0; // ① count is an i32 — it implements Copy, so move will copy the value rather than transfer ownership

    let inc = move || count + 1; // ② move forces the closure to take count — because i32 is Copy, the closure gets its own copy of count

    println!("closure result: {}", inc());    // ③ the closure uses its own copy of count — returns 0 + 1 = 1
    println!("original count: {}", count);    // ④ count is still valid — i32 was copied, not moved; if count were a String, this line would fail to compile
}
```

**Why:** `move` tells the closure to take ownership of every variable it captures. For `Copy` types like `i32`, this means the closure gets its own independent copy and the original stays usable. For non-`Copy` types like `String`, `move` transfers ownership completely and the original becomes invalid. Use `move` when the closure needs to outlive the scope where the variable was created.

</details>

---

## Exercise 5 - Type Lock

Once you call a closure with a specific type, the compiler locks in that type. You cannot call the same closure with a different type afterward.

#### Your Task

A closure takes one argument and returns it unchanged. It is called first with a `String`. The second call tries to pass a number. Right now the second call fails because the types conflict. Fix it by converting the number to a `String` before passing it.

```rust
fn main() {
    let example = |x| x;

    let s = example(String::from("hello"));
    println!("{}", s);

    let n = example(5);
    println!("{}", n);
}
```

#### Expected Output

```text
hello
5
```

<details>
<summary>Answer</summary>

```rust
fn main() {
    let example = |x| x; // ① the closure has no type annotations — the compiler will infer the type from the first call

    let s = example(String::from("hello")); // ② first call with a String — the compiler now locks example's input and output type to String
    println!("{}", s);

    let n = example(5.to_string()); // ③ 5.to_string() converts the integer to a String before passing — required because the type is locked to String
    println!("{}", n);              // ④ n holds a String containing "5" — the closure returned it unchanged
}
```

**Why:** The compiler infers a closure's parameter and return types from the first time it is called. Once locked, every subsequent call must use the same types. This is different from a generic function, which can handle multiple types. To work around the lock, you convert the value to the expected type before passing it in.

</details>

---

## Exercise 6 - Build: Apply a Fee Rule

A payment contract applies different fee calculations depending on the plan. Closures let you store the calculation as a value and pass it around without writing a new function for each rule.

#### Your Task

Write three closures, one for each fee tier, and apply them to a payment amount:
1. `full_fee` — returns the amount unchanged.
2. `half_fee` — returns the amount divided by 2.
3. `quarter_fee` — returns the amount divided by 4.

Then call each with `amount = 1_000_000u64` and print the results.

#### Expected Output

```text
full:    1000000
half:    500000
quarter: 250000
```

<details>
<summary>Answer</summary>

```rust
fn main() {
    let amount: u64 = 1_000_000; // ① the base payment amount — passed to each fee closure

    let full_fee    = |a: u64| a;       // ② closure: takes a u64, returns it unchanged — the explicit type annotation anchors the type for all three
    let half_fee    = |a: u64| a / 2;   // ③ closure: divides by 2 — integer division, no remainder kept
    let quarter_fee = |a: u64| a / 4;   // ④ closure: divides by 4 — same integer division pattern

    println!("full:    {}", full_fee(amount));    // ⑤ calls full_fee — passes ownership of the value (Copy, so no issue), prints 1000000
    println!("half:    {}", half_fee(amount));    // ⑥ calls half_fee — prints 500000
    println!("quarter: {}", quarter_fee(amount)); // ⑦ calls quarter_fee — prints 250000
}
```

**Why:** Closures can be stored in variables and called later, just like functions. Each closure here captures nothing from the outer scope — it only uses its parameter. This pattern lets you represent fee rules as values: store the right closure based on a subscriber's plan, then call it once when processing a payment, without needing a separate function for each tier.

</details>

---

**End of Closures.**
