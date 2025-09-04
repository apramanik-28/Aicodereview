Your `sum` function is almost there, but it has a crucial problem: `a` and `b` are not defined within the function's
scope, nor are they passed in as arguments.

In JavaScript, when you define a function, you typically specify the values it needs to operate on as **parameters**.
Then, when you **call** the function, you provide **arguments** for those parameters.

Here's how to fix it and make it a proper, reusable sum function:

---

### The Correct Way: Using Parameters

This is the standard and most flexible way to write a sum function.

```javascript
function sum(a, b) { // 'a' and 'b' are now parameters
return a + b;
}

// --- How to use it ---

// Call the function and pass in the numbers you want to sum as arguments
let result1 = sum(5, 3); // a will be 5, b will be 3
console.log(result1); // Output: 8

let result2 = sum(10, -2); // a will be 10, b will be -2
console.log(result2); // Output: 8

let result3 = sum(0, 0);
console.log(result3); // Output: 0
```

**Explanation:**

1. **`function sum(a, b)`**: We've added `a` and `b` inside the parentheses. These are now **parameters** of the `sum`
function. When the function is called, the values passed to it will be assigned to `a` and `b` respectively.
2. **`return a + b`**: Inside the function, `a` and `b` now refer to the values that were passed in, so their sum can be
correctly calculated and returned.

---

### Summing More Than Two Numbers (Advanced)

If you want a `sum` function that can add any number of arguments, you can use the **rest parameter (`...`)** along with
array methods like `reduce`.

```javascript
function sumAll(...numbers) { // '...numbers' gathers all arguments into an array
// The reduce method iterates through the array and accumulates a sum
return numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

// --- How to use it ---

let total1 = sumAll(1, 2, 3, 4, 5);
console.log(total1); // Output: 15

let total2 = sumAll(10, 20);
console.log(total2); // Output: 30

let total3 = sumAll(7);
console.log(total3); // Output: 7

let total4 = sumAll(); // No arguments
console.log(total4); // Output: 0 (because of the initial value '0' in reduce)
```

**Explanation:**

1. **`function sumAll(...numbers)`**: The `...numbers` syntax (the rest parameter) collects all arguments passed to the
function into a single array named `numbers`.
2. **`numbers.reduce(...)`**:
* `reduce()` is an array method that executes a reducer function on each element of the array, resulting in a single
output value.
* `(accumulator, currentValue) => accumulator + currentValue` is the reducer function.
* `accumulator`: The value resulting from the previous iteration, or the initial value (`0`) for the first iteration.
* `currentValue`: The current element being processed in the `numbers` array.
* `0` (the second argument to `reduce`): This is the **initial value** for the `accumulator`. It's good practice to
provide this, especially for sum operations, to ensure correct behavior even with empty arrays.

---

### Why your original code didn't work:

```javascript
function sum(){return a + b}
```

If you tried to run this, you would get a `ReferenceError: a is not defined` (and similarly for `b`), because JavaScript
doesn't know where `a` and `b` are supposed to come from. They are not local variables, parameters, or globally defined
variables (unless you had `let a = 1; let b = 2;` *outside* the function, but that's generally bad practice for a
reusable function).