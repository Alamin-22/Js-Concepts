const prices = {
  weekday: 1500,
  holiday: 2200,
};

// in js week count start from 0 and end with 6 and in this case 0 means sunday and so on..

/*
sun mon tue wed thurs fry sat
 and according to this logic weekends date will be  0 for Sunday and 6 for saturday
 */

const bookingCalculate = (nights, checkInDate = new Date()) => {
  const currentDate = checkInDate.getDate();

  let calculatedCoast = 0;

  // 13 , 14 ,15 ,16 ,17 ,18 , 19
  for (let i = currentDate; i < nights + currentDate; i++) {
    const date = new Date(); // Sun Sep 13 , Mon Sep 14
    date.setDate(i); // 1 , 2, 3, 4 ,5 ,6 , 7
    let currentDay = date.getDay();

    // if (currentDay === 0 || currentDay === 6) {
    //   calculatedCoast = nights * prices.holiday;
    // } else {
    //   calculatedCoast = nights * prices.weekday;
    // }
    if (currentDay === 0 || currentDay === 6) {
      calculatedCoast += prices.holiday;
    } else {
      calculatedCoast += prices.weekday;
    }
  }

  return calculatedCoast;
};

const testCase1 = bookingCalculate(1, new Date("2026-11-11"));
const testCase2 = bookingCalculate(5, new Date("2026-11-07"));
const testCase3 = bookingCalculate(7);

console.log("Test Case 1 => ", testCase1);
console.log("Test Case 2 => ", testCase2);
console.log("Test Case 3 => ", testCase3);
