/* 

### CoderPad Screen: The FinTech Dashboard

**Background:**
You are the lead frontend engineer for a financial application. When a user logs in, you need to aggregate data from multiple microservices to build their dashboard. Some services are critical, some are flaky, and some have redundant backups.

You must orchestrate these network requests for maximum speed and resilience without crashing the app unless absolutely necessary.

**The Mock APIs (Copy these into your code - DO NOT MODIFY THEM):**

```javascript
// === MOCK APIs ===
const fetchAccount = (userId) => new Promise((res, rej) => {
  setTimeout(() => {
    if (userId === "user_blocked") rej("Error: Account suspended");
    else res({ name: "Sarah", id: userId });
  }, userId === "user_slow" ? 2000 : 800); // Slow user takes 2s, normal takes 800ms
});

const enforceTimeout = (ms) => new Promise((_, rej) => {
  setTimeout(() => rej("Error: Account fetch timed out"), ms);
});

const fetchTransactions = (userId) => new Promise((res, rej) => {
  setTimeout(() => {
    if (userId === "user_no_data") rej("Error: Transactions DB down");
    else res(["Txn1", "Txn2"]);
  }, 600);
});

const fetchCreditScore = (userId) => new Promise((res, rej) => {
  setTimeout(() => {
    if (userId === "user_no_data") rej("Error: Credit API down");
    else res(750);
  }, 900);
});

const getAvatarUS = () => new Promise((_, rej) => setTimeout(() => rej("US CDN Down"), 300));
const getAvatarEU = () => new Promise((res) => setTimeout(() => res("Avatar_EU.png"), 700));
const getAvatarASIA = () => new Promise((res) => setTimeout(() => res("Avatar_ASIA.png"), 1500));
// =================

```

**Your Job:**

Write an `async` function called `loadDashboard(userId)`.

**Phase 1: UI Lock & Critical Path**

1. Immediately log: `"Initializing dashboard..."`
2. Fetch the user's account data using `fetchAccount(userId)`.
3. **The strict requirement:** You must abort the account fetch if it takes longer than **1200ms** by utilizing `enforceTimeout(1200)`.
4. If the account fetch fails (either due to the timeout or being blocked), it must immediately throw to your `catch` block and halt the rest of the initialization.

**Phase 2: Secondary Data & Redundancy**

1. If the account data succeeds, you must now fetch the user's secondary data (`fetchTransactions` and `fetchCreditScore`) AND their avatar simultaneously.
2. For the secondary data, fetch them together. If `fetchTransactions` fails, fallback to an empty array `[]`. If `fetchCreditScore` fails, fallback to the string `"N/A"`.
3. For the avatar, query all three redundant CDNs (`getAvatarUS`, `getAvatarEU`, `getAvatarASIA`) and extract the fastest successful image.

**Phase 3: The Output**

1. Once all data is gathered, construct and log this exact string:
`"Dashboard loaded for [name]. Avatar: [avatarData]. Score: [creditData]. Txns: [txn length]"` *(Note: map the length of the transactions array, not the array itself).*
2. In your catch block, log the exact error caught.
3. At the absolute end of the execution, regardless of what happened, log: `"Dashboard initialization sequence finished"`

**Test Cases to Run:**

// 1. Standard success. 
loadDashboard("user_normal"); 

// 2. Account fetch is too slow (2000ms vs 1200ms timeout). Should catch timeout error.
loadDashboard("user_slow"); 

// 3. Account fetches fine, but secondary data fails. Should show fallbacks.
loadDashboard("user_no_data"); 

// 4. Account directly rejects. Should catch suspension error.
loadDashboard("user_blocked"); 

*/
const fetchAccount = (userId) =>
  new Promise((res, rej) => {
    setTimeout(
      () => {
        if (userId === "user_blocked") rej("Error: Account suspended");
        else res({ name: "Sarah", id: userId });
      },
      userId === "user_slow" ? 2000 : 800,
    ); // Slow user takes 2s, normal takes 800ms
  });

const enforceTimeout = (ms) =>
  new Promise((_, rej) => {
    setTimeout(() => rej("Error: Account fetch timed out"), ms);
  });

const fetchTransactions = (userId) =>
  new Promise((res, rej) => {
    setTimeout(() => {
      if (userId === "user_no_data") rej("Error: Transactions DB down");
      else res(["Txn1", "Txn2"]);
    }, 600);
  });

const fetchCreditScore = (userId) =>
  new Promise((res, rej) => {
    setTimeout(() => {
      if (userId === "user_no_data") rej("Error: Credit API down");
      else res(750);
    }, 900);
  });

const getAvatarUS = () =>
  new Promise((_, rej) => setTimeout(() => rej("US CDN Down"), 300));
const getAvatarEU = () =>
  new Promise((res) => setTimeout(() => res("Avatar_EU.png"), 700));
const getAvatarASIA = () =>
  new Promise((res) => setTimeout(() => res("Avatar_ASIA.png"), 1500));

const loadDashboard = async (userId) => {
  console.log("Initializing dashboard...");
  try {
    const userAccData = await Promise.race([
      fetchAccount(userId),
      enforceTimeout(1200),
    ]);

    const [tranxResponse, CreiditResponse] = await Promise.allSettled([
      fetchTransactions(),
      fetchCreditScore(),
    ]);

    const AvatarResponse = await Promise.any([
      getAvatarUS(),
      getAvatarEU(),
      getAvatarASIA(),
    ]);

    const transactionsData =
      tranxResponse.status === "fulfilled" ? tranxResponse.value : [];
    const creditsData =
      CreiditResponse.status === "fulfilled" ? CreiditResponse.value : "N/A";

    const userName = userAccData.name;
    const avatarData = AvatarResponse;

    console.log(
      `"Dashboard loaded for [${userName}]. Avatar: [${avatarData}]. Score: [${creditsData}]. Txns: [${transactionsData.length}]"`,
    );
  } catch (err) {
    console.log(err);
  } finally {
    console.log("Dashboard initialization sequence finished");
  }
};

// 1. Standard success.
loadDashboard("user_normal");

// 2. Account fetch is too slow (2000ms vs 1200ms timeout). Should catch timeout error.
loadDashboard("user_slow");

// 3. Account fetches fine, but secondary data fails. Should show fallbacks.
loadDashboard("user_no_data");

// 4. Account directly rejects. Should catch suspension error.
loadDashboard("user_blocked");
