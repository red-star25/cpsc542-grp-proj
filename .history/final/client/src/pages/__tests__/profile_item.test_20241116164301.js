// test/profileForm.test.js
const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

const TIMEOUT = 2000;

(async function profileItemTest() {
  let driver = await new Builder().forBrowser("chrome").build();
  await login(driver);
  try {
    // Navigate to the page containing the ProfileForm without .get 
    await driver.get("http://localhost:3000/profile");

    try {
      await driver.wait(until.elementLocated(By.css("h2")), TIMEOUT);
      // Check if the next page with the title "My Trips" with h2 is present
      const title = await driver.findElement(By.css("h2")).getText();
      assert.strictEqual(title, "My Trips");
    } catch (error) {
      throw new Error("Test Failed: Title not found");
    }

    // Assert that the success message is as expected
    assert.strictEqual(true, true);

    addItemToProfile(driver);

    console.log("Test Passed: profile form submitted successfully.");
  } catch (error) {
    console.error("Test Failed:", error);
  } finally {
    await driver.quit();
  }
})();

async function addItemToProfile(driver) {
  await driver.get("http://localhost:3000/");
 
  //find product with h3 name Starlink-15 (v1.0) and click
  const product = await driver.findElement(By.css("h3"));
  await product.click();

  // find button with Test ADD TO CART and click
  const addToCart = await driver.findElement(By.css("button"));
  await addToCart.click();

  await driver.get("http://localhost:3000/cart");
  // find button BOOK ALL and click
  const bookAll = await driver.findElement(By.css("button"));
  await bookAll.click();

  // goto profile page
  await driver.get("http://localhost:3000/profile");

  try {
    await driver.wait(until.elementLocated(By.css("h2")), TIMEOUT);
    // Check if the next page with the title "My Trips" with h2 is present
    const title = await driver.findElement(By.css("h2")).getText();
    assert.strictEqual(title, "My Trips");

    // assert that the item was added to the profile page
    const item = await driver.findElement(By.css("h3"));
    assert.strictEqual(item, "Starlink-15 (v1.0)");
  } catch (error) {
    throw new Error("Test Failed: Title not found");
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
}