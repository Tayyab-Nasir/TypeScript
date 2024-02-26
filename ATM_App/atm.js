// atm.js

import inquirer from "inquirer";

// User data (randomly generated for demonstration)
const users = [
  { id: 12345, pin: 9876, balance: 1000 },
  { id: 67890, pin: 5432, balance: 2000 },
  // Add more users if needed
];

async function authenticateUser(userId: number, userPin: number): Promise<boolean> {
  const user = users.find((u) => u.id === userId && u.pin === userPin);
  return !!user;
}

async function displayMenu(userId: number): Promise<void> {
  console.log(`Welcome, User ${userId}!`);
  console.log("1. Check Balance");
  console.log("2. Withdraw");
  console.log("3. Deposit");
  console.log("4. Exit");
}

async function checkBalance(userId: number): Promise<void> {
  const user = users.find((u) => u.id === userId);
  console.log(`Your balance: $${user?.balance || 0}`);
}

async function withdraw(userId: number, amount: number): Promise<void> {
  const user = users.find((u) => u.id === userId);
  if (user && user.balance >= amount) {
    user.balance -= amount;
    console.log(`Withdrawal successful. New balance: $${user.balance}`);
  } else {
    console.log("Insufficient funds or invalid user.");
  }
}

async function deposit(userId: number, amount: number): Promise<void> {
  const user = users.find((u) => u.id === userId);
  if (user) {
    user.balance += amount;
    console.log(`Deposit successful. New balance: $${user.balance}`);
  } else {
    console.log("Invalid user.");
  }
}

async function main() {
  console.log("Welcome to the ATM!");

  const { userId, userPin } = await inquirer.prompt([
    { type: "number", name: "userId", message: "Enter User ID:" },
    { type: "number", name: "userPin", message: "Enter User PIN:" },
  ]);

  if (await authenticateUser(userId, userPin)) {
    console.log("Authentication successful!");
    await displayMenu(userId);

    const choice = await inquirer.prompt({
      type: "number",
      name: "choice",
      message: "Enter your choice (1-4):",
    });

    switch (choice.choice) {
      case 1:
        await checkBalance(userId);
        break;
      case 2:
        const withdrawAmount = parseFloat(await inquirer.prompt({
          type: "number",
          name: "withdrawAmount",
          message: "Enter withdrawal amount:",
        }));
        await withdraw(userId, withdrawAmount);
        break;
      case 3:
        const depositAmount = parseFloat(await inquirer.prompt({
          type: "number",
          name: "depositAmount",
          message: "Enter deposit amount:",
        }));
        await deposit(userId, depositAmount);
        break;
      case 4:
        console.log("Thank you for using the ATM. Goodbye!");
        break;
      default:
        console.log("Invalid choice.");
    }
  } else {
    console.log("Authentication failed. Invalid user ID or PIN.");
  }
}

main();
