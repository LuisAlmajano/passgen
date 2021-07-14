#!/usr/bin/env node
const program = require("commander");
const chalk = require("chalk");
const clipboardy = require("clipboardy");
const createPassword = require("./utils/createPassword");
const savePassword = require("./utils/savePassword");

program.version("1.0.0").description("Simple Password Generator");

program
  .option("-l, --length <number>", "length of password")
  .option("-s, --save", "save password to passwords.txt")
  .option("-nn, --no-numbers", "no numbers in the password generated")
  .option("-ns, --no-symbols", "no symbols in the password generated")
  .parse();

const { length, save, numbers, symbols } = program.opts();

// Get generated password
const generatedPassword = createPassword(length, numbers, symbols);

// Copy to clipboard
clipboardy.writeSync(generatedPassword);

// Save to file
if (save) {
  savePassword(generatedPassword);
}

// Output generated password
console.log(chalk.blue("Generated Password: ") + chalk.bold(generatedPassword));
console.log(chalk.yellow("Password copied to clipboard"));
