const webdriver = require('selenium-webdriver');
require('chromedriver');

const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .setChromeOptions({ args: ['--headless'] })
  .build();

module.exports = driver;
