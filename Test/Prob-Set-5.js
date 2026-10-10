/* 
### Level 1: The Idempotent Payment Gateway

**Background:**
You are building the backend API for an e-commerce platform using Node.js and Express.

When a user clicks "Checkout", the frontend sends a request to your `chargeCreditCard` function. However, if the user has a bad internet connection, their browser might retry the network request 3 or 4 times automatically.

If your backend processes all 4 requests, the customer gets charged 4 times.

**Your Task:**
You need to write a wrapper function called `makeIdempotent(callback)`.
In software engineering, "idempotent" means a function can only be executed **exactly once**, no matter how many times it is called.

* On the first call, it should execute the callback and return the result.
* On all future calls, it should NOT execute the callback. Instead, it should just return the exact same result it generated the very first time.

**The Base Code:**

```javascript
const chargeCreditCard = (amount) => {
  console.log(`💳 [STRIPE API] Processing charge of $${amount}...`);
  return `RECEIPT_ID_${Math.floor(Math.random() * 10000)}`;
};

// 1. Write your wrapper function here
// const makeIdempotent = (callback) => { ... }

```

**Test Cases to Run:**

```javascript
const safeCharge = makeIdempotent(chargeCreditCard);

console.log("Client clicks checkout...");
const receipt1 = safeCharge(150);
console.log("Result 1:", receipt1);

console.log("\nClient's internet drops, browser auto-retries 2 more times...");
const receipt2 = safeCharge(150);
console.log("Result 2:", receipt2);

const receipt3 = safeCharge(150);
console.log("Result 3:", receipt3);

// If correct, the Stripe API should only log ONCE. 
// But receipt1, receipt2, and receipt3 should all contain the EXACT SAME receipt ID!

```

*/
const chargeCreditCard = (amount) => {
  console.log(`💳 [STRIPE API] Processing charge of $${amount}...`);
  return `RECEIPT_ID_${Math.floor(Math.random() * 10000)}`;
};

// well according to the problem statement I need to apply the cache mechanism to solve this 
const makeIdempotent = (callback) => {

};
