/* 
Q6: What is the difference between a Shallow Copy and a Deep Copy?
Shallow Copy: Clones only the top-level values of an object or array. Nested items (like inner arrays or sub-objects) are copied by reference. If you modify a nested property on the copied variable, the modification instantly updates the original parent object because they point to the exact same memory address.
Deep Copy: Recursively clones every single nested layer of an object or array, ensuring a 100% independent data duplicate in memory. Modifying any value inside the deep copy will never affect the source object.

*/

const OriginalObj1 = {
  name: "demo name",
  address: "dhaka",
};

// we dont use this generally because spread operator is more easy to use
const shallowCpy = Object.assign({}, OriginalObj1);

// spread operator basically performs shallow copy which basically clone the top level values of an object or array
const shallowCpyUsingSpreadOperator = { ...OriginalObj1 };

shallowCpy.address = "ctg";

console.log({ OriginalObj1 });
console.log(shallowCpy.address);
console.log({ shallowCpyUsingSpreadOperator });
