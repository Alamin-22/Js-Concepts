/* 
### CoderPad Screen: The Scroll Throttler

**The Base Function (Copy this into your code):**

```javascript
const updateScrollAnimation = (pixelsScrolled) => {
  console.log(`🎬 [UI] Updating animation for scroll position: ${pixelsScrolled}px`);
};

```

**Your Job:**

1. Write a function called `throttle(callback, delay)`.
2. Inside `throttle`, create a private closure variable called `isWaiting` and set it to `false`.
3. Return an anonymous function that accepts a single argument `(eventData)`.
4. Inside that returned inner function:
* **The Guard:** If `isWaiting` is `true`, immediately `return` (do nothing, ignore the event).
* **The Action:** If `isWaiting` is `false`, call the `callback(eventData)`.
* **The Cooldown:** Set `isWaiting = true`. Then, start a `setTimeout`. When the timeout finishes (after `delay` milliseconds), flip `isWaiting` back to `false` so the function can be used again.



**Test Cases to Run:**

```javascript
const optimizedScroll = throttle(updateScrollAnimation, 1000); // 1 second cooldown

console.log("User scrolls slightly...");
optimizedScroll(150); // Should execute instantly

console.log("User scrolls frantically within the same second...");
optimizedScroll(155); // Should be ignored
optimizedScroll(160); // Should be ignored
optimizedScroll(175); // Should be ignored

// Wait for the 1-second cooldown to finish, then scroll again
setTimeout(() => {
  console.log("1 second later, user scrolls again...");
  optimizedScroll(300); // Should execute
}, 1100);

```

*/

const updateScrollAnimation = (pixelsScrolled) => {
  console.log(
    `🎬 [UI] Updating animation for scroll position: ${pixelsScrolled}px`,
  );
};

const throttle = (callback, delay) => {
  let isWaiting = false;

  return (eventData) => {
    if (isWaiting) {
      return;
    } else {
      callback(eventData);
      isWaiting = true;
      setTimeout(() => {
        isWaiting = false;
      }, delay);
    }
  };
};

const optimizedScroll = throttle(updateScrollAnimation, 1000); // 1 second cooldown

console.log("User scrolls slightly...");
optimizedScroll(150); // Should execute instantly

console.log("User scrolls frantically within the same second...");
optimizedScroll(155); // Should be ignored
optimizedScroll(160); // Should be ignored
optimizedScroll(175); // Should be ignored

// Wait for the 1-second cooldown to finish, then scroll again
setTimeout(() => {
  console.log("1 second later, user scrolls again...");
  optimizedScroll(300); // Should execute
}, 1100);
