/* 
### CoderPad Screen: The Analytics Dashboard

**Background:**
Your company has an analytics dashboard that scans through a massive array of user logs to find specific event types. The function `analyzeLogs` takes a noticeable amount of CPU time to run.

The product manager noticed a UX issue: users frequently toggle between "CLICK", "HOVER", and "CLICK" again. Right now, going back to "CLICK" freezes the page because it re-runs the entire scan from scratch.

**Your Task:**
Create a wrapper function called `withMemoization`. It must accept any slow function as an argument and return a high-performance version of that function. The new function should remember previous searches and instantly return the result if the same event type is searched again, bypassing the slow function entirely.

**The Setup (Copy this into your code):**

```javascript
const analyzeLogs = (eventType) => {
  console.log(`⏳ [CPU] Scanning 50,000 logs for "${eventType}"...`);
  return `Result: 432 instances of ${eventType}`;
};

// 1. Create your wrapper function here...
// const withMemoization = ...

```

**Test Cases to Run:**

```javascript
const fastAnalytics = withMemoization(analyzeLogs);

// User searches "CLICK" (Should scan logs)
console.log(fastAnalytics("CLICK"));

// User searches "HOVER" (Should scan logs)
console.log(fastAnalytics("HOVER"));

// User searches "CLICK" again (Must NOT scan logs, should return instantly from memory)
console.log(fastAnalytics("CLICK"));

// User searches "HOVER" again (Must NOT scan logs, should return instantly from memory)
console.log(fastAnalytics("HOVER"));

```
*/

const analyzeLogs = (eventType) => {
  console.log(`⏳ [CPU] Scanning 50,000 logs for "${eventType}"...`);
  return `Result: 432 instances of ${eventType}`;
};

const withMemoization = (slowFunc) => {
  const cache = {};
  return (event) => {
    if (event in cache) {
      console.log(`Remembering ${event} from the cache!`);
      return cache[event];
    } else {
      console.log(`No Cache Found for  => ${event}`);
      const result = slowFunc(event);
      cache[event] = result;
      return result;
    }
  };
};

const fastAnalytics = withMemoization(analyzeLogs);

// User searches "CLICK" (Should scan logs)
console.log(fastAnalytics("CLICK"));

// User searches "HOVER" (Should scan logs)
console.log(fastAnalytics("HOVER"));

// User searches "CLICK" again (Must NOT scan logs, should return instantly from memory)
console.log(fastAnalytics("CLICK"));

// User searches "HOVER" again (Must NOT scan logs, should return instantly from memory)
console.log(fastAnalytics("HOVER"));
