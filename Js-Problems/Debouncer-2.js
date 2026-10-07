/* 
### CoderPad Screen: The Analytics Batcher

**Background:**
Your e-commerce site tracks every time a user interacts with the page (e.g., "hovered_image", "clicked_buy", "scrolled_reviews").

Right now, calling `trackEvent()` fires a network request immediately. If a user triggers 5 events in 200 milliseconds, you are hammering your own server with 5 separate API requests.

You need to build a `createBatcher(callback, delay)` function. Instead of just debouncing and *throwing away* the previous events, this function must **accumulate** them. It should wait until the user stops triggering events for `delay` milliseconds, and then send *all* the collected events to the server in a single array.

**The Base API (Copy this into your code):**

```javascript
const sendToServer = (batchArray) => {
  console.log(`🚀 [NETWORK] Sending batch of ${batchArray.length} events:`, batchArray);
};

```

**Your Job:**
Write `createBatcher(callback, delay)`.

1. It must use a closure to remember **two** things: a timer, and an array holding the events.
2. It returns a function that accepts a single argument `(eventName)`.
3. When the returned function is called:
* It must add the `eventName` to the hidden array.
* It must clear any existing timer.
* It must start a new timer.


4. When the timer finally finishes (meaning the user paused):
* It must call the `callback` and pass in the entire accumulated array.
* It must **empty the array** so it is fresh for the next batch.



**Test Cases to Run:**

```javascript
const trackEvent = createBatcher(sendToServer, 500);

// Simulate a user doing a bunch of things very quickly
console.log("User interacts...");
trackEvent("page_view");
trackEvent("hover_product");
trackEvent("scroll_down");

// 500ms passes... 
// The console should log ONE network request containing all 3 events!

// Later, the user clicks something else
setTimeout(() => {
  trackEvent("click_buy");
}, 1000);

// Another 500ms passes...
// The console should log ONE network request containing just "click_buy".

```
 */

const sendToServer = (batchArray) => {
  console.log(
    `🚀 [NETWORK] Sending batch of ${batchArray.length} events:`,
    batchArray,
  );
};

const createBatcher = (callback, delay) => {
  let timerId;
  let arryofEvents = [];

  return (eventName) => {
    arryofEvents.push(eventName);
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback(arryofEvents);
      arryofEvents = [];
    }, delay);
  };
};

const trackEvent = createBatcher(sendToServer, 500);

// Simulate a user doing a bunch of things very quickly
console.log("User interacts...");
trackEvent("page_view");
trackEvent("hover_product");
trackEvent("scroll_down");

// 500ms passes...
// The console should log ONE network request containing all 3 events!

// Later, the user clicks something else
setTimeout(() => {
  trackEvent("click_buy");
}, 1000);

// Another 500ms passes...
// The console should log ONE network request containing just "click_buy".
