/* 
You are building the registration form for a new app. You need to mock the backend database validation and the frontend submit handler.

Requirements:

The Mock API: Write a function registerUser(username, email).

It must simulate a network delay of 800 milliseconds.

If the username is strictly less than 4 characters long, it must fail with exactly: "Error: Username too short".

If the email does NOT contain an "@" symbol, it must fail with exactly: "Error: Invalid email format".

If both checks pass, it must succeed and return exactly: "Success: Account created for [username]". (Note: Insert the actual username into the string).

The Frontend Consumer: Write an async function handleRegistration(user, mail).

Before the request starts, it must log: "Showing loading spinner..."

It must call the API and log either the success message or the caught error.

When finished (regardless of success or failure), it must log: "Hiding loading spinner..."

------------test case----
handleRegistration("bob", "bob@email.com"); // Should fail (too short)
handleRegistration("sarah", "sarahemail.com"); // Should fail (no @)
handleRegistration("alex", "alex@email.com"); // Should succeed
*/

const registerUser = (username, email) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // it meaning i am setting if it is not 4 char long then i will return error
      if (username.length >= 4) {
        if (email.includes("@")) {
          resolve(`Success: Account created for [${username}]`);
        } else {
          reject("Error: Invalid email format");
        }
      } else {
        reject("Error: Username too short");
      }
    }, 800);
  });
};

const handleRegistration = async (user, mail) => {
  console.log("Showing loading spinner...");
  try {
    const res = await registerUser(user, mail);
    console.log(res);
  } catch (err) {
    console.log(err);
  } finally {
    console.log("Hiding loading spinner...");
  }
};

handleRegistration("bob", "bob@email.com"); // Should fail (too short)
// handleRegistration("sarah", "sarahemail.com"); // Should fail (no @)
// handleRegistration("alex", "alex@email.com"); // Should succeed
