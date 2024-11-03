// tests/example.test.js
const { Builder, until } = require("selenium-webdriver");

// Increase the timeout duration
const TIMEOUT = 5000; // 5 seconds

(async function example() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://localhost:3000"); // Change to your app's URL
    await driver.wait(until.titleIs("Space Explorer"), 1000); // Change to your app's title
    // Add more interactions and assertions here
  } finally {
    await driver.quit();
  }
})();
