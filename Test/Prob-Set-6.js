/* 
### Level 2: The Analytics Batcher

**Background:**
You are working on the frontend of a Next.js application. Product managers want to track every time a user clicks a button (e.g., "Hovered Cart", "Clicked Checkout", "Viewed Profile").

If you send a separate `POST` request to the backend for every single click, the server will crash under the load.

**Your Task:**
Write a wrapper function called `createBatcher(callback, delay)`.
Instead of dropping events like a Throttle, or overriding events like a Debounce, a Batcher must **collect** them.

* Every time the wrapper is called with an event string, it should push that string into a private array.
* It should wait for the user to stop clicking for the specified `delay`.
* Once the delay passes with no new clicks, it should execute the `callback` with the *entire array* of collected events, and then empty the array so it's ready for the next batch.
|
**The Base Code:**

```javascript
const sendToServer = (eventArray) => {
  console.log(`🚀 [NETWORK] Sent batch of ${eventArray.length} events:`, eventArray);
};

// 1. Write your wrapper function here
// const createBatcher = (callback, delay) => { ... }

```

**Test Cases to Run:**

```javascript
const trackEvent = createBatcher(sendToServer, 2000);

console.log("User is clicking around rapidly...");
trackEvent("Viewed Homepage");
trackEvent("Hovered Cart");
trackEvent("Clicked Checkout");

// The console should be silent here.

setTimeout(() => {
  console.log("3 seconds later, user clicks something else...");
  trackEvent("Viewed Receipt");
}, 3000);

// Expected Output:
// User is clicking around rapidly...
// (2 seconds pause)
// 🚀 [NETWORK] Sent batch of 3 events: [ 'Viewed Homepage', 'Hovered Cart', 'Clicked Checkout' ]
// 3 seconds later, user clicks something else...
// (2 seconds pause)
// 🚀 [NETWORK] Sent batch of 1 events: [ 'Viewed Receipt' ]

```

*/

const sendToServer = (eventArray) => {
  console.log(
    `🚀 [NETWORK] Sent batch of ${eventArray.length} events:`,
    eventArray,
  );
};

const createBatcher = (callback, delay) => {
  let arryOfEvents = [];
  let timerId;
  return (event) => {
    arryOfEvents.push(event);
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback(arryOfEvents);
      arryOfEvents.length = 0;
      // arryOfEvents = [];
    }, delay);
  };
};

const trackEvent = createBatcher(sendToServer, 2000);

console.log("User is clicking around rapidly...");
trackEvent("Viewed Homepage");
trackEvent("Hovered Cart");
trackEvent("Clicked Checkout");

// The console should be silent here.

setTimeout(() => {
  console.log("3 seconds later, user clicks something else...");
  trackEvent("Viewed Receipt");
}, 3000);

// Expected Output:
// User is clicking around rapidly...
// (2 seconds pause)
// 🚀 [NETWORK] Sent batch of 3 events: [ 'Viewed Homepage', 'Hovered Cart', 'Clicked Checkout' ]
// 3 seconds later, user clicks something else...
// (2 seconds pause)
// 🚀 [NETWORK] Sent batch of 1 events: [ 'Viewed Receipt' ]
