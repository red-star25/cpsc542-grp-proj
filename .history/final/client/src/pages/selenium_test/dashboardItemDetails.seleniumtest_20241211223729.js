// test/profileForm.test.js
const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

const TIMEOUT = 1000;
(async function dashboardItemTest() {
  let driver = await new Builder().forBrowser("chrome").build();
  await login(driver);
  await checkDashboardTitle(driver);
  await checkDashboardItem(driver);
  await clickDashboardItem(driver);
  await checkDashboardItemDetails(driver);
  await driver.quit();
})();

async function checkDashboardTitle(driver) {
  await driver.sleep(TIMEOUT);
  await driver.get("http://localhost:3000/");
  await driver.wait(until.elementLocated(By.css("h2")), TIMEOUT);
  const title = await driver.findElement(By.css("h2")).getText();
  assert.strictEqual(title, "Space Explorer");
  console.log("Test Passed: Dashboard title found.");
}

async function checkDashboardItem(driver) {
  await driver.sleep(TIMEOUT);
  await driver.get("http://localhost:3000/");
  await driver.wait(until.elementLocated(By.css("h3")), TIMEOUT);
  const item = await driver.findElement(By.css("h3")).getText();
  assert.strictEqual(item, "Starlink-15 (v1.0)");
  console.log("Test Passed: Dashboard item found.");
}

async function clickDashboardItem(driver) {
  await driver.sleep(TIMEOUT);
  await driver.get("http://localhost:3000/");
  await driver.wait(until.elementLocated(By.css("h3")), TIMEOUT);
  const item = await driver.findElement(By.css("h3"));
  await item.click();
  console.log("Test Passed: Dashboard item clicked.");
}

async function checkDashboardItemDetails(driver) {
  await driver.sleep(TIMEOUT);
  await driver.get("http://localhost:3000/109");
  await driver.wait(until.elementLocated(By.css("h3")), TIMEOUT);
  const title = await driver.findElement(By.css("h3")).getText();
  assert.strictEqual(title, "Falcon 9 (FT)");
  console.log("Test Passed: Dashboard item details found.");
}

async function login(driver) {
  await driver.get("http://localhost:3000");
  await driver.wait(until.elementLocated(By.css("form")), TIMEOUT);

  const emailInput = await driver.findElement(By.css('input[name="email"]'));
  await emailInput.sendKeys("test@gmail.com");

  const submitButton = await driver.findElement(
    By.css('button[type="submit"]')
  );
  await submitButton.click();
  console.log("Test Passed: Login successful.");
}
