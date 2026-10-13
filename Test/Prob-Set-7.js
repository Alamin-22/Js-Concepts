/* 
### Level 3: The Flaky API Retry

**Background:**
You are calling an external third-party API in your backend. However, this external API is "flaky"—it randomly crashes and throws errors about 50% of the time. If your backend just gives up on the first error, your users will have a terrible experience.

**Your Task:**
Write a wrapper function called `withRetry(callback, maxAttempts)`.

* It should try to execute the `callback`.
* If the callback succeeds, return the result immediately.
* If the callback `throws` an error, it should catch the error and try again, keeping track of how many attempts it has made.
* If it runs out of `maxAttempts`, it should finally throw a new error: `"API failed after X attempts"`.

**The Base Code:**

```javascript
// A fake API that randomly throws errors
const fetchExternalData = () => {
  const success = Math.random() > 0.7; // 30% chance of success
  if (!success) throw new Error("Network timeout!");
  return { status: 200, data: "Here is your data!" };
};

// 1. Write your wrapper function here
// const withRetry = (callback, maxAttempts) => { ... }

```

**Test Cases to Run:**

```javascript
const resilientFetch = withRetry(fetchExternalData, 3);

console.log("Attempting to fetch data...");
try {
  const result = resilientFetch();
  console.log("Success:", result);
} catch (error) {
  console.log("Total Failure:", error.message);
}

```

*/

const fetchExternalData = () => {
  const success = Math.random() > 0.7; // 30% chance of success
  // const success = false; // 30% chance of success
  if (!success) throw new Error("Network timeout!");
  return { status: 200, data: "Here is your data!" };
};

const withRetry = (callback, maxAttempts) => {
  return () => {
    let attemptsCounter = 1;
    let isSuccess = false;

    while (!isSuccess) {
      if (attemptsCounter > maxAttempts) {
        throw new Error(`"API failed after ${attemptsCounter - 1} attempts"`);
      }
      try {
        const result = callback();
        isSuccess = true;
        return result;
      } catch (error) {
        console.log(error);
      } finally {
        // incrementing attempts regardless of success and error meaning on every try it should count no mater what the situation is.
        attemptsCounter++;
      }
    }
  };
};

const resilientFetch = withRetry(fetchExternalData, 3);

console.log("Attempting to fetch data...");
try {
  const result = resilientFetch();
  console.log("Success:", result);
} catch (error) {
  console.log("Total Failure:", error.message);
}
