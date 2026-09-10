/* 

{ value: -10, children: [{ value: -15 }] }
*/

const getTreeVal = (obj) => {
  let sumOfAllVal = obj.value;
  if (obj.children.length > 0) {
    // obj.children.forEach((item) => {
    //   sumOfAllVal += item.value;
    // });
    return getTreeVal(obj.children);
  }

  return sumOfAllVal;
};

const testCase1 = getTreeVal({ value: 10, children: [] });
const testCase2 = getTreeVal({
  value: 0,
  children: [{ value: 0, children: [] }],
});
const testCase3 = getTreeVal({
  value: -5,
  children: [{ value: -10, children: [{ value: -15 }] }],
});
console.log({ testCase1 }, { testCase2 }, { testCase3 });
