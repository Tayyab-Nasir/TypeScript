//First, install the necessary dependencies:
npm install inquirer @types/inquirer

//Create a new TypeScript file, e.g., calculator.ts, and add the following code:

import inquirer from "inquirer";

async function main() {
  console.log("Welcome to the CLI Calculator!");

  while (true) {
    const { operation } = await inquirer.prompt([
      {
        type: "list",
        name: "operation",
        message: "Select an operation:",
        choices: [
          "Addition",
          "Subtraction",
          "Multiplication",
          "Division",
          "Exponentiation",
          "Square Root",
          "Percentage",
          "Exit",
        ],
      },
    ]);

    if (operation === "Exit") {
      console.log("Thank you for using the calculator. Goodbye!");
      break;
    }

    let result: number;

    switch (operation) {
      case "Addition":
        result = await performOperation("add");
        break;
      case "Subtraction":
        result = await performOperation("subtract");
        break;
      case "Multiplication":
        result = await performOperation("multiply");
        break;
      case "Division":
        result = await performOperation("divide");
        break;
      case "Exponentiation":
        result = await performOperation("exponentiate");
        break;
      case "Square Root":
        result = await performOperation("squareRoot");
        break;
      case "Percentage":
        result = await performOperation("percentage");
        break;
      default:
        console.log("Invalid operation. Please choose a valid option.");
        continue;
    }

    console.log(`Result: ${result}`);
  }
}

async function performOperation(operation: string): Promise<number> {
  const { num1, num2 } = await inquirer.prompt([
    { type: "number", name: "num1", message: "Enter the first number:" },
    { type: "number", name: "num2", message: "Enter the second number:" },
  ]);

  switch (operation) {
    case "add":
      return num1 + num2;
    case "subtract":
      return num1 - num2;
    case "multiply":
      return num1 * num2;
    case "divide":
      return num1 / num2;
    case "exponentiate":
      return Math.pow(num1, num2);
    case "squareRoot":
      return Math.sqrt(num1);
    case "percentage":
      return (num1 * num2) / 100;
    default:
      throw new Error("Invalid operation.");
  }
}

main();

//Compile the TypeScript code:
 tsc calculator.ts

//Run the generated JavaScript file with Node.js:
 node calculator.js
