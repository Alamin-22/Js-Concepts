// const numbers = [10, 2, 5, 1];
// numbers.sort((a, b) => b - a);

const frequencyEntries = [
  ["apple", 3],
  ["banana", 5],
  ["orange", 1],
];

// frequencyEntries.sort((a, b) => a[1] - b[1]);
frequencyEntries.sort((a, b) => {
  console.log("A => ", a);
});

console.log(frequencyEntries);
