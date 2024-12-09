const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const options = new chrome.Options();
options.addArguments("--ignore-certificate-errors");
options.addArguments("--disable-web-security");
options.addArguments("--allow-insecure-localhost");

const TIMEOUT = 30000;

(async function addToCartTest() {
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    // Navigate to the login page and log in
    await driver.get("http://localhost:3000");
    console.log("Login page loaded.");
    const emailInput = await driver.findElement(By.css('input[name="email"]'));
    await emailInput.sendKeys("test@test.com");
    const loginButton = await driver.findElement(By.css('button[type="submit"]'));
    await loginButton.click();
    console.log("Login submitted.");

    // Wait until redirected to the homepage
    await driver.wait(
      until.urlContains("localhost:3000"),
      TIMEOUT,
      "Failed to load homepage after login."
    );
    console.log("Homepage loaded.");

    //  Click the first available item link
    const firstItem = await driver.wait(
      until.elementLocated(By.css('a[href^="/launch/"]')), 
      TIMEOUT
    );
    await firstItem.click();
    console.log("Navigated to the item details page.");

    //Scroll and click the "Add to Cart" button
    const addToCartButton = await driver.wait(
      until.elementLocated(By.css('[data-testid="action-button"]')),
      TIMEOUT,
      "Failed to find the Add to Cart button."
    );

    // Ensure the button is visible by scrolling it into view
    await driver.executeScript("arguments[0].scrollIntoView(true);", addToCartButton);

    // Wait until the button is clickable and click it
    await driver.wait(until.elementIsVisible(addToCartButton), TIMEOUT);
    await driver.wait(until.elementIsEnabled(addToCartButton), TIMEOUT);
    await addToCartButton.click();
    console.log("Clicked 'Add to Cart' button.");

    //  Verify the button text changes to "Remove from Cart"
    await driver.wait(async () => {
      const buttonText = await addToCartButton.getText();
      return buttonText.toLowerCase() === "remove from cart";
    }, TIMEOUT);
    console.log("Item successfully added to the cart.");

    // Test passed
    console.log("Test Passed: Item added to the cart automatically.");
  } catch (error) {
    console.error("Test Failed:", error);
  } finally {
    console.log("Test completed. Closing the browser...");
    await driver.quit();
  }
})();
