const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const options = new chrome.Options();
options.addArguments("--ignore-certificate-errors");
options.addArguments("--disable-web-security");
options.addArguments("--allow-insecure-localhost");

const TIMEOUT = 30000; // Timeout for waiting operations

(async function cartPageTest() {
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    // Navigate to the login page
    await driver.get("http://localhost:3000");
    console.log("Login page loaded.");
    const emailInput = await driver.findElement(By.css('input[name="email"]'));
    await emailInput.sendKeys("test@test.com");
    const loginButton = await driver.findElement(By.css('button[type="submit"]'));
    await loginButton.click();
    console.log("Login submitted.");

    //  Navigate to the first available item details page
    console.log("Navigating to the first item details page...");
    const firstItem = await driver.wait(
      until.elementLocated(By.css('a[href^="/launch/"]')), // Selects the first item link
      TIMEOUT
    );
    await firstItem.click();
    console.log("Navigated to the item details page.");

    //  Add item to the cart
    console.log("Adding item to the cart...");
    const addToCartButton = await driver.wait(
      until.elementLocated(By.css('[data-testid="action-button"]')), // Finds the "Add to Cart" button
      TIMEOUT
    );

    // Scroll to the button and click
    await driver.executeScript("arguments[0].scrollIntoView(true);", addToCartButton);
    await driver.wait(until.elementIsVisible(addToCartButton), TIMEOUT);
    await addToCartButton.click();
    console.log("Clicked 'Add to Cart' button.");

    // Verify the button text changes to "Remove from Cart"
    await driver.wait(async () => {
      const buttonText = await addToCartButton.getText();
      return buttonText.toLowerCase() === "remove from cart";
    }, TIMEOUT);
    console.log("Item successfully added to the cart.");

    //Remove item from the cart
    console.log("Removing item from the cart...");
    await addToCartButton.click(); // Clicks the same button to remove the item

    // Verify the button text changes back to "Add to Cart"
    await driver.wait(async () => {
      const buttonText = await addToCartButton.getText();
      return buttonText.toLowerCase() === "add to cart";
    }, TIMEOUT);
    console.log("Item successfully removed from the cart.");

    console.log("TEST PASSED: All actions completed successfully.");
  } catch (error) {
    console.error("Test Failed:", error);

    // Log the page source for debugging
    const pageSource = await driver.getPageSource();
    console.log("Page Source at failure:\n", pageSource);
  } finally {
    console.log("Test complete. Closing browser...");
    await driver.quit();
  }
})();
