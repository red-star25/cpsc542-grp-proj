// example.test.js
const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Simple Selenium Test', function() {
    let driver;

    before(async function() {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function() {
        await driver.quit();
    });

    it('should open the webpage and check the title', async function() {
        await driver.get('http://example.com');
        const title = await driver.getTitle();
        assert.strictEqual(title, 'Example Domain');
    });
});

