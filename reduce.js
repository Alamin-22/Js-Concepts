const myNumbers = [10, 15, 20, 2, 3, 5];

const sumOfArray = myNumbers.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  10,
);

console.log(sumOfArray);
