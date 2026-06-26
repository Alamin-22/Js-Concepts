// Q3: What is an IIFE (Immediately Invoked Function Expression)?
/* 
basically when a function call itself automatically upon when the entire codebase run is called IIFE. Meaning we dont need to call this function manually to execute.  
A special note of this function is it does not require any name to it.
*/

// This is normal arrow function
const PrintName = () => console.log("mollik");
PrintName();

// this is IIFE function
(() => console.log("mollik print from IIFE function 1"))();

(function () {
  console.log("mollik print from IIFE function 2");
})();
