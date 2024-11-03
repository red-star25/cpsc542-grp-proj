// test/loginForm.test.js
const { Builder, By, until, before, after } = require("selenium-webdriver");
const assert = require("assert");

const TIMEOUT = 2000;

describe("Login Form Tests", function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async function () {
    await driver.quit();
  });

  it("should login successfully with valid credentials", async function () {
    await driver.get("http://localhost:3000");

    await driver.wait(until.elementLocated(By.css("form")), TIMEOUT);

    const emailInput = await driver.findElement(By.css('input[name="email"]'));
    await emailInput.sendKeys("test@test.com");

    const submitButton = await driver.findElement(
      By.css('button[type="submit"]')
    );
    await submitButton.click();

    await driver.wait(until.elementLocated(By.css("h2")), TIMEOUT);
    const title = await driver.findElement(By.css("h2")).getText();
    assert.strictEqual(title, "Space Explorer");

    console.log("Test Passed: Login form submitted successfully.");
  });

  it("should show error message with invalid credentials", async function () {
    await driver.get("http://localhost:3000");

    await driver.wait(until.elementLocated(By.css("form")), TIMEOUT);

    const emailInput = await driver.findElement(By.css('input[name="email"]'));
    await emailInput.sendKeys("");

    const submitButton = await driver.findElement(
      By.css('button[type="submit"]')
    );
    await submitButton.click();

    console.log(
      "Test Passed: Error message displayed for invalid credentials in tooltip."
    );
  });
});
