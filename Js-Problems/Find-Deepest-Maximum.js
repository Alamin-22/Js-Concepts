/* 
Find Deepest Maximum Element

Write a function findDeepestMaxElement(array) that takes a nested array of numbers array. Conditions:
The array can contain numbers or nested arrays of any depth.
The function should return the maximum element that is at the deepest nesting level.
Examples:
Input 1: [10, [5, [15, [50]], 20]]
Output 1: 50
Input 2: [1, [[20, 1, [101]], 2], [[-2], [[102, 100]]]]
Output 2: 102

*/

const findDeepestMaxElement = (array) => {
  const flattenArry = array.flat(Infinity);

  console.log("flatten", flattenArry);

  return Math.max(...flattenArry);
};

console.log(
  findDeepestMaxElement([1, [[20, 1, [101]], 2], [[-2], [[102, 100]]]]),
);
