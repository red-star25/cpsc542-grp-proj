// test/Launch.test.js
import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import Launch, { GET_LAUNCH_DETAILS } from "../final/client/src/pages/launch"; // Adjust the import path as necessary
import { Builder, By, until } from 'selenium-webdriver'; // Import Selenium WebDriver

const mocks = [
  {
    request: {
      query: GET_LAUNCH_DETAILS,
      variables: { launchId: "1" },
    },
    result: {
      data: {
        launch: {
          mission: {
            name: "Test Mission",
            missionPatch: "test-patch-url",
          },
          site: "Test Site",
          rocket: {
            type: "Test Rocket",
          },
        },
      },
    },
  },
];

test("renders launch details", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Launch />
    </MockedProvider>
  );

  // Check if the mission name is rendered
  const missionName = await screen.findByText(/Test Mission/i);
  expect(missionName).toBeInTheDocument();

  // Check if the site is rendered
  const site = await screen.findByText(/Test Site/i);
  expect(site).toBeInTheDocument();
});

// Add a new test for Selenium
test("selenium test for launch page", async () => {
  const driver = await new Builder().forBrowser('chrome').build(); // Initialize the WebDriver
  try {
    await driver.get('http://localhost:3000/launch'); // Adjust the URL as necessary
    const missionName = await driver.wait(until.elementLocated(By.xpath("//*[contains(text(), 'Test Mission')]")), 10000);
    expect(await missionName.isDisplayed()).toBe(true); // Check if the mission name is displayed
  } finally {
    await driver.quit(); // Ensure the driver quits after the test
  }
});
