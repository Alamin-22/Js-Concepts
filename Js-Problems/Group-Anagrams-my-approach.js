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

  const l1Sort = arr.sort();

  const sortedArrayOfString = l1Sort.map((item) => {
    // console.log("From map = >", [...item]);
    // console.log("From map = >", item.split(""));
    // console.log("After sort >", item.split("").sort());
    return item.split("").sort().join("");
  });

  sortedArrayOfString.forEach((str) => {
    if (!counts[str]) {
      counts[str] = [str];
    } else {
      counts[str].push(str);
    }
  });

  return Object.values(counts);
};

const result = groupAnagrams(["ab", "ba", "abc", "bca"]);
const result2 = groupAnagrams(["listen", "silent", "enlist"]);

console.log(result);
console.log(result2);
