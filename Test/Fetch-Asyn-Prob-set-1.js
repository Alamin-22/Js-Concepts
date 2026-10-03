/* 
### CoderPad Screen: The Profile Aggregator

**Background:**
You are building the profile page for a social media application. To minimize loading time, you must fetch the user's profile information and their list of posts simultaneously from a real REST API. You must properly handle 404 errors, as the native `fetch` API will not catch them automatically.

**The Endpoints (Live JSONPlaceholder URLs):**

* User Profile: `[https://jsonplaceholder.typicode.com/users/$](https://jsonplaceholder.typicode.com/users/$){userId}`
* User Posts: `[https://jsonplaceholder.typicode.com/posts?userId=$](https://jsonplaceholder.typicode.com/posts?userId=$){userId}`

**Requirements:**

1. Write an `async` function called `fetchUserDashboard(userId)`.
2. Use `Promise.all()` to fire two native `fetch()` requests simultaneously (one for the profile, one for the posts).
3. Once the network headers return, check the `ok` status of the **User Profile** response. If it is not ok (e.g., a 404), manually `throw` an error with exactly this string: `"Error: User [userId] not found"`.
4. If the responses are `ok`, you must parse the JSON. *(Hint: `.json()` is also asynchronous. You can use another `Promise.all()` to parse both bodies concurrently).*
5. Extract the `name` and `email` from the user data, and calculate the total number of posts from the posts array.
6. If everything succeeds, log exactly: `"Dashboard: [name] ([email]) has written [postCount] posts."`
7. If anything fails, catch the error and log its message (`err.message`).

**Test Cases to Run:**

```javascript
// 1. Valid user (ID 1 exists and has 10 posts)
await fetchUserDashboard(1); 

// 2. Invalid user (ID 900 does not exist, returns 404)
await fetchUserDashboard(900); 

```
*/

const fetchUserDashboard = async (userId) => {
  try {
    const [profileRes, postRes] = await Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`),
    ]);

    if (!profileRes.ok) {
      throw new Error(`Error: User [${userId}] not found`);
    }
    if (!postRes.ok) {
      throw new Error(`Error: Post Not Found for the UserId:${userId}`);
    }

    const profileData = await profileRes.json();
    const postData = await postRes.json();

    console.log(
      `"Dashboard: [${profileData.name}] ([${profileData.email}]) has written [${postData.length}] posts."`,
    );
  } catch (err) {
    console.log(err.message);
  }
};

// await fetchUserDashboard(1);

await fetchUserDashboard(900);
