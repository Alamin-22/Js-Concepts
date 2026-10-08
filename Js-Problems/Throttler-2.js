/* 
### CoderPad Screen: The Responsive Chart

**The Base Function (Copy this into your code):**

```javascript
const redrawChart = (windowWidth) => {
  console.log(`📊 [UI] Heavy CPU Task: Redrawing chart to fit ${windowWidth}px`);
};

```

**Your Job:**

1. Write the `throttle(callback, delay)` function from memory.
2. Use the exact same logic you just mastered: the boolean flag (`isWaiting`) and the `setTimeout` to open and close the gate.
3. Wrap the `redrawChart` function in your throttler with a 500ms delay.

**Test Cases to Run:**

```javascript
// 1. Create the throttled version
const optimizedResize = throttle(redrawChart, 500);

console.log("User grabs the window edge and drags rapidly...");

// 2. Simulate 500 pixel changes happening instantly
optimizedResize(1200); // Gate open! Should redraw.
optimizedResize(1210); // Gate closed! Ignore.
optimizedResize(1225); // Gate closed! Ignore.
optimizedResize(1250); // Gate closed! Ignore.

// 3. Wait for the 500ms cooldown to finish, and simulate them still dragging
setTimeout(() => {
  console.log("500ms later, user is still dragging...");
  optimizedResize(1300); // Gate open! Should redraw.
}, 600);

```

*/
const redrawChart = (windowWidth) => {
  console.log(
    `📊 [UI] Heavy CPU Task: Redrawing chart to fit ${windowWidth}px`,
  );
};

const throttle = (callback, delay) => {
  let isWaiting = false;

  return (event) => {
    if (isWaiting) {
      return;
    } else {
      callback(event);
      isWaiting = true;
      setTimeout(() => {
        isWaiting = false;
      }, delay);
    }
  };
};

// 1. Create the throttled version
const optimizedResize = throttle(redrawChart, 500);

console.log("User grabs the window edge and drags rapidly...");

// 2. Simulate 500 pixel changes happening instantly
optimizedResize(1200); // Gate open! Should redraw.
optimizedResize(1210); // Gate closed! Ignore.
optimizedResize(1225); // Gate closed! Ignore.
optimizedResize(1250); // Gate closed! Ignore.

// 3. Wait for the 500ms cooldown to finish, and simulate them still dragging
setTimeout(() => {
  console.log("500ms later, user is still dragging...");
  optimizedResize(1300); // Gate open! Should redraw.
}, 600);
