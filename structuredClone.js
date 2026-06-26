/* 
Q7: What is structuredClone(), and how does it compare to the classic JSON.parse(JSON.stringify(obj)) approach?
Answer: Both generate standard deep copies, but structuredClone is a native, modern, high-performance engine method.
The Crucial Distinction: The old JSON conversion trick completely breaks complex, non-JSON standard data items. It turns Date instances into static strings, drops functions, and completely breaks or deletes Map, Set, BigInt, and custom prototypes. structuredClone safely duplicates these complex structures.
 */

const originalUser = {
  name: "Mollik",
  skills: ["js", "react", "ts", "nextjs"],
  details: {
    city: "Dhaka",
    country: "BD",
  },
};

// structuredClone basically performs a deep copy along with all the heavy nested complex thing as it is, like date etc
/* 
in other words other words shallow copy can not clone the deep nested child for them we need to perform deep copy
*/
const clonedUser = structuredClone(originalUser);

clonedUser.details.city = "Rajsahi";

console.log("Original user => ", originalUser);
console.log("Cloned user which has been modified => ", clonedUser);
