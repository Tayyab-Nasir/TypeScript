import * as inquirer from 'inquirer';

class Customer {
  public FirstName: string;
  public LastName: string;
  public Gender: string;
  public Age: number;
  public MobileNumber: string;
  public bankAccount: BankAccount;

  public CustomerInfo(): string {
    return `Name: ${this.FirstName} ${this.LastName}
Age: ${this.Age}
Gender: ${this.Gender}
Mobile: ${this.MobileNumber}
Account Balance: ${this.bankAccount.AccountBalance}`;
  }
}

interface IBankAccount {
  Debit(d: number): string;
  Credit(d: number): string;
}

class BankAccount implements IBankAccount {
  public AccountBalance: number;

  constructor() {
    this.AccountBalance = 100;
  }

  public Debit(amount: number): string {
    let statement = 'Sorry, you have insufficient balance!';
    if (amount > 0) {
      statement = 'The amount you entered is wrong!';
      if (this.AccountBalance > amount) {
        this.AccountBalance -= amount;
        statement = `Transaction successful! New account balance is ${this.AccountBalance}`;
      } else {
        statement = 'You don\'t have enough money to do this transaction';
      }
    }
    return statement;
  }

  public Credit(amount: number): string {
    let statement = 'Transaction failed!';
    if (amount > 0) {
      this.AccountBalance += amount;
      if (amount > 100) {
        this.AccountBalance -= 1;
      }
      statement = 'Your account has been credited successfully!';
    }
    return statement;
  }
}

async function main() {
  const customer = new Customer();
  customer.FirstName = await askQuestion('Enter your first name:');
  customer.LastName = await askQuestion('Enter your last name:');
  customer.Age = parseInt(await askQuestion('Enter your age:'));
  customer.Gender = await askQuestion('Enter your gender:');
  customer.MobileNumber = await askQuestion('Enter your mobile number:');

  const bankAccount = new BankAccount();
  customer.bankAccount = bankAccount;

  console.log(customer.CustomerInfo());

  const action = await askQuestion('Do you want to (d) Debit or (c) Credit?');
  const amount = parseFloat(await askQuestion('Enter the amount:'));

  if (action === 'd') {
    console.log(bankAccount.Debit(amount));
  } else if (action === 'c') {
    console.log(bankAccount.Credit(amount));
  } else {
    console.log('Invalid action. Please choose either (d) Debit or (c) Credit.');
  }
}

function askQuestion(question: string): Promise<string> {
  return inquirer.prompt({
    type: 'input',
    name: 'answer',
    message: question,
  }).then((answers) => answers.answer);
}

main();
