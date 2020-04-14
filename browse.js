const webdriver = require('selenium-webdriver');
require('chromedriver');

const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .setChromeOptions({ args: ['--headless'] })
  .build();

driver.get('http://127.0.0.1:4444');
driver.manage().window().minimize();

setInterval(() => {
  driver.findElement(webdriver.By.id('slots')).click();
}, 120000);
