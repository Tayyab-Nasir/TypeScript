import * as inquirer from 'inquirer';

class Student {
  name: string;
  studentID: string;
  courses: string[];
  balance: number;

  constructor(name: string) {
    this.name = name;
    this.studentID = this.generateStudentID();
    this.courses = [];
    this.balance = 0;
  }

  private generateStudentID(): string {
    // Generate a 5-digit unique student ID (you can customize this logic)
    const randomID = Math.floor(Math.random() * 90000) + 10000;
    return randomID.toString();
  }

  enrollCourse(course: string): void {
    this.courses.push(course);
  }

  viewBalance(): void {
    console.log(`Balance for ${this.name}: $${this.balance}`);
  }

  payTuition(amount: number): void {
    this.balance -= amount;
    console.log(`Paid $${amount} towards tuition.`);
  }

  showStatus(): void {
    console.log(`Student Details:
    Name: ${this.name}
    Student ID: ${this.studentID}
    Enrolled Courses: ${this.courses.join(', ')}
    Balance: $${this.balance}`);
  }
}

async function main() {
  const { name } = await inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'Enter student name:',
  });

  const student = new Student(name);

  // Add more prompts for other actions (enroll, view balance, pay tuition, etc.)

  // Example usage:
  student.enrollCourse('Math');
  student.enrollCourse('History');
  student.viewBalance();
  student.payTuition(500);
  student.showStatus();
}

main();
