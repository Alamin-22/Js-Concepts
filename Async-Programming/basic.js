// console.log("1. Start");

// setTimeout(() => {
//   console.log("2. Timeout");
// }, 0);

// Promise.resolve().then(() => {
//   console.log("3. Promise");
// });

// console.log("4. End");

// calling fetech api
// legacy then catch way before coming the async await approach

// fetch("url")
//   // it checks if the promise is Fulfilled or not. if Fulfilled then it goes to then if not(Rejected) then goes to catch
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err))
//   .finally(() => console.log("Execution End"));

const processPayment = (amount) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (amount >= 100) {
        resolve("Payment Successful");
      } else {
        reject("Payment Failed because of low balance");
      }
    }, 1000);
  });
};

/* 
Here processPayment is manual promise , and a Promise always comes up with 3 state pending, Fulfilled and Rejected. 
and if rejected then it goes into to catch and if Fulfilled then into then
*/

processPayment(200)
  .then((res) => console.log(res))
  .catch((err) => console.log(err))
  .finally(() => console.log("Execution of the promise has been resolved"));
