/* 

### CoderPad Screen: The Delayed Checkout

**Background:**
You are building the checkout system for an e-commerce platform. When a user clicks "Buy," the system logs that the order is starting, and then simulates a network request to the payment gateway using a 1-second `setTimeout`.

**The Bug:**
The first console log works perfectly. But when the timeout finishes 1 second later, the system crashes or prints `undefined`. The callback function inside `setTimeout` has lost its connection to the `shoppingCart` object.

**The Base Code (Copy this into your code):**

```javascript
const shoppingCart = {
  userName: "Mollik",
  items: ["Mechanical Keyboard", "Wireless Mouse"],
  
  processOrder: function() {
    // This works fine! (Left of the dot rule applies to shoppingCart.processOrder)
    console.log(`Starting order for ${this.userName}...`);
    
    // THE BUG IS HERE: 
    // setTimeout strips the function of its context when it executes it later.
    setTimeout(function() {
      console.log(`✅ Success! ${this.userName}'s order of ${this.items.length} items is complete.`);
    }, 1000);
  }
};

// 1. Run this to see the bug in action:
shoppingCart.processOrder();

```
*/

const shoppingCart = {
  userName: "Mollik",
  items: ["Mechanical Keyboard", "Wireless Mouse"],

  processOrder: function () {
    // This works fine! (Left of the dot rule applies to shoppingCart.processOrder)
    console.log(`Starting order for ${this.userName}...`);

    setTimeout(() => {
      console.log(
        `✅ Success! ${this.userName}'s order of ${this.items.length} items is complete.`,
      );
    }, 1000);
  },
};

// 1. Run this to see the bug in action:
shoppingCart.processOrder();
