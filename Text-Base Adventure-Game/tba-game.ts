import * as readline from 'readline';

class Player {
  maxHealth: number;
  currentHealth: number;
  attackDamage: number;
  numHealthPotions: number;
  healthPotionHealAmount: number;

  constructor() {
    this.maxHealth = 100;
    this.currentHealth = this.maxHealth;
    this.attackDamage = 50;
    this.numHealthPotions = 3;
    this.healthPotionHealAmount = 25;
  }

  attack(enemy: Enemy): void {
    const damageDealt = Math.floor(Math.random() * this.attackDamage);
    enemy.takeDamage(damageDealt);
    console.log(`You attack ${enemy.name} for ${damageDealt} damage!`);
  }

  useHealthPotion(): void {
    if (this.numHealthPotions > 0) {
      this.currentHealth += this.healthPotionHealAmount;
      this.numHealthPotions--;
      console.log(`You drink a health potion and heal ${this.healthPotionHealAmount} HP.`);
    } else {
      console.log("You're out of health potions!");
    }
  }
}

class Enemy {
  name: string;
  totalHealth: number;
  currentHealth: number;
  attackDamage: number;

  constructor(name: string) {
    this.name = name;
    this.totalHealth = 100;
    this.currentHealth = this.totalHealth;
    this.attackDamage = 25;
  }

  takeDamage(damage: number): void {
    this.currentHealth -= damage;
    if (this.currentHealth < 0) {
      this.currentHealth = 0;
    }
  }
}

async function main() {
  const player = new Player();
  const enemies: Enemy[] = [
    new Enemy('Skeleton'),
    new Enemy('Zombie'),
    new Enemy('Assassin'),
    new Enemy('Warrior'),
  ];

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log('Welcome to the Adventure Game! Defeat all enemies to win.');

  while (enemies.some((enemy) => enemy.currentHealth > 0)) {
    const selectedEnemy = enemies.find((enemy) => enemy.currentHealth > 0);
    console.log(`\nYou encounter a ${selectedEnemy.name}!`);

    const action = await askQuestion(rl, 'Do you want to (a) Attack or (h) Use a health potion? ');

    if (action === 'a') {
      player.attack(selectedEnemy);
      if (selectedEnemy.currentHealth > 0) {
        selectedEnemy.attack(player);
      }
    } else if (action === 'h') {
      player.useHealthPotion();
      selectedEnemy.attack(player);
    }
  }

  console.log('\nCongratulations! You defeated all enemies and won the game!');
  rl.close();
}

function askQuestion(rl: readline.Interface, question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim().toLowerCase());
    });
  });
}

main();
