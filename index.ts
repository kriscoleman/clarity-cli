#!/usr/bin/env node

import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import { program } from "commander";
import { clarity } from "./clarity-util";
import { exit } from "process";

clear();
console.log(
  chalk.blue(figlet.textSync("clarity-cli ⏰", { horizontalLayout: "full" }))
);

program
  .version("0.0.0")
  .description(
    "A cli for Clarity Timesheets, because we have better 💩 to do! 🏃🏻💨"
  )
  .option("-c, --chrome", "Use Chrome Browser")
  .option("-f, --firefox", "Use Firefox Browser")
  .option(
    "-h, --headless",
    "Use headless mode. Oh boy, sure hope you trust me!"
  )
  .option("-i, --installHelp", "Get installation help")
  .option("-s, --safari", "Use Safari Browser")
  .option("-u, --userName <username>", "Your org username")
  .option(
    "-d, --dryRun",
    "Don't actually submit the timesheet for approval, just stop at the end."
  )
  .option(
    "-w, --website <url>",
    "Your clarity api url, WITHOUT PROTOCOL, simply like 'clarity.mycompany.com'."
  )
  .option("-p, --pass <password>", "Your org pass")
  .parse(process.argv);

const options = program.opts();

// handle help param
if (!process.argv.slice(2).length) {
  program.outputHelp();
}

if (options.installHelp) {
  console.log(chalk.blue("Need help setting up?"));
  console.log(chalk.blue("Happy to help!"));
  console.log(
    chalk.blue(
      "First, go here: https://github.com/SeleniumHQ/selenium/tree/trunk/javascript/node/selenium-webdriver#readme"
    )
  );
  console.log(
    chalk.blue(
      "Then make sure you have the Driver for your browser installed. If you are using Chrome, get ChromeDriver, etc. "
    )
  );
  exit(0);
}

/** HANDLE REQUIRED PARAMS */
if (!options.userName) {
  console.error("--u, --userName required, we gotta know who ya are");
  throw new Error("Missing Required Param");
}

if (!options.pass) {
  console.error("--p, --pass required, we gotta know your pass");
  throw new Error("Missing Required Param");
}

if (!options.website) {
  console.error("--w, --website required, we gotta know your clarity url");
  throw new Error("Missing Required Param");
}

if (!options.safari && !options.chrome && !options.firefox) {
  console.error("You need to tell us what browser to try and use.");
  throw new Error("Missing Required BrowserType");
}
/** END HANDLE REQUIRED PARAMS */

if (options.safari) {
  console.log(chalk.blue("booting up safari..."));
  clarity(
    "safari",
    options.userName,
    options.pass,
    options.website,
    options.dryRun,
    options.headless
  )
    .then(() => {
      console.log(
        chalk.green(figlet.textSync("All done!", { horizontalLayout: "full" }))
      );
    })
    .catch(console.error);
}

if (options.chrome) {
  console.log(chalk.blue("booting up chrome..."));
  clarity(
    "chrome",
    options.userName,
    options.pass,
    options.website,
    options.dryRun,
    options.headless
  )
    .then(() => {
      console.log(
        chalk.green(figlet.textSync("All done!", { horizontalLayout: "full" }))
      );
    })
    .catch(console.error);
}

if (options.firefox) {
  console.log(chalk.blue("booting up firefox..."));
  clarity(
    "firefox",
    options.userName,
    options.pass,
    options.website,
    options.dryRun,
    options.headless
  )
    .then(() => {
      console.log(
        chalk.green(figlet.textSync("All done!", { horizontalLayout: "full" }))
      );
    })
    .catch(console.error);
}
