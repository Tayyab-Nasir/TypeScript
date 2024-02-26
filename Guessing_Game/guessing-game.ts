import inquirer from "inquirer";

// Generate a random number between 1 and 100
const randomNumber = Math.floor(Math.random() * 100) + 1;

// Initialize the number of attempts
let guessCount = 10;

// Create an Inquirer prompt for user input
async function getUserGuess(): Promise<number> {
  const { guess } = await inquirer.prompt({
    type: "number",
    name: "guess",
    message: "Guess the number (between 1 and 100):",
  });
  return guess;
}

// Main game loop
async function playGame() {
  console.log("Welcome to the Number Guessing Game!");
  console.log("Can you guess my number?");

  while (guessCount > 0) {
    const userGuess = await getUserGuess();

    if (userGuess === randomNumber) {
      console.log("Congratulations! You guessed correctly.");
      process.exit(0);
    } else if (userGuess < randomNumber) {
      console.log("Too small! Try a higher number.");
    } else {
      console.log("Too large! Try a smaller number.");
    }

    guessCount--;
    console.log(`Attempts left: ${guessCount}`);
  }

  console.log(`Out of attempts! The correct number was ${randomNumber}.`);
  process.exit(0);
}

// Start the game
playGame();
