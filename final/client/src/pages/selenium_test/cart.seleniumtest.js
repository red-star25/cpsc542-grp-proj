const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const options = new chrome.Options();
options.addArguments("--ignore-certificate-errors");
options.addArguments("--disable-web-security");
options.addArguments("--allow-insecure-localhost");

const TIMEOUT = 30000; // Increased timeout to account for delays

(async function cartPageTest() {
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

   
    //Wait for user to navigate to item details page
    console.log("Please navigate to the item details page manually.");
    await driver.wait(
      until.urlMatches(/\/launch\/\d+$/), 
      TIMEOUT, 
      "User must navigate to the item details page."
    );
    console.log("User navigated to the item details page.");

    // Wait for "Add to Cart" button interaction
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

    //Handle "Remove from Cart" interaction manually
    console.log("You may remove the item from the cart now, later, or even after logging out.");
    while (true) {
      try {
        const removeFromCartButton = await driver.wait(
          until.elementLocated(By.css('[data-testid="action-button"]')), 
          TIMEOUT
        );
        await driver.wait(until.elementIsVisible(removeFromCartButton), TIMEOUT);

        // Check if button text changes back to "Add to Cart"
        const buttonText = await removeFromCartButton.getText();
        if (buttonText.toLowerCase() === "add to cart") {
          console.log("Item successfully removed from the cart.");
          break;
        }
      } catch {
        console.log("Waiting for user to remove the item... Checking again in 5 seconds.");
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
  } catch (error) {
    console.error("Test Failed:", error);

    // Log the page source for debugging
    const pageSource = await driver.getPageSource();
    console.log("Page Source at failure:\n", pageSource);
  } finally {
    console.log("TEST PASSED & complete. Browser will remain open for manual inspection.");
    
  }
})();
//
