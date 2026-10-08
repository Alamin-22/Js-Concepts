/* 
### CoderPad Screen: The Auto-Save Feature

**Background:**
You are building a rich text editor similar to Google Docs or Notion. As the user types their essay, you want to automatically save their work to the database so they don't lose their progress.

If you trigger a database save on every single keystroke, your database will be overwhelmed with thousands of tiny writes per minute.

You need to implement a wrapper function called `withAutoSave` that forces the system to wait. It should only fire the save function **after the user has stopped typing for a specific amount of time**. If they keep typing, the timer must keep resetting.

**The Base API (Copy this into your code):**

```javascript
const saveToDatabase = (draftContent) => {
  console.log(`💾 [DATABASE] Saved document: "${draftContent}"`);
};

// 1. Write your wrapper function here
// const withAutoSave = ...

```

**Test Cases to Run:**

```javascript
const autoSaveDocument = withAutoSave(saveToDatabase, 1500); // 1.5 second delay

console.log("User starts typing rapidly...");

// User types a sentence over the course of a few milliseconds
autoSaveDocument("H");
autoSaveDocument("He");
autoSaveDocument("Hell");
autoSaveDocument("Hello");
autoSaveDocument("Hello w");
autoSaveDocument("Hello world!");

// If your logic is correct, the console will be completely silent right now.

setTimeout(() => {
  console.log("2 seconds later...");
  // Now, the console should finally show ONE database save for "Hello world!"
  
  // User starts typing again...
  console.log("User adds more text...");
  autoSaveDocument("Hello world! How are you?");
}, 2000);

```
*/

const saveToDatabase = (draftContent) => {
  console.log(`💾 [DATABASE] Saved document: "${draftContent}"`);
};

const withAutoSave = (callback, delay) => {
  // well here the arry of string method wont work because we are not storing or saving arry of event. here we are saving the final word user written. so here we need to save only the final word.
  let finalStr;
  let timerId;

  return (keyStroke) => {
    finalStr = keyStroke;
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback(finalStr);
    }, delay);
  };
};

const autoSaveDocument = withAutoSave(saveToDatabase, 1500);

console.log("User starts typing rapidly...");

// User types a sentence over the course of a few milliseconds
autoSaveDocument("H");
autoSaveDocument("He");
autoSaveDocument("Hell");
autoSaveDocument("Hello");
autoSaveDocument("Hello w");
autoSaveDocument("Hello world!");

// If your logic is correct, the console will be completely silent right now.

setTimeout(() => {
  console.log("2 seconds later...");
  // Now, the console should finally show ONE database save for "Hello world!"

  // User starts typing again...
  console.log("User adds more text...");
  autoSaveDocument("Hello world! How are you?");
}, 2000);
