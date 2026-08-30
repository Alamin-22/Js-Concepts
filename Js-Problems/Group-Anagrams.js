/* 
Write a function groupAnagrams(arr) that takes an array of strings arr and groups anagrams together. Conditions:
An anagram is a word or phrase formed by rearranging the letters of another word or phrase (e.g., "tea" => "eat").

Examples:
Input 1: ["ab", "ba", "abc", "bca"]
Output 1: [["abc","bca"],["ab","ba"]]
Input 2: ["listen", "silent", "enlist"]
Output 2: [["listen","silent","enlist"]]
*/

const groupAnagrams = (arr) => {
  // lets try to solve using sorting logic

  const counts = {};

  arr.forEach((rawStr) => {
    const sortedStr = rawStr.split("").sort().join("");

    if (!counts[sortedStr]) {
      counts[sortedStr] = [rawStr];
    } else {
      counts[sortedStr].push(rawStr);
    }
  });

  return Object.values(counts);
};

const result = groupAnagrams(["ab", "ba", "abc", "bca"]);
const result2 = groupAnagrams(["listen", "silent", "enlist"]);

console.log(result);
console.log(result2);
