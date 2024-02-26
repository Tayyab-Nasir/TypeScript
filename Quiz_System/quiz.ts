import * as inquirer from 'inquirer';

async function main() {
  const questions = [
    {
      type: 'list',
      name: 'countries',
      message: 'How many countries are there in the world?',
      choices: ['165', '175', '185', '195', '205'],
      default: '195', // Set the correct answer as default
    },
  ];

  try {
    const answers = await inquirer.prompt(questions);
    const userAnswer = answers.countries;

    // Check if the user's answer is correct
    const correctAnswer = '195';
    const isCorrect = userAnswer === correctAnswer;

    console.log(`Your answer: ${userAnswer}`);
    console.log(`Correct answer: ${correctAnswer}`);
    console.log(`Result: ${isCorrect ? 'Correct!' : 'Incorrect!'}`);
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

main();
