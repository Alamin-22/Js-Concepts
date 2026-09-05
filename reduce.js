const myNumbers = [10, 15, 20, 2, 3, 5];

// const sumOfArray = myNumbers.reduce(
//   (accumulator, currentValue) => accumulator + currentValue,
//   10,
// );

const sumOfArray = myNumbers.reduce((intial, num) => intial + num, 0);

console.log(sumOfArray);
