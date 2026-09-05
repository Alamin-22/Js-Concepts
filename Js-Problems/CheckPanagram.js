/* 
Check for Pangram

Write a function isPangram(sentence) that checks if a string is a pangram.
- A pangram is a string that contains every letter of the alphabet at least once.
- The string can contain non-letter characters, which should be ignored.
Examples:
Input 1: "the"
Output 1: false
Input 2: "TheQuickBrownFoxJumpsOverTheLazyDog"
Output 2: true

*/

const isPangram = (sentence) => {
  const lowerCaseStr = sentence.toLowerCase().split("");
  //   console.log(lowerCaseStr);

  const uniqueCharacters = new Set();

  lowerCaseStr.forEach((char) => {
    if (char >= "a" && char <= "z") {
      uniqueCharacters.add(char);
    }
  });

  //   console.log(uniqueCharacters.size);

  return uniqueCharacters.size === 26;
};

console.log(isPangram("TheQuickBrownFoxJumpsOverTheLazyDog"));
