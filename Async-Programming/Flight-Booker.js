/* 

Background:
You are building a ticketing system. Fares are dynamic based on the seat type, and you must check if the user has enough money in their digital wallet before completing the booking.

Requirements:

The Mock API: Write a function bookFlight(seatType, accountBalance).

It must simulate a network delay of 1500 milliseconds.

Pricing logic: "Economy" costs 500. "Business" costs 1200.

If seatType is anything other than "Economy" or "Business", reject with exactly: "Error: Invalid seat selection".

If the accountBalance is less than the cost of their chosen seat, reject with exactly: "Error: Insufficient funds".

If they selected a valid seat and have enough money, resolve with exactly: "Success: [seatType] seat booked".

The Frontend Consumer: Write an async function processBooking(seat, balance).

Before starting, log: "Locking seat selection..."

Call the API and log the result/error.

Finally, log: "Unlocking seat selection..."

Test Cases to Run:

JavaScript
processBooking("First Class", 5000); // Should fail (invalid seat)
processBooking("Business", 800);     // Should fail (not enough money)
processBooking("Economy", 600);      // Should succeed
*/

const bookFlight = (seatType, accountBalance) => {
  const pricingObj = { Economy: 500, Business: 1200 };
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (seatType === "Economy" || seatType === "Business") {
        if (accountBalance >= pricingObj[seatType]) {
          resolve(`Success: [${seatType}] seat booked`);
        } else {
          reject("Error: Insufficient funds");
        }
      } else {
        reject("Error: Invalid seat selection");
      }
    }, 1500);
  });
};

const processBooking = async (seat, balance) => {
  console.log("Locking seat selection...");
  try {
    const res = await bookFlight(seat, balance);
    console.log(res);
  } catch (err) {
    console.log(err);
  } finally {
    ("Unlocking seat selection...");
  }
};

// processBooking("First Class", 5000); // Should fail (invalid seat)
// processBooking("Business", 800); // Should fail (not enough money)
processBooking("Economy", 600); // Should succeed
