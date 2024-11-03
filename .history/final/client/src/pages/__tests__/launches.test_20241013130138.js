import { Builder, By, until } from "selenium-webdriver";
import { Options } from "selenium-webdriver/firefox";

const firefoxOptions = new Options();
firefoxOptions.headless();

describe("Launches Component", () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder()
      .forBrowser("firefox")
      .setFirefoxOptions(firefoxOptions)
      .build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  it("should render launches", async () => {
    await driver.get("http://localhost:3000/launches");

    const launchTiles = await driver.findElements(By.className("launch-tile"));

    expect(launchTiles.length).toBeGreaterThan(0);
  });

  it("should load more launches", async () => {
    await driver.get("http://localhost:3000/launches");

    const initialLaunchTiles = await driver.findElements(
      By.className("launch-tile")
    );

    const loadMoreButton = await driver.findElement(
      By.className("load-more-button")
    );
    await loadMoreButton.click();

    await driver.wait(until.stalenessOf(loadMoreButton));

    const updatedLaunchTiles = await driver.findElements(
      By.className("launch-tile")
    );

    expect(updatedLaunchTiles.length).toBeGreaterThan(
      initialLaunchTiles.length
    );
  });
});
