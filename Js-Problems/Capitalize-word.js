/* 
Write a function capitalize(input) that takes a string input and returns its copy, where each word starts with a capital letter.

*/

function capitalize(input) {
  const spliitedArr = input.split(" ");
  console.log(spliitedArr);

  const capitalizedArrOfWords = spliitedArr.map((word) => {
    if (!word) return "";
    return word[0].toUpperCase() + word.slice(1);
  });

  return capitalizedArrOfWords.join(" ");
}

const result = capitalize("foo-bar baz");
console.log(result);
