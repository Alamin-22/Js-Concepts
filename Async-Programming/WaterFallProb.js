/* 
// ❌ THE WATERFALL (BAD)
// If each request takes 2 seconds, the user waits 6 seconds total.
const user = await fetchUser(); 
const posts = await fetchPosts();
const stats = await fetchStats();



CONCURRENT (GOOD)
try {
  const results = await Promise.all([
    fetchUser(),  // results[0]
    fetchPosts(), // results[1]
    fetchStats()  // results[2]
  ]);
  
  // Or, destructure immediately for cleaner code:
  // const [user, posts, stats] = await Promise.all([...])
  
} catch (err) {
  // If ANY of the three fail, it immediately jumps here
} */

const fetchUser = () =>
  new Promise((res) => setTimeout(() => res({ name: "Alex" }), 1000));
const fetchPosts = () =>
  new Promise((res) => setTimeout(() => res(["Post 1", "Post 2"]), 1500));
const fetchStats = (shouldFail) =>
  new Promise((res, rej) => {
    setTimeout(() => {
      if (shouldFail) return rej("Error: Analytics database is down");
      res({ views: 400, likes: 23 });
    }, 500);
  });

// const loadDashboard = async (shouldFailStats) => {
//   try {
//     // it will fail if one promise rejected
//     const [user, posts, stats] = await Promise.all([
//       fetchUser(),
//       fetchPosts(),
//       fetchStats(shouldFailStats),
//     ]);
//     console.log(
//       `Dashboard loaded for [${user.name}] with [${stats.views}] views.`,
//     );
//   } catch (err) {
//     console.log(err);
//   } finally {
//     console.log("Loading sequence terminated");
//   }
// };

// loadDashboard(false);
// loadDashboard(true);

const loadResilientDashboard = async (shouldFailStats) => {
  try {
    // it will fail if one promise rejected
    const [userResult, postsResult, statsResult] = await Promise.allSettled([
      fetchUser(),
      fetchPosts(),
      fetchStats(shouldFailStats),
    ]);

    const userName =
      userResult.status === "fulfilled"
        ? userResult.value.name
        : "Unknown User";
    const Views =
      statsResult.status === "fulfilled" ? statsResult.value.views : "NA";

    console.log(`Dashboard loaded for [${userName}]. Views: [${Views}]`);
  } catch (err) {
    console.log(err);
  } finally {
    console.log("Loading sequence terminated");
  }
};

loadResilientDashboard(false);
