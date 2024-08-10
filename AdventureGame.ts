import { input, select } from "@inquirer/prompts";
import chalk from "chalk";

// Classes for Player and Opponent
class Character {
  name: string;
  Power: number = 100;
  constructor(name: string) {
    this.name = name;
  }
  PowerDecrease() {
    this.Power -= 25;
  }
  PowerIncrease() {
    this.Power = 100;
  }
}

// Asking Player name
let playerName = await input({
  message: "Enter your name: ",
});

// Select the Opponent
let opponentClass = await select({
  message: "Choose your opponent's class:",
  choices: [
    { name: "Skeleton", value: "Skeleton" },
    { name: "Assassin", value: "Assassin" },
    { name: "Zombie", value: "Zombie" },
  ],
});

// Create Player and Opponent
let player = new Character(playerName);
let opponent = new Character(opponentClass);

// Game Loop
while (player.Power > 0 && opponent.Power > 0) {
  console.log(
    `${chalk.bold.green(player.name)} VS ${chalk.bold.red(opponent.name)}`
  );
  let action = await select({
    message: "Select your action:",
    choices: [
      { name: "Attack", value: "Attack" },
      { name: "Drink Potion", value: "Drink Potion" },
      { name: "Run for Life...", value: "Run for Life" },
    ],
  });

  if (action == "Attack") {
    let outcome = Math.random();
    if (outcome > 0.5) {
      opponent.PowerDecrease();
      console.log(
        chalk.bold.red(`${opponent.name}'s power is ${opponent.Power}`)
      );
    } else {
      player.PowerDecrease();
      console.log(chalk.bold.red(`${player.name}'s power is ${player.Power}`));
    }
  } else if (action == "Drink Potion") {
    player.PowerIncrease();
    console.log(
      chalk.bold.green(`${player.name}'s power is restored to ${player.Power}`)
    );
  } else if (action == "Run for Life...") {
    console.log(chalk.red.bold.italic("You lose, better luck next time!"));
    break;
  }

  if (opponent.Power <= 0) {
    console.log(
      chalk.green.bold.italic(
        `Congratulations, ${player.name}! You defeated the ${opponent.name}.`
      )
    );
    break;
  } else if (player.Power <= 0) {
    console.log(
      chalk.red.bold.italic("You were defeated... Better luck next time!")
    );
    break;
  }
}
