/* 

### CoderPad Screen: The API Debouncer

**The Base Function (Copy this into your code):**

```javascript
const fetchSearchResults = (query) => {
  console.log(`🌐 [NETWORK] Fetched results for: "${query}"`);
};

```

**Your Task:**
Create a wrapper function called `debounce(callback, delay)`. It must use a closure to remember a `timerId`.
Every time the returned inner function is called, it should:

1. Immediately clear the existing timer using `clearTimeout(timerId)`.
2. Start a new timer using `timerId = setTimeout(...)`.
3. The `setTimeout` should execute the `callback` with the provided arguments only after the `delay` has passed.

**Test Cases to Run:**

```javascript
// 1. Create a debounced version of our search with a 1000ms (1 second) delay
const smartSearch = debounce(fetchSearchResults, 1000);

// 2. Simulate a user typing quickly (these run instantly one after another)
console.log("Typing 'M'...");
smartSearch("M");

console.log("Typing 'Ma'...");
smartSearch("Ma");

console.log("Typing 'Mac'...");
smartSearch("Mac");

// If successful, the console will NOT show network logs for "M" or "Ma".
// It will wait 1 second, and only log the network request for "Mac".

```

*/
const fetchSearchResults = (query) => {
  console.log(`🌐 [NETWORK] Fetched results for: "${query}"`);
};

const debounce = (callback, delay) => {
  let timerId;

  return (qry) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback(qry);
    }, delay);
  };
};

const smartSearch = debounce(fetchSearchResults, 1000);

console.log("Typing 'M'...");
smartSearch("M");

console.log("Typing 'Ma'...");
smartSearch("Ma");

console.log("Typing 'Mac'...");
smartSearch("Mac");
