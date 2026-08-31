/* 
Check for Anagrams
You need to write a function isAnagram(first, second) that checks if two strings are anagrams. Conditions:
The function takes two arguments:
- first — first string to check.
- second — second string to check.
- Two strings are anagrams if they contain the same characters with the same frequency.
- Strings can only contain lowercase Latin letters (a-z).


Examples:
Input 1: "finder", "friend"
Output 1: true
Input 2: "test", "sets"
Output 2: false
Input 3: "abc", "aaa"
Output 3: false

*/

const isAnagram = (first, second) => {
  const sortedFirst = first.split("").sort().join("");
  const sortedSecond = second.split("").sort().join("");

  if (sortedFirst === sortedSecond) {
    return true;
  } else {
    return false;
  }
};

const result = isAnagram("finder", "friend");

console.log(result);
