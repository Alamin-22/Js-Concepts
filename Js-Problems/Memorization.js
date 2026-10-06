/* 
### CoderPad Screen: The Memoization Wrapper

**The Expensive Function (Copy this into your code):**

```javascript
// A mock function that simulates a heavy CPU calculation
const heavyCalculation = (num) => {
  console.log(`⏱️ [CPU] Calculating heavy math for input: ${num}...`);
  return num * 100;
};

```

**Your Job:**

1. Write a function called `memoize(callback)`.
2. Inside `memoize`, create your private notebook: `const cache = {}`.
3. Return a new anonymous function that accepts a single argument `(arg)`.
4. Inside that returned function:
* **Check the notebook:** If `cache[arg]` already exists, log `"⚡ [CACHE] Returning saved result for: [arg]"` and return the saved value.
* **Do the math:** If it does NOT exist, run the callback: `const result = callback(arg)`.
* **Save it:** Save the result into your cache (`cache[arg] = result`), and then return the result.



**Test Cases to Run:**

```javascript
// 1. We pass our slow function into the memoizer to make a fast version!
const fastCalculation = memoize(heavyCalculation);

// 2. First time passing 5 (Should run the heavy CPU calculation)
console.log(fastCalculation(5)); 

// 3. Second time passing 5 (Should skip CPU and hit the Cache)
console.log(fastCalculation(5)); 

// 4. Passing a new number (Should run the heavy CPU calculation again)
console.log(fastCalculation(10)); 

// 5. Passing 10 again (Should hit the Cache)
console.log(fastCalculation(10));

```
*/

const heavyCalculation = (num) => {
  console.log(`⏱️ [CPU] Calculating heavy math for input: ${num}...`);
  return num * 100;
};

const memorize = (callback) => {
  const cache = {};
  return (arg) => {
    // if (cache[arg]) {
    if (arg in cache) {
      console.log(`"⚡ [CACHE] Returning saved result for: ${arg}"`);
      return cache[arg];
    } else {
      const result = callback(arg);
      cache[arg] = result;

      return result;
    }
  };
};

// 1. We pass our slow function into the memoizer to make a fast version!
const fastCalculation = memorize(heavyCalculation);

// 2. First time passing 5 (Should run the heavy CPU calculation)
console.log(fastCalculation(5));

// 3. Second time passing 5 (Should skip CPU and hit the Cache)
console.log(fastCalculation(5));

// 4. Passing a new number (Should run the heavy CPU calculation again)
console.log(fastCalculation(10));

// 5. Passing 10 again (Should hit the Cache)
console.log(fastCalculation(10));
