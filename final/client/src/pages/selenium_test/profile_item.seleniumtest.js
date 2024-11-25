// test/profileForm.test.js
const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

const TIMEOUT = 1000;

(async function profileItemTest() {
  let driver = await new Builder().forBrowser("chrome").build();
  await login(driver);
  await addItemToProfile(driver);
  await cancelTrip(driver);

})();

async function addItemToProfile(driver) {
  await driver.get("http://localhost:3000/launch/109");
  await driver.sleep(TIMEOUT);

  const addToCart = await driver.findElement(By.css("button"));
  await addToCart.click();
await driver.sleep(TIMEOUT);


  console.log("Test Passed: item added to cart.");

  
    const cartLink = await driver.wait(
        until.elementLocated(By.xpath("//a[@href='/cart']")),
        TIMEOUT
      );
  
      await cartLink.click();
  await driver.sleep(TIMEOUT);

  const bookAll = await driver.findElement(By.css("button"));
  await bookAll.click();

  await driver.sleep(TIMEOUT);


 const profileLink = await driver.wait(
    until.elementLocated(By.xpath("//a[@href='/profile']")),
    TIMEOUT
  );
  
  await profileLink.click();
  await driver.sleep(TIMEOUT);


  try {
    await driver.wait(until.elementLocated(By.css("h2")), TIMEOUT);
    const title = await driver.findElement(By.css("h2")).getText();  
    assert.strictEqual(title, "My Trips");

    const starlinkText = await driver.wait(
        until.elementLocated(By.xpath("//h3[text()='Starlink-15 (v1.0)']")),
        TIMEOUT
      );
  
      // Get and print the text content
      const textContent = await starlinkText.getText();
      console.log('Found Item: ',textContent);

    console.log("Test Passed: item added to profile.");
  } catch (error) {
    throw new Error("Test Failed: Title not found");
}
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

async function cancelTrip(driver){

  await driver.sleep(TIMEOUT);

  // Wait for the element with the "Starlink-15 (v1.0)" text to appear
  const starlinkElement = await driver.wait(
    until.elementLocated(By.xpath("//h3[text()='Starlink-15 (v1.0)']")),
    TIMEOUT // Timeout in milliseconds
  );

  await starlinkElement.click();

   const cancelTrip = await driver.findElement(By.css("button"));
   await cancelTrip.click();
 
   await driver.sleep(TIMEOUT);

  const profile = await driver.wait(
    until.elementLocated(By.xpath("//a[@href='/profile']")),
    TIMEOUT
  );

  await profile.click();

  try {
    const noTrip = await driver.findElement(By.css("p")).getText();
    assert.strictEqual(noTrip, "You haven't booked any trips");
    console.log("Test Passed: Cancel Trip Functionality Working.");
  } catch (error) {
    throw new Error("Test Failed: Title not found");
}

}