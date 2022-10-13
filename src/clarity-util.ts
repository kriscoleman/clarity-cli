import webdriver, { By, Key, until, WebElement } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import firefox from "selenium-webdriver/firefox";

export type BrowserType = "safari" | "chrome" | "firefox";

export const clarity = async (
  browser: BrowserType,
  userName: string,
  pass: string,
  website: string,
  dryRun: boolean,
  headless: boolean,
  hours?: number,
  monday?: number,
  tuesday?: number,
  wednesday?: number,
  thursday?: number,
  friday?: number
) => {
  if (!userName || !pass || !website) {
    return;
  }

  let builder = new webdriver.Builder().forBrowser(browser);

  if (headless) {
    builder
      .setChromeOptions(new chrome.Options().headless().windowSize(screen))
      .setFirefoxOptions(new firefox.Options().headless().windowSize(screen));
  }

  let driver = builder.build();

  try {
    const uri = encodeURI(
      `https://${userName}:${pass}@${website
        .replace("https://", "")
        .replace("http://", "")}`
    );
    await driver.get(uri);
    await driver.wait(until.titleIs("Clarity PPM :: Login"));
    // 1. enter username 'ppm_login_username'
    const loginInput = await driver.findElement(By.id("ppm_login_username"));

    if (loginInput) {
      loginInput.sendKeys(userName, Key.RETURN);
    }

    // 2. enter pass 'ppm_login_password'
    const passInput = await driver.findElement(By.id("ppm_login_password"));
    if (passInput) {
      passInput.sendKeys(pass, Key.RETURN);
    }

    // 3 click login button 'ppm_login_button'
    await driver.findElement(By.id("ppm_login_button"))?.click();
    await driver.wait(until.titleIs("Clarity PPM :: Overview: General"));

    // 4 click button with id 'ppm_timesheet'
    await driver.findElement(By.id("ppm_timesheet"))?.click();
    await driver.wait(until.titleIs("Clarity PPM :: Timesheet"));

    // 5 click button with text 'Populate'
    await driver.findElement(By.xpath('//button[text()="Populate"]'))?.click();

    // handle if we've already populated
    try {
      await driver.wait(until.titleContains("Repopulate Confirmation"), 6000);
      await driver.findElement(By.xpath('//button[text()="Yes"]'))?.click();
    } catch (error) {}
    await driver.wait(until.titleContains("Timesheet"));

    // 6 find first input with name 'timeentry_id' <start days>
    const timeInputs = await driver.findElements(By.name("actuals_hours"));

    const shouldEnterHours = async (
      timeInput: WebElement,
      dayHours?: number | string,
      hours?: number | string
    ) => (await timeInput.getAttribute("value")) != dayHours || hours;

    if (timeInputs) {
      // index 1 should be the 2nd field, `Monday`
      // TODO: if there's already a value there, can we just handle that? maybe select text so we overwrite it
      if (await shouldEnterHours(timeInputs[1], monday, hours)) {
        timeInputs[1].sendKeys(monday || hours || "8");
      }
      if (await shouldEnterHours(timeInputs[2], tuesday, hours)) {
        timeInputs[2].sendKeys(tuesday || hours || "8");
      }
      if (await shouldEnterHours(timeInputs[3], wednesday, hours)) {
        timeInputs[3].sendKeys(wednesday || hours || "8");
      }
      if (await shouldEnterHours(timeInputs[4], thursday, hours)) {
        timeInputs[4].sendKeys(thursday || hours || "8");
      }
      if (await shouldEnterHours(timeInputs[5], friday, hours)) {
        timeInputs[5].sendKeys(friday || hours || "8");
      }
    }

    // 7 click button with text `Save`
    await driver.findElement(By.xpath('//button[text()="Save"]'))?.click();

    // 16 click button with text `Submit for Approval`
    if (!dryRun) {
      await driver
        .findElement(By.xpath('//button[text()="Submit for Approval"]'))
        ?.click();
    }
  } finally {
    if (!dryRun) {
      await driver.close();
    }
  }
};
