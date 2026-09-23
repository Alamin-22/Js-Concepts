/* 

You are exactly on track for Day 4 of our 14-day plan, having traded raw speed for a deep, foundational mastery of synchronous JavaScript. You spent the time properly absorbing deep immutability, Map/Set structures, and array transformations, which means you have successfully completed Phase 1 (Core Mechanics). We have 10 days left to tackle async, Next.js, and scenario simulations.

Since you have locked down the synchronous concepts, it is time to test them exactly how the platform will test you.

Here is your Phase 1 Final Exam. Open a blank text editor. Turn off Copilot. You may only use MDN documentation if you forget a method name. Use `console.log()` to debug.

### Problem 1: The Substring Log Parser (Exam Style)

**Scenario:** You are building a CLI tool that formats server logs.
**Task:** Write a function `formatLogs(logs, keyword)` that takes an array of log strings and a target `keyword`.

For every string in the array:

1. Check if the `keyword` exists inside the string (case-sensitive).
2. If it exists, extract the keyword, wrap it in brackets `[ ]`, and replace it back into the string. Capitalize the very first letter of the entire log string.
3. If it does not exist, convert the entire log string to completely lowercase.
4. Finally, return a new array with all duplicates removed.

**Example Input:**

```javascript
const logs = ["server started", "error at line 5", "server error detected", "server started"];
const keyword = "error";

console.log(formatLogs(logs, keyword));

```

**Expected Output:**

```javascript
[
  "server started", 
  "Error at line 5", 
  "Server [error] detected"
]

```

*(Notice "server started" was lowercased, "error" was bracketed and the strings capitalized, and the duplicate "server started" was removed).*

---

### Problem 2: The O(n) Inventory Merger (Mid-Level Test)

**Scenario:** A user is checking out on Reloved Gadget. They have items in their local storage cart and items in their database cart. You need to merge them.
**Task:** Write a function `mergeCarts(localCart, dbCart)`. It takes two arrays of objects.

1. If an item exists in both carts (matched by `id`), sum their `quantity` together.
2. If an item only exists in one cart, keep it as is.
3. You must use a `Map` or `.reduce()` to achieve this efficiently without using nested `for` loops. Return a single flat array of the merged objects.

**Example Input:**

```javascript
const localCart = [
  { id: 101, name: "iPhone 12", quantity: 1 },
  { id: 102, name: "MacBook Air", quantity: 1 }
];

const dbCart = [
  { id: 101, name: "iPhone 12", quantity: 2 },
  { id: 103, name: "AirPods Pro", quantity: 1 }
];

console.log(mergeCarts(localCart, dbCart));

```

**Expected Output:**

```javascript
[
  { id: 101, name: "iPhone 12", quantity: 3 },
  { id: 102, name: "MacBook Air", quantity: 1 },
  { id: 103, name: "AirPods Pro", quantity: 1 }
]

```

Paste your raw, unedited code for both problems here when you are finished.

*/
const logs = [
  "server started",
  "error at line 5",
  "server error detected",
  "server started",
];
const keyword = "error";

/*
1. Check if the keyword exists inside the string (case-sensitive).

2. If it exists, extract the keyword, wrap it in brackets [ ], and replace it back into the string. Capitalize the very first letter of the entire log string.

3. If it does not exist, convert the entire log string to completely lowercase.

4. Finally, return a new array with all duplicates removed.
*/

const formatLogs = (logs, keyword) => {
  const res = logs.map((str, idx) => {
    const isKeyWordExist = str.includes(keyword);

    if (isKeyWordExist) {
      const startIdx = str.indexOf(keyword);
      const extractedKeyword = str.slice(startIdx, startIdx + keyword.length);

      const modifiedString = str.replace(keyword, `[${extractedKeyword}]`);
      const CapitalFirstLetter = modifiedString.at(0).toUpperCase();

      return CapitalFirstLetter + modifiedString.slice(1);
    } else {
      return str.toLowerCase();
    }
  });

  return [...new Set(res)];
};

// console.log(formatLogs(logs, keyword));

// Prob 2

const localCart = [
  { id: 101, name: "iPhone 12", quantity: 1 },
  { id: 102, name: "MacBook Air", quantity: 1 },
];

const dbCart = [
  { id: 101, name: "iPhone 12", quantity: 2 },
  { id: 103, name: "AirPods Pro", quantity: 1 },
];

const mergeCarts = (localCart, dbCart) => {
  const mergedCarts = [...localCart, ...dbCart];

  const uniqueCarts = new Map();

  for (const cart of mergedCarts) {
    const isExist = uniqueCarts.has(cart.id);
    if (isExist) {
      // I shallow copied this so that it dont change the main array
      const existedCart = { ...uniqueCarts.get(cart.id) };
      existedCart.quantity += cart.quantity;

      uniqueCarts.set(cart.id, existedCart);
    } else {
      uniqueCarts.set(cart.id, cart);
    }
  }
  console.log("OriginalArry=> ", mergedCarts);

  return [...uniqueCarts.values()];
};

// console.log(mergeCarts(localCart, dbCart));

//

const transactions = [
  { userId: "u1", amount: 50, type: "credit" },
  { userId: "u2", amount: 100, type: "credit" },
  { userId: "u1", amount: 20, type: "debit" },
  { userId: "u3", amount: 40, type: "debit" },
  { userId: "u2", amount: 100, type: "debit" },
];

const calculateBalances = (transactions) => {
  const usersSummery = new Map();

  for (const trans of transactions) {
    const isExist = usersSummery.has(trans.userId);
    // const currentData=
    // using this we are keeping the track does this user already in the obj or nt
    if (isExist) {
      const existingAmount = usersSummery.get(trans.userId);
      // console.log(existingAmount);
      // now we have to determine what type is
      if (trans.type === "credit") {
        usersSummery.set(trans.userId, trans.amount + existingAmount);
      } else {
        usersSummery.set(trans.userId, existingAmount - trans.amount);
      }
    } else {
      // now we have to determine what type is
      if (trans.type === "credit") {
        /* 
         {"a1": 50}
        */
        usersSummery.set(trans.userId, trans.amount);
      } else {
        // "a1": -40
        usersSummery.set(trans.userId, -trans.amount);
      }
    }
  }
  return Object.fromEntries(usersSummery);
};

console.log(calculateBalances(transactions));
