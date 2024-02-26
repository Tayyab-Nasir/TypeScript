import inquirer from "inquirer";

// Exchange rates (for demonstration purposes)
const exchangeRates: Record<string, number> = {
  USD: 1.18, // Example: 1 USD = 1.18 EUR
  EUR: 0.85, // Example: 1 EUR = 0.85 USD
  GBP: 0.72, // Example: 1 GBP = 0.72 USD
  // Add more currencies and rates as needed
};

async function main() {
  console.log("Welcome to the Currency Converter!");

  const { amount, fromCurrency, toCurrency } = await inquirer.prompt([
    { type: "number", name: "amount", message: "Enter the amount:" },
    { type: "list", name: "fromCurrency", message: "Select the source currency:", choices: Object.keys(exchangeRates) },
    { type: "list", name: "toCurrency", message: "Select the target currency:", choices: Object.keys(exchangeRates) },
  ]);

  if (fromCurrency === toCurrency) {
    console.log("Source and target currencies cannot be the same.");
    return;
  }

  const convertedAmount = (amount * exchangeRates[toCurrency]) / exchangeRates[fromCurrency];

  console.log(`Converted amount: ${convertedAmount.toFixed(2)} ${toCurrency}`);
}

main();
