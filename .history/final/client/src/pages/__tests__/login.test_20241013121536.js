// test/loginForm.test.js
const { Builder, By, until, before } = require("selenium-webdriver");
const assert = require("assert");

const TIMEOUT = 2000;

describe("Login Form Tests", function() {
  let driver;

  before(async function() {
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async function() {
    await driver.quit();
  });

  it("should login successfully with valid credentials", async function() {
    await driver.get("http://localhost:3000");

    await driver.wait(until.elementLocated(By.css("form")), TIMEOUT);

    const emailInput = await driver.findElement(By.css('input[name="email"]'));
    await emailInput.sendKeys("test@test.com");

    const passwordInput = await driver.findElement(By.css('input[name="password"]'));
    await passwordInput.sendKeys("password123");

    const submitButton = await driver.findElement(By.css('button[type="submit"]'));
    await submitButton.click();

    await driver.wait(until.elementLocated(By.css("h2")), TIMEOUT);
    const title = await driver.findElement(By.css("h2")).getText();
    assert.strictEqual(title, "Space Explorer");

    console.log("Test Passed: Login form submitted successfully.");
  });

  it("should show error message with invalid credentials", async function() {
    await driver.get("http://localhost:3000");

    await driver.wait(until.elementLocated(By.css("form")), TIMEOUT);

    const emailInput = await driver.findElement(By.css('input[name="email"]'));
    await emailInput.sendKeys("invalid@test.com");

    const passwordInput = await driver.findElement(By.css('input[name="password"]'));
    await passwordInput.sendKeys("wrongpassword");

    const submitButton = await driver.findElement(By.css('button[type="submit"]'));
    await submitButton.click();

    await driver.wait(until.elementLocated(By.css(".error-message")), TIMEOUT);
    const errorMessage = await driver.findElement(By.css(".error-message")).getText();
    assert.strictEqual(errorMessage, "Invalid credentials");

    console.log("Test Passed: Error message displayed for invalid credentials.");
  });

  it("should show validation errors for empty fields", async function() {
    await driver.get("http://localhost:3000");

    await driver.wait(until.elementLocated(By.css("form")), TIMEOUT);

    const submitButton = await driver.findElement(By.css('button[type="submit"]'));
    await submitButton.click();

    await driver.wait(until.elementLocated(By.css(".validation-error")), TIMEOUT);
    const validationErrors = await driver.findElements(By.css(".validation-error"));
    assert.strictEqual(validationErrors.length, 2);

    console.log("Test Passed: Validation errors displayed for empty fields.");
  });
});
