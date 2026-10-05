/* 
### CoderPad Screen: The Secure Bank Account

**Background:**
You need to create a bank account system. If you just use an object like `let account = { balance: 100 }`, any other developer can write `account.balance = 9999999` and ruin the system. You must hide the balance using a closure, only allowing it to change via specific approved methods.

Instead of returning one function, you will return an **object** containing multiple functions that all share access to the same private `balance` variable.

**Your Job:**

1. Write a function called `createBankAccount(initialBalance)`.
2. Inside, create a private variable `let balance = initialBalance`.
3. Return an **object** containing three functions: `deposit`, `withdraw`, and `getBalance`.
4. `deposit(amount)` should add to the balance, log `"Deposited [amount]. New balance: [balance]"`, and return the new balance.
5. `withdraw(amount)` should check if there is enough money. If yes, subtract it and log `"Withdrew [amount]. New balance: [balance]"`. If no, log `"Insufficient funds"`.
6. `getBalance()` should simply return the current balance.

**Test Cases to Run:**

```javascript
const aliceAccount = createBankAccount(100);
const bobAccount = createBankAccount(500);

// 1. Alice's transactions
aliceAccount.deposit(50);     // "Deposited 50. New balance: 150"
aliceAccount.withdraw(20);    // "Withdrew 20. New balance: 130"
aliceAccount.withdraw(500);   // "Insufficient funds"

// 2. Bob's transactions (Should be completely independent)
bobAccount.withdraw(100);     // "Withdrew 100. New balance: 400"

// 3. Prove the closure is secure
console.log(aliceAccount.balance); // Should print: undefined
console.log(aliceAccount.getBalance()); // Should print: 130

```
*/

const createBankAccount = (initialBalance) => {
  let balance = initialBalance || 0;
  const deposit = (amount) => {
    balance += amount;
    console.log(`"Deposited ${amount}. New balance: ${balance}"`);
    return balance;
  };

  const withdraw = (amount) => {
    if (balance >= amount) {
      balance -= amount;
      console.log(`"Withdrew ${amount}. New balance: ${balance}"`);
      return balance;
    } else {
      console.log(`"Insufficient funds"`);
    }
  };

  const getBalance = () => {
    return balance;
  };

  return { deposit, withdraw, getBalance };
};

const aliceAccount = createBankAccount(100);
const bobAccount = createBankAccount(500);

// 1. Alice's transactions
aliceAccount.deposit(50); // "Deposited 50. New balance: 150"
aliceAccount.withdraw(20); // "Withdrew 20. New balance: 130"
aliceAccount.withdraw(500); // "Insufficient funds"

// 2. Bob's transactions (Should be completely independent)
bobAccount.withdraw(100); // "Withdrew 100. New balance: 400"

// 3. Prove the closure is secure
console.log(aliceAccount.balance); // Should print: undefined
console.log(aliceAccount.getBalance()); // Should print: 130
