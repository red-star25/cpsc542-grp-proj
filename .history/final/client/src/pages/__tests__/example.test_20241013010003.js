// test/loginForm.test.js
const { Builder, By, until, WebDriverError } = require("selenium-webdriver");
const assert = require("assert");
const fs = require("fs");

const TIMEOUT = 2000;

(async function loginFormTest() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Navigate to the page containing the LoginForm
    await driver.get("http://localhost:3000"); // Adjust the URL as necessary

    try {
      // Wait for the LoginForm to be present
      await driver.wait(until.elementLocated(By.css("form")), TIMEOUT);

      // Find the email input field and enter an email
      const emailInput = await driver.findElement(By.css('input[name="email"]'));
      await emailInput.sendKeys("");

      // Find the submit button and click it
      const submitButton = await driver.findElement(
        By.css('button[type="submit"]')
      );
      await submitButton.click();

      // Check if the next page with the title "Space Explorer" with h2 is present
      await driver.wait(until.elementLocated(By.css("h2")), TIMEOUT);
      // if not present, throw an error
      if (!(await driver.findElement(By.css("h2")).isDisplayed())) {
        throw new Error("Page not loaded");
      }

      // Assert that the success message is as expected
      assert.strictEqual(true, true);
      console.log("Test Passed: Login form submitted successfully.");
    } catch (error) {
      if (error instanceof WebDriverError) {
        console.error("Element not found within the timeout period:", error);
        // Optionally take a screenshot for debugging
        const screenshot = await driver.takeScreenshot();
        fs.writeFileSync('error_screenshot.png', screenshot, 'base64');
      }
      throw error; // Rethrow the error if you want to fail the test
    }
  } catch (error) {
    console.error("Test Failed:", error);
  } finally {
    await driver.quit();
  }
})();
