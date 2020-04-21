const app = require('express')();
const proxy = require('express-http-proxy');
const webdriver = require('selenium-webdriver');
const browser = require('./browser');

const HOST = 'http://127.0.0.1';
const PORT = 4444;
const FAH = `${HOST}:7396`;

app.use(proxy(FAH, {
  userResDecorator: (_, proxyData, userReq) => {
    if (userReq.path === '/api/updates' && proxyData) {
      const data = JSON.parse(proxyData.toString('utf-8'))[0];
      if (data[0] === '/api/slots') console.log(data[1][0]);
    }
    return new Promise(resolve => resolve(proxyData));
  }
}));
app.listen(PORT, () => console.log(`Proxy is running at ${HOST}:${PORT}\n`));

browser.get(`${HOST}:${PORT}`);
browser.manage().window().minimize();

const keepAlive = browser.findElement(webdriver.By.id('slots'));

setInterval(() => keepAlive.click(), 120000);

module.exports = app;
