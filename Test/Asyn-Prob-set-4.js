/* 
### CoderPad Screen: The Resilient Dashboard

**Background:**
You are building the dashboard for an application. You must fetch the main user profile. If that succeeds, you must fetch their Posts and their Todos concurrently.

However, the Todos API is currently broken and returning a 404. You must use `Promise.allSettled()` to handle the secondary data so the dashboard doesn't crash.

**The Trap (Read Carefully):**
Remember that `fetch()` does NOT reject on a 404! This means if you put a raw `fetch()` inside `Promise.allSettled()`, it will report as `"fulfilled"` because the network succeeded. You must manually check `.ok` on the responses *inside* your fallback logic before you try to call `.json()`!

**The Endpoints:**

* User: `[https://jsonplaceholder.typicode.com/users/$](https://jsonplaceholder.typicode.com/users/$){id}`
* Posts: `[https://jsonplaceholder.typicode.com/posts?userId=$](https://jsonplaceholder.typicode.com/posts?userId=$){id}`
* Todos: `[https://jsonplaceholder.typicode.com/BROKEN_ENDPOINT](https://jsonplaceholder.typicode.com/BROKEN_ENDPOINT)` *(Intentionally broken to simulate a 404)*

**Your Job:**

1. Write an `async` function `buildDashboard(id)`.
2. **Phase 1: The Critical Fetch**
* `fetch` the User endpoint.
* If it is `!ok`, throw `"Fatal Error: User not found"`.
* Parse the user JSON.


3. **Phase 2: The Secondary Data**
* Use `Promise.allSettled()` to `fetch` the Posts and the Todos concurrently.
* Extract the data safely.
* For Posts: Check if the promise fulfilled AND if `value.ok` is true. If so, parse the `.json()`. Otherwise, fallback to `[]`.
* For Todos: Do the exact same thing. (Because the endpoint is broken, it should safely fall back to `[]`).




4. **Phase 3: The Output**
* Log exactly: `"Dashboard ready for [name]. Posts: [posts length], Todos: [todos length]"`


5. **Phase 4: Error Handling**
* Catch block logs the error message.
* Finally block logs `"Dashboard sequence complete"`.



**Test Cases to Run:**

```javascript
// 1. Valid user. Should get user, get posts, but fallback todos to []
await buildDashboard(1); 

// 2. Invalid user. Should throw Fatal Error immediately and skip Phase 2.
await buildDashboard(999); 

```

*/

const buildDashboard = async (id) => {
  try {
    const userRes = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    );

    if (!userRes.ok) {
      throw new Error(`"Fatal Error: User not found"`);
    }
    const [postRes, todosRes] = await Promise.allSettled([
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`),
      fetch(`https://jsonplaceholder.typicode.com/BROKEN_ENDPOINT`),
    ]);
    // console.log(userRes);
    // console.log(postRes.value.ok);
    // console.log(postRes.value.json());
    const userData = await userRes.json();
    // as used promise.allSettled meaning every things will be resolved meaning even for the errors code will not stop it will move to fallback, still checking both
    const postData =
      postRes.status === "fulfilled" && postRes.value.ok
        ? await postRes.value.json()
        : [];

    const todosData =
      todosRes.status === "fulfilled" && todosRes.value.ok
        ? await todosRes.value.json()
        : [];
    console.log();

    // console.log(userData);

    console.log(
      `"Dashboard ready for ${userData.name}. Posts: ${postData.length}, Todos: ${todosData.length}"`,
    );
  } catch (err) {
    console.log(err);
  } finally {
    console.log(`"Dashboard sequence complete"`);
  }
};

await buildDashboard(1);

// await buildDashboard(999);
