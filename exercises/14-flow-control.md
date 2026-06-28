# Practice - Flow Control

> DRAFT FOR REVIEW Follows `EXERCISE-STYLE-GUIDE.md`

Work through each exercise in the [Rust Playground](https://play.rust-lang.org).  
Read the explainer, paste the starter code, fix it, then move on.  
Check your answer only after you've tried.

---

## Quick reference

| Concept | What it means |
|---|---|
| `if` / `else if` / `else` | Check a condition. If true, run the first block. If not, check the next `else if`. If none match, run `else`. |
| `for` over `..` | `1..5` means 1, 2, 3, 4. The last number is EXCLUDED. |
| `for` over `..=` | `1..=5` means 1, 2, 3, 4, 5. The last number is INCLUDED. |
| `while` | Keep running the block as long as the condition is `true`. Make sure the condition eventually becomes `false` or you get an infinite loop. |
| `break` | Immediately exit the loop. |
| `continue` | Skip the rest of this iteration and jump to the next one. |
| `loop` | An infinite loop. You must use `break` inside it to stop, or it runs forever. |
| `loop` as expression | `let result = loop { ... break value; }` `break` returns a value from the loop. |
| Loop labels | `'outer:` labels a loop so `break 'outer;` exits that specific loop even from inside a nested one. |

---

## Track A - Generic Rust

---

### Exercise 1 If / Else If / Else Chain

This exercise tests chaining `if`, `else if`, and `else` to handle multiple conditions. In a contract, you might check a subscriber's plan tier and apply different pricing rules.

The code wants to print a message based on a number's sign: negative, positive, or zero. Right now it only handles negative and positive.

`if` checks a condition. If true, it runs the block after it. `else if` adds another check when the first one was false. `else` catches everything that didn't match any earlier condition. Think of it like a traffic light: green means go, yellow means slow down, red means stop you need all three to cover every case.

```rust
fn main() {
    let n = 5;

    if n < 0 {
        println!("negative");
    } else if n > 0 {
        println!("positive");
    }
}
```

**Add an `else` block that prints `zero` when `n` is exactly 0. Test by changing `n` to `0`.**

<details>
<summary>Answer</summary>

```rust
fn main() {
    let n = 5;

    if n < 0 {
        println!("negative");
    } else if n > 0 {
        println!("positive");
    } else {
        println!("zero");
    }
}
```

`else` runs when none of the earlier conditions matched. Without it, `n = 0` would print nothing. In a contract, every condition must have a path even the "catch everything else" case.

</details>

---

### Exercise 2 If-Else as an Expression

This exercise tests using `if` / `else` as an expression that returns a value. In a contract, you might compute a fee multiplier: `1x` for small payments, `0.5x` for large ones.

The code wants to assign a scaled number to `big_n` using `if-else`. Right now the two arms return different types.

An `if-else` expression evaluates to the last expression in whichever arm runs. But every arm must return the same type. Think of it like a vending machine: either you get a snack or you get change but both slots must give the same kind of item.

```rust
fn main() {
    let n = 5;

    let big_n = if n < 10 && n > -10 {
        n * 10
    } else {
        n / 2.0
    };

    println!("{}", big_n);
}
```

**Fix the `else` arm so both arms return the same type. Use `f32` for both and cast `n` where needed.**

**Common mistake:** Forgetting that `n * 10` is `i32` while `n / 2.0` is `f32`. Both arms must return the same type.

<details>
<summary>Answer</summary>

```rust
fn main() {
    let n = 5;

    let big_n = if n < 10 && n > -10 {
        n as f32 * 10.0
    } else {
        n as f32 / 2.0
    };

    println!("{}", big_n);
}
```

`as f32` converts `n` to a `f32` (floating-point number). Both arms now return `f32`, so `big_n` has a single type. The `if-else` expression works.

</details>

---

### Exercise 3 Exclusive vs Inclusive Range

This exercise tests the difference between `..` (exclusive) and `..=` (inclusive). In a contract, you might iterate over plan tiers 1 to 5 and need to know whether 5 is included or not.

The code wants to find a number that equals 100 inside a range. Right now it uses `..=` which includes 100 but causes a panic when the loop hits an off-by-one bug.

The `..` operator creates a range that EXCLUDES the last number. `1..100` means 1 through 99. The `..=` operator includes the last number: `1..=100` means 1 through 100. This is like a parking meter: pay for 1 hour and park for 60 minutes (`..=`) or 59 minutes (`..`).

```rust
fn main() {
    let mut n = 0;

    for i in 1..=100 {
        if i == 100 {
            n = i;
        }
    }

    println!("Found {}", n);
}
```

**Remove the `=` from `1..=100` and confirm `n` stays `0`. Then add it back and confirm `n` becomes `100`. Explain why.**

<details>
<summary>Answer</summary>

```rust
fn main() {
    let mut n = 0;

    for i in 1..100 {
        if i == 100 {
            n = i;
        }
    }

    println!("Found {}", n); // prints 0 because 100 is excluded
}
```

`1..100` stops at 99. The condition `i == 100` is never true. Removing `=` excludes the end value. In contract code, this distinction matters for date ranges, billing cycles, and iteration bounds.

</details>

---

### Exercise 4 `for` Loop Takes Ownership

This exercise tests understanding that a `for` loop takes ownership of the collection it iterates over. In a contract, you might iterate over a list of subscriber wallets and need to use it again afterward.

The code wants to print each name in an array, then print the whole array. Right now the `for` loop consumes the array and the second `println!` fails.

A `for` loop takes ownership of whatever you give it. For an array of `String` values, that means the array can't be used after the loop. To keep using the array, pass a reference with `&names`. Think of it like handing over a list: if you give the original, you don't have it anymore. If you give a photocopy, you keep the original.

```rust
fn main() {
    let names = ["alice", "bob", "carol"];

    for name in names {
        println!("{}", name);
    }

    println!("Array: {:?}", names);
}
```

**Fix the `for` loop by passing `&names` instead of `names`. Do not add or remove any lines.**

<details>
<summary>Answer</summary>

```rust
fn main() {
    let names = ["alice", "bob", "carol"];

    for name in &names {
        println!("{}", name);
    }

    println!("Array: {:?}", names);
}
```

`for name in &names` borrows the array instead of taking ownership. The loop can still read each element, but after the loop, `names` is still usable. This is the same borrowing concept from Section 3.

</details>

---

### Exercise 5 `enumerate()` for Index and Value

This exercise tests using `enumerate()` to get both the position and the value during iteration. In a contract, you might print a numbered list of subscribers while processing them.

The code wants to print each element with its 1-based position. Right now `enumerate()` is missing and the output is wrong.

`enumerate()` takes an iterator and returns a tuple `(index, value)` for each item. You must call `.iter()` on the array first because `enumerate()` works on iterators, not arrays directly. Think of it like a numbered list: the method gives you both the item name and its position in line.

```rust
fn main() {
    let items = ["basic", "premium", "enterprise"];

    for item in items.iter() {
        println!("Tier: {}", item);
    }
}
```

**Add `enumerate()` to the loop and print both the 1-based index and the tier name.**

<details>
<summary>Answer</summary>

```rust
fn main() {
    let items = ["basic", "premium", "enterprise"];

    for (i, item) in items.iter().enumerate() {
        println!("{}: {}", i + 1, item);
    }
}
```

`items.iter().enumerate()` returns `(0, "basic")`, `(1, "premium")`, `(2, "enterprise")`. We add `1` to `i` for human-friendly 1-based numbering. `enumerate()` is the standard way to get both position and value.

</details>

---

### Exercise 6 `while` Loop with Termination

This exercise tests writing a `while` loop that eventually stops. In a contract, you might retry processing until all pending payments are cleared.

The code wants to count from 0 to 9 and print each number. Right now `n` never changes, so the loop runs forever.

A `while` loop keeps running as long as its condition is `true`. If nothing inside the loop changes the condition, it never stops this is called an infinite loop. Every `while` loop needs a way to make the condition eventually `false`. Think of it like a countdown timer: if the number never decreases, the alarm never goes off.

```rust
fn main() {
    let mut n = 0;

    while n < 10 {
        println!("{}", n);
    }
}
```

**Add one line inside the loop so `n` increases by 1 each time. The expected output is `0` through `9`.**

<details>
<summary>Answer</summary>

```rust
fn main() {
    let mut n = 0;

    while n < 10 {
        println!("{}", n);
        n += 1;
    }
}
```

`n += 1` increments `n` by 1 each iteration. When `n` reaches 10, the condition `n < 10` becomes `false` and the loop stops. Without this line, the program would print `0` forever.

</details>

---

### Exercise 7 `break` and `continue`

This exercise tests using `break` to exit a loop early and `continue` to skip an iteration. In a contract, you might skip invalid subscriber IDs and stop processing on a critical error.

The code wants to print only even numbers from 0 to 9 and stop entirely when it sees a `7`. Right now both keywords are missing.

`break` immediately exits the loop no more iterations. `continue` skips the rest of the current iteration and jumps to the next one. Think of `break` like an emergency exit: one trigger and you're out. Think of `continue` like a fast-forward button: skip this ad, show the next one.

```rust
fn main() {
    for n in 0..10 {
        if n == 7 {
            // stop the whole loop here
        }
        if n % 2 != 0 {
            // skip this iteration
        }
        println!("{}", n);
    }
}
```

**Replace the comments with `break` and `continue`. The expected output is `0`, `2`, `4`, `6` only.**

<details>
<summary>Answer</summary>

```rust
fn main() {
    for n in 0..10 {
        if n == 7 {
            break;
        }
        if n % 2 != 0 {
            continue;
        }
        println!("{}", n);
    }
}
```

`break` exits when `n == 7`, so we never see 7, 8, or 9. `continue` skips odd numbers, so only even numbers get printed. Output: `0`, `2`, `4`, `6`.

</details>

---

### Exercise 8 `loop` as an Expression

This exercise tests using `loop` as an expression that returns a value. In a contract, you might keep adjusting a fee until it meets a target, then return the final value.

The code wants to double a counter each iteration and return the final value when it hits a threshold. Right now `break` returns the counter itself instead of double.

A `loop` runs forever unless something inside breaks it. `break value;` exits the loop AND returns that value as the result of the `loop` expression. This is useful when you don't know in advance how many iterations you need. Think of it like a slot machine: you keep pulling until you win, then `break` with your prize.

```rust
fn main() {
    let mut counter = 10;

    let result = loop {
        if counter >= 20 {
            break counter;
        }
        counter += 1;
    };

    println!("{}", result);
}
```

**Change the `break` expression so it returns `counter * 2`. Expected output: `40`.**

<details>
<summary>Answer</summary>

```rust
fn main() {
    let mut counter = 10;

    let result = loop {
        if counter >= 20 {
            break counter * 2;
        }
        counter += 1;
    };

    println!("{}", result);
}
```

`counter` reaches 20 after 10 increments. `break counter * 2;` returns `40` (20 * 2). The semicolon after `break` is part of the loop expression syntax. `loop` as expression is powerful for "compute until done" logic.

</details>

---

## Track B - Contract

All exercises below apply flow control to a subscription-payment contract. The same rules different context.

---

### Exercise 1 Tier-Based Fee Rules

This exercise tests chaining conditions to apply different fee rules. In a contract, a fee calculator might lower the rate for large payments.

The code wants to apply a fee multiplier based on payment size: under 1M lamports = full fee, 1M to 5M = half fee, over 5M = quarter fee. Right now it only handles the first two.

`if` / `else if` / `else` chains let you handle multiple exclusive conditions. Only one arm runs the first whose condition is `true`. Think of it like triage: critical patients first, then serious, then everyone else.

```rust
fn main() {
    let payment = 3_000_000u64;

    if payment < 1_000_000 {
        println!("fee: full");
    } else if payment <= 5_000_000 {
        println!("fee: half");
    }
}
```

**Add an `else` block that prints `fee: quarter` for payments over 5M. Test with `payment = 6_000_000`.**

<details>
<summary>Answer</summary>

```rust
fn main() {
    let payment = 6_000_000u64;

    if payment < 1_000_000 {
        println!("fee: full");
    } else if payment <= 5_000_000 {
        println!("fee: half");
    } else {
        println!("fee: quarter");
    }
}
```

`else` catches everything that didn't match earlier conditions. With `payment = 6_000_000`, neither `if` nor `else if` is true, so `else` runs. This is how tiered pricing works in real contracts.

</details>

---

### Exercise 2 Compute Discount as Expression

This exercise tests using `if-else` as an expression to compute a discount. In a contract, a discount might be derived from the plan type without separate variables.

The code wants to assign a `discount` based on plan length: 12 months get 20%, 6 months get 10%, everything else gets 0%. Right now the return types don't match.

An `if-else` expression evaluates to whichever arm runs, but every arm must return the same type. If one arm computes a percentage and another prints text, the types conflict.

```rust
fn main() {
    let months = 12u64;

    let discount = if months == 12 {
        20
    } else if months == 6 {
        10
    } else {
        "none"
    };

    println!("Discount: {}", discount);
}
```

**Fix the `else` branch so all arms return the same type. Use a number for all three branches.**

<details>
<summary>Answer</summary>

```rust
fn main() {
    let months = 12u64;

    let discount = if months == 12 {
        20
    } else if months == 6 {
        10
    } else {
        0
    };

    println!("Discount: {}%", discount);
}
```

All three arms now return `u64`. The `else` branch returns `0` instead of a string. Type consistency is required for `if-else` as expression. Output: `Discount: 20%`.

</details>

---

### Exercise 3 Iterate Over Billing Cycles

This exercise tests the difference between `..` and `..=` in a billing context. In a contract, you might iterate over billing months and need to know whether the final month is included.

The code wants to process months 1 through 12 and mark the 12th as "final". Right now `..` excludes the 12th month, so the condition is never true.

`1..13` includes 1 through 12 (13 excluded). `1..=12` includes 1 through 12 (12 included). Both give the same numbers, but `..=` makes the boundary explicit. In billing, explicit boundaries prevent off-by-one errors.

```rust
fn main() {
    for month in 1..12 {
        if month == 12 {
            println!("Month {}: final", month);
        } else {
            println!("Month {}", month);
        }
    }
}
```

**Change the range to `..=` so month 12 is included and prints `Month 12: final`.**

<details>
<summary>Answer</summary>

```rust
fn main() {
    for month in 1..=12 {
        if month == 12 {
            println!("Month {}: final", month);
        } else {
            println!("Month {}", month);
        }
    }
}
```

`1..=12` generates 1 through 12 inclusive. The condition `month == 12` is now true on the final iteration. In contract code where months map to payment cycles, inclusive ranges prevent missed payments.

</details>

---

### Exercise 4 Iterate Over Subscribers Without Losing the List

This exercise tests borrowing an array in a `for` loop. In a contract, you might process a subscriber list and then access it again for a summary.

The code wants to print each plan name, then print the total number of plans. Right now the `for` loop takes ownership of the array and the second print fails.

A `for` loop takes ownership of whatever you give it. For an array of `String`, this means the array is consumed. Pass a reference with `&plans` to keep the array usable after the loop.

```rust
fn main() {
    let plans = [
        String::from("basic"),
        String::from("premium"),
        String::from("enterprise"),
    ];

    for plan in plans {
        println!("Processing: {}", plan);
    }

    println!("Total plans: {}", plans.len());
}
```

**Fix the `for` loop by passing `&plans` instead of `plans`. Do not add or remove any lines.**

<details>
<summary>Answer</summary>

```rust
fn main() {
    let plans = [
        String::from("basic"),
        String::from("premium"),
        String::from("enterprise"),
    ];

    for plan in &plans {
        println!("Processing: {}", plan);
    }

    println!("Total plans: {}", plans.len());
}
```

`for plan in &plans` borrows the array. The loop can read each plan, but after the loop, `plans` is still usable. This is the same borrowing from Section 3 applied to iteration.

</details>

---

### Exercise 5 Numbered Subscriber List

This exercise tests using `enumerate()` to print a numbered list of subscribers. In a contract, you might generate a report showing subscribers with their position.

The code wants to print each subscriber with a 1-based number. Right now there's no index.

`enumerate()` produces `(index, value)` tuples from an iterator. The index is zero-based, so add 1 for human-friendly numbering. This is common in dashboards and reports.

```rust
fn main() {
    let subscribers = ["alice", "bob", "carol", "dave"];

    for name in subscribers.iter() {
        println!("Subscriber: {}", name);
    }
}
```

**Add `enumerate()` to the loop so the output is `1: alice`, `2: bob`, etc.**

<details>
<summary>Answer</summary>

```rust
fn main() {
    let subscribers = ["alice", "bob", "carol", "dave"];

    for (i, name) in subscribers.iter().enumerate() {
        println!("{}: {}", i + 1, name);
    }
}
```

`enumerate()` starts at 0, so `i + 1` gives 1-based numbering. Output: `1: alice`, `2: bob`, `3: carol`, `4: dave`. This pattern is standard for any numbered list in a UI or report.

</details>

---

### Exercise 6 Retry Until All Payments Processed

This exercise tests writing a `while` loop that processes payments until done. In a contract, a batch processor might keep working until `pending` reaches zero.

The code wants to process payments until none remain. Right now `pending` never decreases, so the loop runs forever.

Every `while` loop needs something inside to eventually make the condition `false`. Without it, the program hangs. Think of it like a to-do list: if you never check off items, the list is never done.

```rust
fn main() {
    let mut pending = 5u64;

    while pending > 0 {
        println!("Processing payment...");
    }

    println!("All done");
}
```

**Add one line inside the loop so `pending` decreases by 1 each time. Expected output: 5 "Processing" lines, then "All done".**

<details>
<summary>Answer</summary>

```rust
fn main() {
    let mut pending = 5u64;

    while pending > 0 {
        println!("Processing payment...");
        pending -= 1;
    }

    println!("All done");
}
```

`pending -= 1` decreases the counter. After 5 iterations, `pending` is 0 and the condition `pending > 0` becomes `false`. The loop exits and "All done" prints. In a real contract, this might process a queue of pending transactions.

</details>

---

### Exercise 7 Skip Invalid Payments, Stop on Error

This exercise tests using `continue` to skip bad data and `break` to stop on a critical problem. In a contract, you might skip subscribers with zero balance and halt if a wallet is frozen.

The code wants to process payments but skip amounts of 0 and stop entirely if amount exceeds 1M. Right now neither keyword is used.

`continue` jumps to the next iteration, skipping the rest of the current one. `break` exits the loop completely. In payment processing, `continue` means "skip this one" and `break` means "shut down the pipeline."

```rust
fn main() {
    let amounts = [100_000u64, 0, 500_000, 2_000_000, 300_000];

    for amount in amounts.iter() {
        if *amount == 0 {
            // skip this one
        }
        if *amount > 1_000_000 {
            // stop the whole loop
        }
        println!("Processed {}", amount);
    }
}
```

**Replace the comments with `continue` and `break`. Expected output: `Processed 100000`, `Processed 500000` only.**

<details>
<summary>Answer</summary>

```rust
fn main() {
    let amounts = [100_000u64, 0, 500_000, 2_000_000, 300_000];

    for amount in amounts.iter() {
        if *amount == 0 {
            continue;
        }
        if *amount > 1_000_000 {
            break;
        }
        println!("Processed {}", amount);
    }
}
```

`continue` skips the zero. `break` stops when `2_000_000 > 1_000_000`. The last value `300_000` is never reached because the loop exited. In production, `break` might trigger an alert while `continue` logs a warning.

</details>

---

### Exercise 8 Write Cold

No starter code. No hints. Write it from scratch.

A contract needs to find the first subscriber with a premium plan and return their index. Write a program that:

1. Creates an array `plans = ["basic", "premium", "basic", "premium", "basic"]`.
2. Uses `loop` (not `for`) to iterate through the array.
3. Stops with `break` when it finds `"premium"`.
4. Returns the index as the loop's value.
5. Prints `Premium subscriber at index: X`.

**Write the full program. Expected output: `Premium subscriber at index: 1`.**

<details>
<summary>Answer</summary>

```rust
fn main() {
    let plans = ["basic", "premium", "basic", "premium", "basic"];
    let mut i = 0;

    let index = loop {
        if plans[i] == "premium" {
            break i;
        }
        i += 1;
    };

    println!("Premium subscriber at index: {}", index);
}
```

`loop` is used here because we need early exit with a return value. `break i;` exits the loop and returns the index. `i += 1` advances the counter. The first `"premium"` is at index 1, so that's the result. `loop` with `break value` is ideal for "search until found" logic.

</details>

---

## What's next

Flow control connects everything you've learned: ownership (who holds the data), borrowing (how you read it), and Option (how you handle missing data). The next sections build on these patterns with collections, methods, and error handling all using the same `if`, `match`, `for`, and `loop` foundations.
