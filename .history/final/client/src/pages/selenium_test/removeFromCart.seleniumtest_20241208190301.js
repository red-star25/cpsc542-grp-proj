const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const options = new chrome.Options();
options.addArguments("--ignore-certificate-errors");
options.addArguments("--disable-web-security");
options.addArguments("--allow-insecure-localhost");

const TIMEOUT = 30000; // Increased timeout to account for delays

(async function removeFromCartTest() {
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
    const loginButton = await driver.findElement(
      By.css('button[type="submit"]')
    );
    await loginButton.click();
    console.log("Login submitted.");

    // Navigate to the item details page
    console.log("Navigating to the item details page...");
    await driver.wait(
      until.urlMatches(/\/launch\/\d+$/),
      TIMEOUT,
      "User must navigate to the item details page."
    );
    console.log("User navigated to the item details page.");

    // Automatically Add to Cart
    console.log("Adding item to the cart ...");
    const addToCartButton = await driver.wait(
      until.elementLocated(By.css('[data-testid="action-button"]')),
      TIMEOUT
    );

    // Scroll to the button and click
    await driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      addToCartButton
    );
    await driver.wait(until.elementIsVisible(addToCartButton), TIMEOUT);

    // Retry click in case of interception
    let retryAttempts = 3;
    while (retryAttempts > 0) {
      try {
        await addToCartButton.click();
        console.log("Clicked 'Add to Cart' button.");
        break;
      } catch (error) {
        console.log("Click intercepted, retrying...");
        retryAttempts--;
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Retry after 1 second
      }
    }

    // Verify the button text changes to "Remove from Cart"
    await driver.wait(async () => {
      const buttonText = await addToCartButton.getText();
      return buttonText.toLowerCase() === "remove from cart";
    }, TIMEOUT);
    console.log("Item successfully added to the cart.");

    // Automatically Remove from Cart
    console.log("Removing item from the cart automatically...");
    await addToCartButton.click(); // Reuse the same button for removal

    // Verify the button text changes back to "Add to Cart"
    await driver.wait(async () => {
      const buttonText = await addToCartButton.getText();
      return buttonText.toLowerCase() === "add to cart";
    }, TIMEOUT);
    console.log("Item successfully removed from the cart.");
  } catch (error) {
    console.error("Test Failed:", error);

    // Log the page source for debugging
    const pageSource = await driver.getPageSource();
    console.log("Page Source at failure:\n", pageSource);
  } finally {
    console.log("Remove from Cart Test completed. Closing browser...");
    await driver.quit();
  }
})();
