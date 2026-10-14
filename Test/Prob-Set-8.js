/* 
**The Challenge: Asynchronous Task Scheduler with Concurrency Limit**

**Scenario**
When handling bulk operations in a Node.js backend or a React frontend—like uploading images, making multiple third-party API calls, or querying a database—using `Promise.all` can trigger rate limits or overload the system. You need to process an array of asynchronous tasks but restrict how many can run simultaneously.

**Requirements**

1. Write a function `runWithConcurrency(tasks, limit)` that takes an array of promise-returning functions (`tasks`) and an integer (`limit`).
2. The function must execute the tasks concurrently but never exceed the specified `limit` of active promises at any given time.
3. As soon as one task finishes, the next pending task in the queue should immediately start.
4. The function must return a Promise that resolves with an array of the results in the **exact same order** as the original `tasks` array, regardless of which task finished first.
5. *Bonus/Edge Case*: Ensure the function can gracefully handle or propagate errors if a task rejects.

**Starter Code**

```javascript
async function runWithConcurrency(tasks, limit) {
  // Your implementation here
}

// --- TEST CASES ---
const delay = (ms, value) => new Promise(resolve => setTimeout(() => resolve(value), ms));

// Simulated API calls or database queries
const tasks = [
  () => delay(1000, 'Task 1 (1s)'),
  () => delay(500, 'Task 2 (0.5s)'),
  () => delay(300, 'Task 3 (0.3s)'),
  () => delay(2000, 'Task 4 (2s)'),
  () => delay(100, 'Task 5 (0.1s)')
];

// With limit = 2, the total execution time should be optimized,
// but no more than 2 tasks should be running at exactly the same time.
runWithConcurrency(tasks, 2).then(results => {
  console.log('Final Results:', results);
  // Expected output order: ['Task 1 (1s)', 'Task 2 (0.5s)', 'Task 3 (0.3s)', 'Task 4 (2s)', 'Task 5 (0.1s)']
}).catch(err => console.error(err));

```
*/

const runWithConcurrency = async (task, limit) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

const delay = (ms, value) =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

const tasks = [
  () => delay(1000, "Task 1 (1s)"),
  () => delay(500, "Task 2 (0.5s)"),
  () => delay(300, "Task 3 (0.3s)"),
  () => delay(2000, "Task 4 (2s)"),
  () => delay(100, "Task 5 (0.1s)"),
];

runWithConcurrency(tasks, 2)
  .then((results) => {
    console.log("Final Results:", results);
    // Expected output order: ['Task 1 (1s)', 'Task 2 (0.5s)', 'Task 3 (0.3s)', 'Task 4 (2s)', 'Task 5 (0.1s)']
  })
  .catch((err) => console.error(err));
