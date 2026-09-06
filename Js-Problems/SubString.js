const findSubstring = (subStr, arr) => {
  let result = [];

  arr.forEach((item) => {
    if (item != undefined) {
      if (item.includes(subStr)) result.push(item);
    }
  });

  return result;
};

const output1 = findSubstring("oo", ["food", "door", "moon"]);
const output2 = findSubstring("xyz", ["apple", "banana", "cherry"]);
console.log(output1, output2);
