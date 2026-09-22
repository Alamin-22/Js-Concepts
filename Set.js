/* 

Set ensure the Unique Values. It is more like an Array but not an Array. although it came up with forEach method but still we can do use other looping methods.
And set start with new Set();

*/

const blogPosts = [
  { id: 1, category: "Code" },
  { id: 2, category: "Design" },
  { id: 3, category: "Code" },
  { id: 4, category: "Business" },
];

function getUniqueCategories(posts) {
  const res = posts.map((item) => {
    return item.category;
  });

  return [...new Set(res)];
}

// console.log(getUniqueCategories(blogPosts));
// Expected: ["Code", "Design", "Business"]

// prob 2

const userOneFriends = ["Alice", "Bob", "Charlie", "David"];
const userTwoFriends = ["Charlie", "David", "Eve", "Frank"];

function findMutuals(listOne, listTwo) {
  const SetOfListTwo = new Set(listTwo);

  const result = listOne
    .map((user) => {
      return SetOfListTwo.has(user) && user;
    })
    .filter((user) => user != false);

  return result;
}

// console.log(findMutuals(userOneFriends, userTwoFriends));
// Expected: ["Charlie", "David"]

// prob 3

function isIsogram(word) {
  const uniqeChar = new Set(word);
  const result = uniqeChar.size === word.length ? true : false;

  return result;
}

console.log(isIsogram("javascript")); // Expected: false (a is repeated)
console.log(isIsogram("html")); // Expected: true
