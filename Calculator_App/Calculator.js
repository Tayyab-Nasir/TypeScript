//First, install the necessary dependencies:

npm install inquirer @types/inquirer

//Create a new TypeScript file, e.g., calculator.ts, and add the following code:

import * as inquirer from 'inquirer';

const calculator = async () => {
    const choices = [
        { name: 'Addition', value: 'add' },
        { name: 'Subtraction', value: 'subtract' },
        { name: 'Multiplication', value: 'multiply' },
        { name: 'Division', value: 'divide' },
        { name: 'Exponentiation', value: 'exponent' },
        { name: 'Square Root', value: 'squareRoot' },
        { name: 'Percentage', value: 'percentage' },
        { name: 'Exit', value: 'exit' }
    ];

    const { operation } = await inquirer.prompt({
        type: 'list',
        name: 'operation',
        message: 'Select an operation:',
        choices
    });

    if (operation === 'exit') {
        console.log('Exiting calculator...');
        return;
    }

    const promptMessage = 'Enter numbers separated by a comma:';

    let numbers: number[] = [];
    let result: number;

    switch (operation) {
        case 'add':
            numbers = (await inquirer.prompt(promptMessage)).numbers.split(',').map(Number);
            result = numbers.reduce((acc, val) => acc + val);
            break;
        case 'subtract':
            numbers = (await inquirer.prompt(promptMessage)).numbers.split(',').map(Number);
            result = numbers.reduce((acc, val) => acc - val);
            break;
        case 'multiply':
            numbers = (await inquirer.prompt(promptMessage)).numbers.split(',').map(Number);
            result = numbers.reduce((acc, val) => acc * val);
            break;
        case 'divide':
            numbers = (await inquirer.prompt(promptMessage)).numbers.split(',').map(Number);
            result = numbers.reduce((acc, val) => acc / val);
            break;
        case 'exponent':
            numbers = (await inquirer.prompt(promptMessage)).numbers.split(',').map(Number);
            result = Math.pow(numbers[0], numbers[1]);
            break;
        case 'squareRoot':
            numbers = (await inquirer.prompt('Enter a number:')).number;
            result = Math.sqrt(numbers);
            break;
        case 'percentage':
            numbers = (await inquirer.prompt(promptMessage)).numbers.split(',').map(Number);
            result = (numbers[0] * numbers[1]) / 100;
            break;
    }

    console.log('Result:', result);
    calculator();
};

calculator();

//Compile the TypeScript code:
 
tsc calculator.ts

//Run the generated JavaScript file with Node.js:
 
node calculator.js
