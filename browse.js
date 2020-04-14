const webdriver = require('selenium-webdriver');
require('chromedriver');

const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .setChromeOptions({ args: ['--headless'] })
  .build();

driver.get('http://127.0.0.1:4444');
driver.manage().window().minimize();

const keepAlive = driver.findElement(webdriver.By.id('slots'));

setInterval(() => keepAlive.click(), 120000);
