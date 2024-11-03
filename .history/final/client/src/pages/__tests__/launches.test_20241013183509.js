const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

(async function launchesTest() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("http://localhost:3000"); // Replace with the URL of your application

    // Wait for the page to load
    await driver.wait(until.elementLocated(By.tagName("p")));

    // Assert that the loading message is not displayed
    let loadingMessage = await driver.findElement(By.tagName("p")).getText();
    expect(loadingMessage).not.toEqual("ERROR");

    // Assert that the launch tiles are displayed
    let launchTiles = await driver.findElements(By.className("launch-tile"));
    expect(launchTiles.length).toBeGreaterThan(0);

    // Click the "Load More" button
    let loadMoreButton = await driver.findElement(By.tagName("button"));
    await loadMoreButton.click();

    // Wait for the additional launches to load
    await driver.wait(until.elementLocated(By.className("loading")));

    // Assert that the loading message is displayed
    let loadingMoreMessage = await driver
      .findElement(By.className("loading"))
      .getText();
    expect(loadingMoreMessage).toEqual("Loading");

    // Assert that the additional launch tiles are displayed
    let additionalLaunchTiles = await driver.findElements(
      By.className("launch-tile")
    );
    expect(additionalLaunchTiles.length).toBeGreaterThan(launchTiles.length);
  } finally {
    await driver.quit();
  }
})();
