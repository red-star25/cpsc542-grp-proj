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
    //Navigate to the login page
    await driver.get("http://localhost:3000");
    console.log("Login page loaded.");
    const emailInput = await driver.findElement(By.css('input[name="email"]'));
    await emailInput.sendKeys("test@test.com");
    const loginButton = await driver.findElement(By.css('button[type="submit"]'));
    await loginButton.click();
    console.log("Login submitted.");

    //Navigate to the item details page
    console.log("Navigating to the item details page...");
    await driver.wait(
      until.urlMatches(/\/launch\/\d+$/),
      TIMEOUT,
      "User must navigate to the item details page."
    );
    console.log("User navigated to the item details page.");

    // Add to Cart
    console.log("Please click 'Add to Cart' manually.");
    const addToCartButton = await driver.wait(
      until.elementLocated(By.css('[data-testid="action-button"]')), 
      TIMEOUT
    );
    await driver.wait(until.elementIsVisible(addToCartButton), TIMEOUT);
    console.log("Waiting for 'Remove from Cart' state...");

    // Check if the button text changes dynamically
    await driver.wait(async () => {
      const buttonText = await addToCartButton.getText();
      return buttonText.toLowerCase() === "remove from cart";
    }, TIMEOUT);
    console.log("Item successfully added to the cart.");

  } catch (error) {
    console.error("Test Failed:", error);
  } finally {
    console.log("Add to Cart Test completed.");
    await driver.quit();
  }
})();
