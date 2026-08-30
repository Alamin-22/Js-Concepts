/* 
 K Most Frequent Elements

Write a function that takes an array of integers nums and an integer k, and returns an array of the k most frequently occurring elements. Conditions:
- If k is greater than the number of unique elements in the array, return all unique elements.


Examples:
Input 1: [1, 1, 1, 2, 2, 3], 2
Output 1: [1, 2]
Input 2: [1, 2, 3, 4, 5], 2
Output 2: [1, 2]

*/

const ArrOfK = (nums, k) => {
  let counts = {};

  nums.forEach((num) => {
    if (!counts[num]) {
      counts[num] = 1;
    } else {
      counts[num] += 1;
    }
  });

  const ArrayOfCountsObj = Object.entries(counts);

  const sortedCounts = ArrayOfCountsObj.sort((a, b) => b[1] - a[1]);

  const sortedArryOfKeys = sortedCounts.map((entry) => Number(entry[0]));

  console.log("sortedOne => ", sortedCounts);

  if (k > sortedArryOfKeys.length) {
    return sortedArryOfKeys;
  } else {
    return sortedArryOfKeys.slice(0, k);
  }

  //   console.log("keys should come in the form of array => ", Object.keys(counts));

  //   return counts;
};

const TestResult1 = ArrOfK([1, 1, 1, 2, 2, 3], 2);
const TestResult2 = ArrOfK([1, 2, 3, 4, 5], 2);

console.log(TestResult1);
console.log(TestResult2);
