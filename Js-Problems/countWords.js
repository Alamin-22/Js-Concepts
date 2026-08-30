/* 
Write a function countWords(arr) that loops through this array and uses an object to count how many times each word appears (The Bucket Pattern).
*/

const words = ["apple", "banana", "apple", "orange", "banana", "apple"];

let counts = {};

const countWords = (arrOfWords) => {
  arrOfWords.forEach((word) => {
    if (!counts[word]) {
      counts[word] = 1;
    } else {
      counts[word] += 1;
    }
  });
};

countWords(words);

const arrayOfObjs = Object.entries(counts);

console.log(counts);
console.log(arrayOfObjs);
