import * as inquirer from 'inquirer';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function countdown(seconds: number): Promise<void> {
  for (let i = seconds; i >= 0; i--) {
    console.log(`Time remaining: ${i} seconds`);
    await delay(1000);
  }
  console.log('Countdown complete!');
}

async function main() {
  const { countdownDuration } = await inquirer.prompt({
    type: 'number',
    name: 'countdownDuration',
    message: 'Enter countdown duration (in seconds):',
    validate: (input) => {
      if (input > 0) {
        return true;
      }
      return 'Please enter a positive number.';
    },
  });

  countdown(countdownDuration);
}

main();
