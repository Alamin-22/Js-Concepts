/* 
### CoderPad Screen: The Infinite Scroll

**Background:**
You are building the "Infinite Scroll" feature for a social media app (like TikTok or Instagram).

When a user scrolls to the bottom of the screen, the browser fires a `bottomReached` event, which triggers an API call to load the next 10 videos.

**The Bug:**
When users hit the bottom of the screen, the physics of the phone make it "bounce" slightly. This bounce fires the `bottomReached` event 20 times in a single second. Our backend database is crashing because it's receiving 20 identical requests to load the next batch of videos.

**Your Task:**
Create a wrapper function called `rateLimitAPI`. It must accept any API function and a cooldown time. It should execute the API call immediately on the first trigger, but then completely ignore all other triggers until the cooldown time has passed.

*(Note: In an interview, you might be asked to name this function yourself, or the interviewer might call it `rateLimitAPI` to see if you recognize that it requires the **Throttle** pattern).*

**The Base API (Copy this into your code):**

```javascript
const fetchNextVideoBatch = (userId) => {
  console.log(`📡 [NETWORK] Fetching next 10 videos for User: ${userId}...`);
  return "Success";
};

// 1. Write your wrapper function here
// const rateLimitAPI = ...

```

**Test Cases to Run:**

```javascript
const safeFetch = rateLimitAPI(fetchNextVideoBatch, 2000); // 2 second cooldown

console.log("User hits the bottom of the feed...");

// The phone bounces and fires 5 rapid events!
safeFetch("user_123"); // Should fetch
safeFetch("user_123"); // Should ignore
safeFetch("user_123"); // Should ignore
safeFetch("user_123"); // Should ignore
safeFetch("user_123"); // Should ignore

setTimeout(() => {
  console.log("2.5 seconds later, user hits the bottom again...");
  safeFetch("user_123"); // Should fetch again!
}, 2500);

```

*/

const fetchNextVideoBatch = (userId) => {
  console.log(`📡 [NETWORK] Fetching next 10 videos for User: ${userId}...`);
  return "Success";
};

const rateLimitAPI = (callback, delay) => {
  let isWaiting = false;

  return (event) => {
    if (isWaiting) return;
    else {
      callback(event);
      isWaiting = true;

      setTimeout(() => {
        isWaiting = false;
      }, delay);
    }
  };
};

const safeFetch = rateLimitAPI(fetchNextVideoBatch, 2000); // 2 second cooldown

console.log("User hits the bottom of the feed...");

// The phone bounces and fires 5 rapid events!
safeFetch("user_123"); // Should fetch
safeFetch("user_123"); // Should ignore
safeFetch("user_123"); // Should ignore
safeFetch("user_123"); // Should ignore
safeFetch("user_123"); // Should ignore

setTimeout(() => {
  console.log("2.5 seconds later, user hits the bottom again...");
  safeFetch("user_123"); // Should fetch again!
}, 2500);
