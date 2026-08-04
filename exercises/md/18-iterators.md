# Practice - Iterators

> Source for `iterators.html` — follows `_docs/STYLE-GUIDE.md` and `_docs/EXERCISE-PAGE-DESIGN.md`

Work through each exercise in the [Rust Playground](https://play.rust-lang.org).
Read the explainer, paste the starter code, fix it, then move on.
Check your answer only after you've tried.

---

## Quick reference

| Concept | What it means |
|---|---|
| Iterator | A value that produces a sequence of items one at a time. |
| `.iter()` | Borrows each element of a collection. The original collection stays usable. |
| `.into_iter()` | Takes ownership of each element. The original collection is consumed. |
| `.map(|x| ...)` | Transforms each item using a closure. Returns a new iterator. |
| `.filter(|x| ...)` | Keeps only items where the closure returns `true`. Returns a new iterator. |
| `.sum()` | Adds all items together and returns the total. Consumes the iterator. |
| `.collect()` | Gathers all items from an iterator into a collection like a `Vec`. Consumes the iterator. |
| Lazy | Iterators do nothing until you call a consuming method like `.sum()` or `.collect()`. |

---

## Exercise 1 - Creating an Iterator

You turn a collection into an iterator by calling `.iter()` on it. Once you have an iterator, you can loop over it, transform it, or consume it.

Calling `.iter()` borrows the elements. The original collection stays valid and usable after.

#### Your Task

A vector of numbers needs to be printed one by one using an iterator. Right now the code uses a regular index loop. Replace the `for i in 0..nums.len()` loop with a `for` loop that uses `.iter()` directly.

```rust
fn main() {
    let nums = vec![1, 2, 3];

    for i in 0..nums.len() {
        println!("{}", nums[i]);
    }

    println!("still have nums: {:?}", nums);
}
```

#### Expected Output

```text
1
2
3
still have nums: [1, 2, 3]
```

<details>
<summary>Answer</summary>

```rust
fn main() {
    let nums = vec![1, 2, 3]; // ① nums is a Vec<i32> — owns the three integers on the heap

    for n in nums.iter() { // ② .iter() creates an iterator that borrows each element — n is a reference (&i32), not an owned value
        println!("{}", n); // ③ Rust auto-dereferences n when printing — no need to write *n
    }

    println!("still have nums: {:?}", nums); // ④ nums is still valid — .iter() only borrowed, it did not consume the vector
}
```

**Why:** `.iter()` produces an iterator that borrows each element from the collection. Because it borrows rather than consumes, the original vector is still usable after the loop finishes. This is the standard way to read through a collection in Rust without giving up ownership. If you need to consume the elements, use `.into_iter()` instead.

</details>

---

## Exercise 2 - sum

`.sum()` is a consuming adapter. It takes ownership of the iterator, adds all the items together, and returns the total. Once consumed, the iterator cannot be used again.

#### Your Task

A vector holds payment amounts. Use `.iter()` and `.sum()` to add them all together and print the total. You will need to annotate the type of `total` because `sum` needs to know what type to collect into.

```rust
fn main() {
    let payments = vec![100_000u64, 250_000, 500_000];

    // use .iter().sum() to get the total
    let total: u64 = 0;

    println!("total: {}", total);
}
```

#### Expected Output

```text
total: 850000
```

<details>
<summary>Answer</summary>

```rust
fn main() {
    let payments = vec![100_000u64, 250_000, 500_000]; // ① Vec of u64 amounts — the u64 suffix on the first element sets the type for the whole vec

    let total: u64 = payments.iter().sum(); // ② .iter() borrows each element; .sum() adds them all and returns the total — the : u64 annotation tells the compiler what type to produce

    println!("total: {}", total); // ③ prints 850000 — the sum of all three amounts
}
```

**Why:** `.sum()` is a consuming adapter: it runs through the iterator and adds every element together. The type annotation on `total` is required because `.sum()` is generic and the compiler needs to know what number type to produce. Using `.iter()` instead of `.into_iter()` means `payments` is still valid after the sum, because only a borrow was consumed, not the vector itself.

</details>

---

## Exercise 3 - map

`.map()` transforms each item using a closure. It returns a new iterator with the transformed values. Because iterators are lazy, nothing happens until you call a consuming method on the result.

`.collect()` is the consuming method that gathers the transformed items into a new `Vec`.

#### Your Task

A vector holds amounts in lamports. Use `.iter()`, `.map()`, and `.collect()` to create a new vector where every amount is doubled.

```rust
fn main() {
    let amounts = vec![100u64, 200, 300];

    // use .iter().map(...).collect() to double each amount
    let doubled: Vec<u64> = vec![];

    println!("{:?}", doubled);
}
```

#### Expected Output

```text
[200, 400, 600]
```

<details>
<summary>Answer</summary>

```rust
fn main() {
    let amounts = vec![100u64, 200, 300]; // ① original vector — untouched after the chain runs

    let doubled: Vec<u64> = amounts.iter().map(|a| a * 2).collect(); // ② .iter() borrows each element as &u64; .map() applies the closure to each; .collect() gathers the new values into a Vec<u64>

    println!("{:?}", doubled); // ③ prints [200, 400, 600] — the original amounts doubled; amounts is still usable
}
```

**Why:** `.map()` applies a transformation to every element and produces a new iterator with the results. It is lazy, meaning no work happens until `.collect()` is called at the end. The closure receives a reference because `.iter()` borrows, but Rust auto-dereferences for arithmetic so `a * 2` works without writing `*a * 2`. The result is a completely new `Vec` — the original is unchanged.

</details>

---

## Exercise 4 - filter

`.filter()` keeps only the items where the closure returns `true`. Like `.map()`, it is lazy and returns a new iterator. You still need `.collect()` to get a `Vec` out.

#### Your Task

A vector holds payment amounts. Use `.filter()` to keep only amounts above 150. Collect the results into a new `Vec`.

```rust
fn main() {
    let amounts = vec![50u64, 100, 200, 300, 75];

    // use .iter().filter(...).collect() to keep amounts above 150
    let large: Vec<&u64> = vec![];

    println!("{:?}", large);
}
```

#### Expected Output

```text
[200, 300]
```

<details>
<summary>Answer</summary>

```rust
fn main() {
    let amounts = vec![50u64, 100, 200, 300, 75]; // ① original vector with five amounts

    let large: Vec<&u64> = amounts.iter().filter(|a| **a > 150).collect(); // ② .iter() gives &u64; .filter() receives &&u64 (reference to a reference); ** dereferences twice to compare the raw value; .collect() builds a Vec of references

    println!("{:?}", large); // ③ prints [200, 300] — the two amounts above 150; amounts is still valid
}
```

**Why:** `.filter()` passes a reference to each element into the closure. Because `.iter()` already produces `&u64`, the filter closure receives `&&u64` — a reference to a reference. Writing `**a` dereferences both layers to get the plain `u64` for comparison. The resulting `Vec<&u64>` holds references into the original vector, so the original `amounts` must remain alive as long as `large` is used.

</details>

---

## Exercise 5 - Chaining map and filter

`.map()` and `.filter()` can be chained. The output of one becomes the input of the next. The whole chain is lazy — nothing runs until `.collect()` or another consuming method is called at the end.

#### Your Task

A vector holds subscriber IDs paired with plan tier numbers. Use `.iter()`, `.filter()` to keep only premium subscribers (tier above 1), then `.map()` to extract just the ID. Collect the results into a `Vec<u32>`.

```rust
fn main() {
    let subscribers: Vec<(u32, u8)> = vec![
        (1001, 1),
        (1002, 2),
        (1003, 1),
        (1004, 3),
    ];

    // filter for tier > 1, then map to just the ID
    let premium_ids: Vec<u32> = vec![];

    println!("{:?}", premium_ids);
}
```

#### Expected Output

```text
[1002, 1004]
```

<details>
<summary>Answer</summary>

```rust
fn main() {
    let subscribers: Vec<(u32, u8)> = vec![ // ① vector of tuples — each is (subscriber_id, plan_tier)
        (1001, 1),
        (1002, 2),
        (1003, 1),
        (1004, 3),
    ];

    let premium_ids: Vec<u32> = subscribers
        .iter()
        .filter(|(_, tier)| *tier > 1) // ② destructures each tuple reference — _ ignores the id; *tier dereferences to compare the u8 value
        .map(|(id, _)| *id)            // ③ destructures again — _ ignores the tier; *id dereferences the u32 reference to produce an owned value
        .collect();                    // ④ gathers the owned u32 IDs into a new Vec<u32>

    println!("{:?}", premium_ids); // ⑤ prints [1002, 1004] — the two subscribers with tier above 1
}
```

**Why:** Chaining `.filter()` and `.map()` creates a pipeline: first select the items you want, then transform them into the shape you need. Each step returns a new lazy iterator, so nothing runs until `.collect()` is called. Destructuring with `(id, _)` and `(_, tier)` inside the closures lets you name only the field you care about, ignoring the rest with `_`.

</details>

---

## Exercise 6 - Build: Process a Subscriber Payment List

A payment contract receives a list of (wallet address, amount) pairs. It needs to skip zero-amount entries, apply a 10% fee to each valid amount, and return the total fees collected.

#### Your Task

Given the vector below, use `.iter()`, `.filter()`, `.map()`, and `.sum()` in a single chain to:
1. Skip any entry where the amount is 0.
2. Calculate 10% of each valid amount (use integer division: `amount / 10`).
3. Sum all the fees into a single `u64` total.

```rust
fn main() {
    let payments: Vec<(&str, u64)> = vec![
        ("wallet_a", 1_000_000),
        ("wallet_b", 0),
        ("wallet_c", 500_000),
        ("wallet_d", 250_000),
    ];

    // chain filter, map, and sum here
    let total_fees: u64 = 0;

    println!("total fees: {}", total_fees);
}
```

#### Expected Output

```text
total fees: 175000
```

<details>
<summary>Answer</summary>

```rust
fn main() {
    let payments: Vec<(&str, u64)> = vec![ // ① each entry is a tuple of (wallet address, lamport amount)
        ("wallet_a", 1_000_000),
        ("wallet_b", 0),
        ("wallet_c", 500_000),
        ("wallet_d", 250_000),
    ];

    let total_fees: u64 = payments
        .iter()
        .filter(|(_, amount)| *amount > 0)  // ② skip zero-amount entries — *amount dereferences the u64 reference from .iter()
        .map(|(_, amount)| amount / 10)     // ③ calculate 10% fee for each valid amount — integer division, no rounding
        .sum();                             // ④ add all fees together into a single u64 — : u64 on total_fees tells the compiler what type to produce

    println!("total fees: {}", total_fees); // ⑤ wallet_a: 100_000, wallet_c: 50_000, wallet_d: 25_000 — total 175_000
}
```

**Why:** The iterator chain reads like a contract rule written in plain English: take all payments, skip the empty ones, take 10% of each, add them up. Each step in the chain is lazy — no work is done until `.sum()` runs at the end. This pattern replaces manual loops and index tracking, making the logic easier to read and harder to get wrong.

</details>

---

**End of Iterators.**
