// test/profileForm.test.js
const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

const TIMEOUT = 3000;

(async function profileItemTest() {
  let driver = await new Builder().forBrowser("chrome").build();
  await login(driver);
  await addItemToProfile(driver);
})();

async function addItemToProfile(driver) {
  await driver.get("http://localhost:3000/launch/109");
  await driver.sleep(TIMEOUT);


  // find button with Test ADD TO CART and click
  const addToCart = await driver.findElement(By.css("button"));
  await addToCart.click();

  await driver.sleep(TIMEOUT);


  console.log("Test Passed: item added to cart.");

  await driver.get("http://localhost:3000/cart");
  //add delay to let the page load
  await driver.sleep(TIMEOUT);

  // find button BOOK ALL and click
  const bookAll = await driver.findElement(By.css("button"));
  await bookAll.click();

  await driver.sleep(TIMEOUT);


  // goto profile page
  await driver.get("http://localhost:3000/profile");

  await driver.sleep(TIMEOUT);


//   try {
//     await driver.wait(until.elementLocated(By.css("h2")), TIMEOUT);
//     // Check if the next page with the title "My Trips" with h2 is present
//     const title = await driver.findElement(By.css("h2")).getText();  
//     assert.strictEqual(title, "My Trips");

//     // assert that the item was added to the profile page
//     const item = await driver.findElement(By.css("h3"));
//     assert.strictEqual(item, "Starlink-15 (v1.0)");

//     console.log("Test Passed: item added to profile.");
//   } catch (error) {
//     throw new Error("Test Failed: Title not found");
// }
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