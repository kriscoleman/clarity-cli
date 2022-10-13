#!/usr/bin/env node

import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import { program } from "commander";
import { BrowserType, clarity } from "./clarity-util";
import { exit } from "process";
import promptly from "promptly";
import os from "os";

const cli = async (): Promise<void> => {
  let browserType: BrowserType;
  clear();

  const splash = () => {
    console.log(
      chalk.blue(
        "⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰"
      )
    );
    console.log(
      chalk.blue(
        figlet.textSync("clarity-cli ⏰", { horizontalLayout: "full" })
      )
    );
    console.log(
      chalk.blue(
        "🏃🏻  💨💨💨💨💨💨💨💨💨💨💨💨💨💨💨💨💨💨💨💨💨💨💨💨💨💨💨💨💨💨⏰"
      )
    );
  };

  splash();

  program
    .version("0.0.0")
    .description(
      "A cli for Clarity Timesheets, because we have better 💩 to do! 🏃🏻💨"
    )
    .option("-c, --chrome", "Use Chrome Browser")
    .option("-f, --firefox", "Use Firefox Browser")
    .option("-s, --safari", "Use Safari Browser")
    .option(
      "-d, --dryRun",
      "Don't actually submit the timesheet for approval, just stop at the end."
    )
    .option(
      "-h, --headless",
      "Use headless mode. Oh boy, sure hope you trust me!"
    )
    .option("-i, --installHelp", "Get installation help")
    .option("-u, --userName <username>", "Your org username")
    .option(
      "-w, --website <url>",
      "Your clarity api url, WITHOUT PROTOCOL, simply like 'clarity.mycompany.com'."
    )
    .option(
      "-H, --hours <number>",
      "Hours, if you want to customize the default hours per day"
    )
    .option(
      "-M, --monday <number>",
      "Hours for Monday, if you want to customize"
    )
    .option(
      "-T, --tuesday <number>",
      "Hours for Tuesday, if you want to customize"
    )
    .option(
      "-W, --wednesday <number>",
      "Hours for Wednesday, if you want to customize"
    )
    .option(
      "-T, --thursday <number>",
      "Hours for Thursday, if you want to customize"
    )
    .option(
      "-F, --friday <number>",
      "Hours for Friday, if you want to customize"
    )
    .parse(process.argv);

  const options = program.opts();

  // handle help param
  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }

  console.log("\r\n");
  console.log("\r\n");

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

  if (!options.userName) {
    const osUser = os.userInfo().username;
    const userName = await promptly.prompt(
      `Your organization username: (default: ${osUser})`,
      {
        default: osUser,
      }
    );
    options.userName = userName;
  }

  const pass = await promptly.password("Password: ", { silent: true });
  options.pass = pass;

  if (!options.website) {
    const website = await promptly.prompt(
      "Your organization's clarity url (e.g. clarity.mybiz.com): "
    );
    options.website = website;
  }

  if (!options.safari && !options.chrome && !options.firefox) {
    browserType = (await promptly.choose(
      "Which browser have you set up for selenium-webdriver? (default: chrome)",
      ["chrome", "safari", "firefox"],
      { default: "chrome" }
    )) as BrowserType;

    options[browserType] = true;
  } else {
    browserType = options.safari
      ? "safari"
      : options.chrome
      ? "chrome"
      : options.firefox
      ? "firefox"
      : "chrome";
  }

  if (!options.hours) {
    options.hours = 8;
  }

  console.log(chalk.yellow(figlet.textSync("order up!")));
  console.log("\r\n");
  console.log(chalk.yellow(`browser: ${browserType}`));
  console.log(chalk.yellow(`userName: ${options.userName}`));
  console.log(chalk.yellow(`password: hahaa-jkjk-:p`));
  console.log(chalk.yellow(`website: ${options.website}`));
  console.log(chalk.yellow(`dryRun: ${options.dryRun ? "true" : "false"}`));
  console.log(chalk.yellow(`headless: ${options.headless ? "true" : "false"}`));
  console.log(chalk.yellow(`hours: ${options.hours}`));
  console.log(
    chalk.yellow(`monday: ${options.monday ? options.monday : options.hours}`)
  );
  console.log(
    chalk.yellow(
      `tuesday: ${options.tuesday ? options.tuesday : options.hours}`
    )
  );
  console.log(
    chalk.yellow(
      `wednesday: ${options.wednesday ? options.wednesday : options.hours}`
    )
  );
  console.log(
    chalk.yellow(
      `thursday: ${options.thursday ? options.thursday : options.hours}`
    )
  );
  console.log(
    chalk.yellow(`friday: ${options.friday ? options.friday : options.hours}`)
  );
  console.log("\r\n");

  const confirmed = await promptly.confirm("look good to you? (y) or (n)");
  if (!confirmed) {
    return;
  }

  clear();
  console.log(chalk.blue(`booting up ${browserType}...`));
  clarity(
    browserType,
    options.userName,
    options.pass,
    options.website,
    options.dryRun,
    options.headless,
    options.hours,
    options.monday,
    options.tuesday,
    options.wednesday,
    options.thursday,
    options.friday
  )
    .then(() => {
      splash();
      clear();
      console.log(
        chalk.green(figlet.textSync("All done!", { horizontalLayout: "full" }))
      );
      console.log(
        chalk.green(
          "✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅"
        )
      );
      console.log(chalk.blue("... btw ..."));
      console.log("\r\n");
      console.log(
        chalk.blue("... here's a shortcut command for next time  ...")
      );
      console.log("\r\n");
      console.log(
        chalk.blue(
          "⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰⏰"
        )
      );

      const commandString = `clarity -u ${options.userName} -w ${
        options.website
      }${(options.chrome && "-c ") || ""}${(options.safari && "-s ") || ""}${
        (options.firefox && "-f ") || ""
      }${(options.headless && "-h ") || ""}${(options.dryRun && "-d ") || ""}${
        (options.hours && options.hours != 8 && `-h ${options.hours}`) || ""
      }${(options.monday && `-m ${options.monday}`) || ""}${
        (options.tuesday && `-h ${options.tuesday}`) || ""
      }${(options.wednesday && `-h ${options.wednesday}`) || ""}${
        (options.thursday && `-h ${options.thrusday}`) || ""
      }${(options.friday && `-h ${options.friday}`) || ""}`;
      console.log("\r\n");
      console.log("\r\n");
      console.log(chalk.magenta(commandString));
      console.log("\r\n");
      console.log("\r\n");
      console.log(
        chalk.blue("🏃🏻  💨💨💨💨💨💨💨💨💨💨💨💨💨💨💨💨💨💨💨💨💨💨💨💨💨💨⏰")
      );
    })
    .catch(console.error);
};

export default cli;

void cli();
