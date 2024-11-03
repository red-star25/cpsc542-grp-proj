const { Builder, By, until } = require("selenium-webdriver");

(async function launchesTest() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("http://localhost:3000"); // Replace with the URL of your application

    // Find the email input field and enter an email
    const emailInput = await driver.findElement(By.css('input[name="email"]'));
    await emailInput.sendKeys("test@test.com");

    // Find the submit button and click it
    const submitButton = await driver.findElement(
      By.css('button[type="submit"]')
    );
    await submitButton.click();

    // Wait for the page to load
    
  } finally {
    await driver.quit();
  }
})();
