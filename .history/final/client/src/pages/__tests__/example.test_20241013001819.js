// tests/example.test.js
const { Builder, until } = require('selenium-webdriver');

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:3000'); // Change to your app's URL
        await driver.wait(until.titleIs('Your App Title'), 1000); // Change to your app's title
        // Add more interactions and assertions here
    } finally {
        await driver.quit();
    }
})();

