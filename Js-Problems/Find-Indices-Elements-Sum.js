/* 
Find Indices of Elements for Sum
Avito
You need to write a function twoSum(nums, target) that takes an array of numbers nums and a number target. The function should return an array with two indices of elements whose sum equals target. It is guaranteed that there is always exactly one solution.


Examples:
Input 1: [3, 3], 6
Output 1: [0, 1]
Input 2: [2, 7, 11, 5, 9, 10, 15], 9
Output 2: [0, 1]

*/

const twoSum = (nums, target) => {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
};

const result = twoSum([2, 7, 11, 5, 9, 10, 15], 9);
console.log(result);
