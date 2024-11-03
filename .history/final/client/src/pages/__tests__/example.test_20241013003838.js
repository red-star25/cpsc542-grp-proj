import { Builder, By } from "selenium-webdriver"; // Import Selenium WebDriver

// Add a new test for Selenium
test("selenium test for launch page", async () => {
  const driver = await new Builder().forBrowser("chrome").build(); // Initialize the WebDriver
  try {
    await driver.get("http://localhost:3000/"); // Adjust the URL as necessary
    // check if button is displayed :: <Button type="submit">Log in</Button>
    
  } finally {
    await driver.quit(); // Ensure the driver quits after the test
  }
});
