/* 
Write a function findSubstring(substring, arr) that takes a string substring and an array of strings arr, and returns an array of strings that contain the substring substring.
- The substring must be found anywhere in the string.
- Character case matters (case-sensitive).
- If no string contains the substring, return an empty array.
Examples:
Input 1: "oo", ["food", "door", "moon"]
Output 1: ["food", "door", "moon"]
Input 2: "xyz", ["apple", "banana", "cherry"]
Output 2: []
*/

const findSubstring = (substring, arr) => {
  const subStringsArr = arr.map((word) => {
    if (word.includes(substring)) {
      return word;
    } else {
      return [];
    }
  });
  return subStringsArr.flat();
};

const result1 = findSubstring("oo", ["food", "door", "moon"]);
const result2 = findSubstring("xyz", ["apple", "banana", "cherry"]);

console.log(result1);
console.log(result2);
