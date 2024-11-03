// test/loginForm.test.js
const { Builder, By, until } = require("selenium-webdriver");

(async function loginFormTest() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Navigate to the page containing the LoginForm
    await driver.get("http://localhost:3000"); // Adjust the URL as necessary

    // Wait for the LoginForm to be present
    await driver.wait(until.elementLocated(By.css("form")), 10000);

    // Find the email input field and enter an email
    const emailInput = await driver.findElement(By.css('input[name="email"]'));
    await emailInput.sendKeys("test@example");

    // Find the submit button and click it
    const submitButton = await driver.findElement(
      By.css('button[type="submit"]')
    );
    await submitButton.click();
  } finally {
    await driver.quit();
  }
})();
