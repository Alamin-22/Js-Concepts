/* 

1. **`Promise.race([promises])`**: Returns the very first Promise to finish, **whether it succeeds or fails**. It does not care about the outcome; it only cares about speed.
* *Real-world use:* Building a timeout wrapper. You "race" your API call against a timer that rejects after 5 seconds. If the API is too slow, the timer wins and aborts the operation.

2. **`Promise.any([promises])`**: Returns the very first Promise to **succeed**. It completely ignores rejections. (It only throws an error if *every single Promise* fails).
* *Real-world use:* High availability. You ping three redundant servers worldwide. One might be down, one might be slow, but `Promise.any` instantly grabs the first successful response that comes back.



Here is your final coding test to complete your async toolkit.

### CoderPad Screen: The Enterprise Network Client

**Background:**
You are optimizing a mission-critical application. First, you must ensure your main database never hangs the application by using a timeout. Second, you must load a heavy asset from the fastest available redundant server.

**Requirements:**

**Part 1: The Timeout Wrapper (`Promise.race`)**

1. **The Mock APIs:**
* Write `fetchDatabase()`: Resolves with exactly `"Data: User Profile"` after **2500ms**.
* Write `createTimeout(ms)`: A function that takes a millisecond value and *rejects* with exactly `"Error: Request timed out"` after that amount of time.


2. **The Consumer:** Write an `async` function `getProfileWithTimeout(timeoutMs)`.
* Inside a `try/catch` block, use `Promise.race()` to run `fetchDatabase()` and `createTimeout(timeoutMs)` against each other.
* `console.log` the winning result or the caught error.



**Part 2: The Redundant CDN (`Promise.any`)**

1. **The Mock APIs:**
* `serverEurope()`: Rejects with `"Error: EU server down"` after **500ms**.
* `serverAsia()`: Resolves with `"Asset: Image_Asia"` after **1500ms**.
* `serverUS()`: Resolves with `"Asset: Image_US"` after **800ms**.


2. **The Consumer:** Write an `async` function `getFastestAsset()`.
* Inside a `try/catch` block, use `Promise.any()` to call all three servers.
* `console.log` the winning successful result.



**Test Cases to Run:**

```javascript
// Part 1 Tests
getProfileWithTimeout(1000); // Timer is faster (1000ms vs 2500ms) -> Should fail with timeout error
getProfileWithTimeout(3000); // DB is faster (2500ms vs 3000ms) -> Should succeed with data

// Part 2 Test
getFastestAsset(); // Europe fails fast, US succeeds at 800ms, Asia succeeds at 1500ms -> Should print the US asset


*/

const fetchDatabase = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data: User Profile");
    }, 2500);
  });
};

const createTimeout = (ms) => {
  return new Promise((_resolve, reject) => {
    setTimeout(() => {
      reject("Error: Request timed out");
    }, ms);
  });
};

const getProfileWithTimeout = async (timeoutMs) => {
  try {
    const result = await Promise.race([
      fetchDatabase(),
      createTimeout(timeoutMs),
    ]);
    console.log(result);
  } catch (err) {
    console.log(err);
  } finally {
    console.log("Resolved done");
  }
};

const serverEurope = () => {
  return new Promise((_resolve, reject) => {
    setTimeout(() => {
      reject("Error: EU server down");
    }, 500);
  });
};

const serverAsia = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Asset: Image_Asia");
    }, 1500);
  });
};

const serverUS = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Asset: Image_US");
    }, 800);
  });
};

const getFastAsset = async () => {
  try {
    const result = await Promise.any([
      serverEurope(),
      serverAsia(),
      serverUS(),
    ]);

    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

// Part 1 Tests
getProfileWithTimeout(1000); // Timer is faster (1000ms vs 2500ms) -> Should fail with timeout error
getProfileWithTimeout(3000); // DB is faster (2500ms vs 3000ms) -> Should succeed with data

// Part 2 Test
getFastAsset(); // Europe fails fast, US succeeds at 800ms, Asia succeeds at 1500ms -> Should print the US asset
