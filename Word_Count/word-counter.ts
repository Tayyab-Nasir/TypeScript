import inquirer from "inquirer";

async function countWords(sentence: string): Promise<number> {
  const words = sentence
    .replace(/[.,?!;()"'-]/g, " ") // Replace punctuation with spaces
    .replace(/\s+/g, " ") // Replace multiple spaces with a single space
    .toLowerCase() // Convert to lowercase
    .split(" "); // Split into an array of words

  return words.length;
}

async function main() {
  console.log("Welcome to the Word Counter!");

  const { inputSentence } = await inquirer.prompt({
    type: "input",
    name: "inputSentence",
    message: "Enter a sentence to count the words:",
  });

  const wordCount = await countWords(inputSentence);
  console.log(`Word count: ${wordCount}`);
}

main();
