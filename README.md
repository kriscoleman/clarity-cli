# Clarity Timesheet Cli ⏰

Because we got better 💩 to do! 🏃🏻💨

## What is this?

This is automation for the Clarity (by Broadcom) Timesheet platform.

It sucks, yea, I know.

And if you're using it, and maybe you're also salary, it might feel pretty pointless to update a timesheet every week when you only put in the 40 hours you are supposed to.

Give a dev a monotonous task, and they'll automate it, right?

Clarity is pretty old, and it's a pretty closed platform.

So this cli just uses selenium-webdriver to basically write an automated test against Clarity.

It opens a browser to your Clarity url, uses your creds to login, navs to the timesheet screen, populates it, finds the first row for hours and fills in 8 hours for M-F.

## Usage

It's as easy as `clarity`.

But maybe you want to make it as repeatable and automated as possible. Run it with the optional params to streamline it further.

For example, here's running clarity-cli with chrome, using creds for john, with clarity.mycompany.com, using a dry run so that we can see what it does, and it doesn't actually submit:

`clarity -c -u john -w clarity.mycompany.com -d`

## Prerequisites

1. Be sure to have nodejs installed
1. You'll want to have admin access to the machine your own to run the automation
1. You'll want to have the webdriver you'd like to use installed on your path for your machine. Follow setup instructions for selenium-webdriver javascript here: <https://github.com/SeleniumHQ/selenium/tree/trunk/javascript/node/selenium-webdriver#readme>

## Installation

Pretty easy depending on how you'd like to do it. You can clone this repo and compile it yourself, or you can do a `npm i` and call it good.

### Install from cloning the repo

1. clone this git repo
1. open a terminal at root of this project
1. run `npm i`
1. run `npm run create`
1. run `npm run local`
1. if you need to reinstall, or uninstall, you're gonna need to run `npm uninstall clarity` using this installation method

### Install from npm

1. run `npm i @kriscodeman/clarity-cli -g`

## Running this cli

After installation, it's pretty easy.

Just run `clarity` from your terminal. It'll guide you through the rest if you're missing any parameters.

Run `clarity -h` for the help output.

### Optional Params

1. Your browsertype (which selenium webdriver do you have set up on your machine? select from `chrome` or `safari` or `firefox`)
1. `-w, --website <website>`: Your orgs Clarity Timesheet platform url
1. `-u, --userName <userName>`: Your org username
1. `-d, --dryRun`: Makes sure the automation doesn't actually submit the timesheet. Pretty good idea to use this if you're testing or just curious.
1. `-h, --headless`: Makes the automation run headlessly, so you won't see anything other than the cli output. This means the browser won't open up so you can't watch the magic. But maybe you trust it so much you're cool with it running silently quickly in the background.
1. `-i, --installHelp`: Outputs some help info. This readme should be your source for additional help, but tossed this in just cuz.
1. `-H, --hours <number>`: change the default hours per day
1. `-M, --monday <number>`: change the hours for monday
1. `-T, --tuesday <number>`: change the hours for tuesday
1. `-W, --wednesday <number>`: change the hours for wednesday
1. `-T, --thursday <number>`: change the hours for thursday
1. `-F, --friday <number>`: change the hours for friday
