/* 
The CoderPad Screen: The E-Commerce Checkout
Background:
You are building the final checkout button for an e-commerce application. The backend team hasn't built the API yet, so you need to mock the transaction processor and write the frontend function that consumes it.

Requirements:

The Mock API: Write a function called verifyTransaction(cartTotal, isItemInStock).

It must simulate a network delay of 1.2 seconds.

If isItemInStock is false, the transaction must fail with the exact string: "Error: Item out of stock".

If cartTotal is greater than 1000, the transaction must fail with the exact string: "Error: Fraud detection triggered".

If the item is in stock and the total is 1000 or less, it must succeed and return the exact string: "Success: Order placed".

The Frontend Consumer: Write a function called checkout(total, stockStatus).

This function must execute the verifyTransaction process.

Before it starts, it must log: "Disabling checkout button..."

It must log the result of the transaction (whether it succeeded or failed).

Regardless of success or failure, it must always log exactly: "Re-enabling checkout button..." when the entire process is finished.

Test Cases to Run:
Make sure you call your checkout function three separate times to prove all logic paths work:

checkout(150, true)
checkout(1200, true)
checkout(50, false)

*/

const verifyTransaction = (cartTotal, isItemInStock) => {
  return new Promise((resolve, reject) => {
    console.log("verifyTransaction process");

    setTimeout(() => {
      if (isItemInStock && cartTotal <= 1000) {
        resolve("Success: Order placed");
      } else {
        reject("Error: Fraud detection triggered");
      }
    }, 1200);
  });
};

const checkout = async (total, stockStatus) => {
  console.log("Disabling checkout button...");
  try {
    const res = await verifyTransaction(total, stockStatus);
    console.log(res);
  } catch (err) {
    console.log(err);
  } finally {
    console.log("Re-enabling checkout button...");
  }
};

checkout(150, true);
// checkout(1200, true);
// checkout(50, false);
