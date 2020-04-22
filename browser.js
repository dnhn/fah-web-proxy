const webdriver = require('selenium-webdriver');
require('chromedriver');

const driver = new webdriver.Builder()
  .forBrowser('chrome')
  .setChromeOptions({ args: ['--headless'] })
  .build();

module.exports = {
  elements: {
    btnPause: driver.findElement(webdriver.By.className('button red stop')),
    btnRun: driver.findElement(webdriver.By.id('btn-run')),
    btnStop: driver.findElement(webdriver.By.id('btn-stop')),
    keepAlive: driver.findElement(webdriver.By.id('slots')),
  },
  open: () => {
    driver.get('http://127.0.0.1:4444');
    driver.manage().window().minimize();
  },
};
