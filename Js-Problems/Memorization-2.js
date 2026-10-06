/* 
### CoderPad Screen: The Math Teacher

**Background:**
You have a function that calculates the square of a number (multiplying a number by itself). We want to add a memory to it so that if we ask for the square of `99` twice, it only calculates it the first time.

**The Base Function (Copy this into your code):**

```javascript
const squareNumber = (num) => {
  console.log(`🧮 [MATH] Calculating ${num} * ${num}...`);
  return num * num;
};

```

**Your Job:**

1. Write a function called `memoizeMath(callback)`.
2. Inside `memoizeMath`, create your empty notebook: `const cache = {}`.
3. Return a new anonymous function that accepts a single argument `(n)`.
4. Inside the inner function:
* **Check the cache:** Use `if (n in cache)`. If it is true, log `"⚡ [CACHE] Remembered answer for ${n}"` and return `cache[n]`.
* **Calculate and Save:** If it is false, calculate the answer using `callback(n)`. Save it to the cache using `cache[n] = answer`, and then return the answer.



**Test Cases to Run:**

```javascript
const smartSquare = memoizeMath(squareNumber);

// 1. First time asking for 5 (Should calculate)
console.log(smartSquare(5));

// 2. Second time asking for 5 (Should use cache)
console.log(smartSquare(5));

// 3. First time asking for 99 (Should calculate)
console.log(smartSquare(99));

// 4. Second time asking for 99 (Should use cache)
console.log(smartSquare(99));

```

*/

const squareNumber = (num) => {
  console.log(`🧮 [MATH] Calculating ${num} * ${num}...`);
  return num * num;
};

const memoizeMath = (callback) => {
  const cache = {};
  return (n) => {
    if (n in cache) {
      console.log(`"⚡ [CACHE] Remembered answer for ${n}"`);
      return cache[n];
    } else {
      const res = callback(n);
      cache[n] = res;
      return res;
    }
  };
};

const smartSquare = memoizeMath(squareNumber);

// 1. First time asking for 5 (Should calculate)
console.log(smartSquare(5));

// 2. Second time asking for 5 (Should use cache)
console.log(smartSquare(5));

// 3. First time asking for 99 (Should calculate)
console.log(smartSquare(99));

// 4. Second time asking for 99 (Should use cache)
console.log(smartSquare(99));
