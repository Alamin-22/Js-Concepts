/* 
Q13: Explain Promises in JavaScript.
Answer: A Promise is an object representing the deferred completion or eventual failure of an asynchronous action. It serves as a structural placeholder for a future data return and lives inside one of three distinct phases:
Pending: The initial stage; the async operation is ongoing.
Fulfilled: The task completed successfully, passing data back through .then().
Rejected: The task encountered an exception, catching the failure state through .catch().

*/

/* 

Q14: Explain Async/Await mechanics. Does it block execution threads?
Answer: async/await is a structural cleaner syntax layer designed to write and process Promises sequentially. The await statement stalls execution progress strictly inside that local async function until the tracked promise settles.
Core Distinction: It never blocks the main JavaScript execution thread. While the async function stands by for a response, the engine continues processing external events, running other background tasks, and handling main execution queues uninterrupted.

*/
/* 
Q15: What occurs if you run an await command inside a standard array .forEach() block? How do you resolve it?
The Trap: The native .forEach() method completely ignores promises. If you supply an asynchronous execution loop, it fires off every single async statement concurrently and returns right away. It will not wait for your loops to finish before continuing execution on subsequent lines outside the block.
Sequential Resolution: Use a standard for...of block. It naturally recognizes the await keyword, pausing each individual iteration step until the targeted promise settles.
Parallel Resolution: Turn the collection into an array of active promises using .map(), then pass the entire array into Promise.all() to resolve them all concurrently.

*/

/* 
Q16: What is the difference between Promise.all() and Promise.allSettled()?
Promise.all(): Follows an aggressive "fail-fast" strategy. If you pass a batch of multiple promises to execute together and just one encounters a rejection, the entire wrapper instantly fails and drops into an error state, discarding any data from the operations that succeeded.
Promise.allSettled(): Evaluates every input item completely. It waits for every target operation to either resolve or reject, then returns a comprehensive array of results detailing the exact completion status and data payloads for each individual promise.
*/

/* 
What is an asynchronous race condition in a web interface, and how do you resolve it using native JavaScript?
The Problem: If a user fires off Request "A", then immediately changes tabs and fires off Request "B", a network delay could cause Request "A" to finish after Request "B". Request "A" will resolve last, overwriting the view layout with stale, incorrect data.
The Fix: Implement the native web platform AbortController API. Before triggering an identical or alternative network call, run controller.abort() on the active instance to instantly cancel and discard the unresolved network thread before launching the new request.


*/
