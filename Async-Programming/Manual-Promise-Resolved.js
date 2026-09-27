/* 
Challenge 1: The Login Simulator
You are building the login logic for a dashboard. The interviewer asks you to mock the backend authentication.

Your Job:

Create a function called loginUser(username, password) that returns a new Promise.

Inside the Promise, use a setTimeout of 1500 milliseconds to simulate server delay.

If username is "admin" AND password is "1234", call resolve() and pass it an object: { token: "abc-123", role: "admin" }.

If the credentials do not match, call reject() and pass the string "Invalid credentials".

Call the function using "admin" and "wrong_pass".

Chain .then() to log the token, .catch() to log the error, and .finally() to log "Authentication attempt finished".
*/

const loginUser = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "admin" && password === "1234") {
        resolve({ token: "abc-123", role: "admin" });
      } else {
        reject("Invalid Credentials");
      }
    }, 1500);
  });
};

// now resolving this promise
// loginUser("admin", "wrongpass")
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err))
//   .finally(() => console.log("The Login Promise has been resolved."));

// solving using async await and try catch logic

const handleLoginUser = async (userName, pass) => {
  try {
    const res = await loginUser(userName, pass);
    console.log(res);
  } catch (err) {
    console.log(err);
  } finally {
    console.log("Ended");
  }
};

handleLoginUser("admin", "wrongpass");

/* 
Challenge 2: The Image Uploader
You are building a profile picture uploader. The server rejects files that are too large.

Your Job:

Create a function uploadImage(fileSizeInMB) that returns a new Promise.

Use a setTimeout of 500 milliseconds.

If fileSizeInMB is strictly greater than 5, call reject() with "Error: File exceeds 5MB limit".

If it is 5 or less, call resolve() with "Success: Image uploaded".

Call the function with 8 (which should trigger the rejection).

Chain your .then(), .catch(), and .finally() to handle the result and print a "Resetting upload UI" message at the very end.
  
  */

const uploadImage = (fileSizeInMB) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fileSizeInMB <= 5) {
        resolve("Image Uploaded");
      } else {
        reject("Error: File exceeds 5MB limit");
      }
    }, 500);
  });
};

// resolving the promise using legacy Then Catch method
// uploadImage(8)
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err))
//   .finally(() => console.log("Promise Resolved"));

// now solving using modern Async Await and try catch method which we generally use in application

const resolveFileUPload = async (fileSize) => {
  try {
    const res = await uploadImage(fileSize);
    console.log(res);
  } catch (err) {
    console.log(err);
  } finally {
    console.log("resolved");
  }
};

resolveFileUPload(8);
