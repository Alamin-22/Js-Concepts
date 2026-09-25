const prices = {
  weekday: 1500,
  holiday: 2200,
};

const bookingCalculate = (nights, checkInDate = new Date()) => {
  const trackingDate = new Date(checkInDate);

  let calculatedCost = 0;

  for (let i = 0; i < nights; i++) {
    const currentDay = trackingDate.getDay();

    if (currentDay === 0 || currentDay === 6) {
      calculatedCost += prices.holiday;
    } else {
      calculatedCost += prices.weekday;
    }

    trackingDate.setDate(trackingDate.getDate() + 1);
  }

  return calculatedCost;
};

const testCase1 = bookingCalculate(1, new Date("2026/11/11"));
const testCase2 = bookingCalculate(5, new Date("2026/11/07"));
const testCase3 = bookingCalculate(7);

console.log("Test Case 1 => ", testCase1);
console.log("Test Case 2 => ", testCase2);
console.log("Test Case 3 => ", testCase3);
