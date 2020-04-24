const app = require('express')();
const proxy = require('express-http-proxy');
const browser = require('./browser');

const HOST = 'http://127.0.0.1';
const PORT = 4444;
const FAH = `${HOST}:7396`;

let workData = {};

const minuteValue = att =>
  att.indexOf('min') !== -1 ?
    att.slice(0, att.indexOf('min')).trim() :
    0;

// Proxy server
app.use(proxy(FAH, {
  userResDecorator: (_, proxyData, userReq) => {
    if (userReq.path === '/api/updates' && proxyData) {
      const data = JSON.parse(proxyData.toString('utf-8'))[0];
      if (data[0] === '/api/slots') workData = data[1][0];
    }
    return new Promise(resolve => resolve(proxyData));
  }
}));
app.listen(PORT, _ => console.log(`Proxy is running at ${HOST}:${PORT}\n`));

browser.open();

// Periodically inspect work data
setInterval(_ => {
  console.log(workData);

  // Simulate actions on web page to prevent it from sleeping
  browser.elements.keepAlive.click();

  // Reduce waiting time to retrieve new work unit
  // When the client is paused then unpaused,
  // the waiting time will reduce significantly.
  if (workData.waitingon === 'WS Assignment' &&
    minuteValue(workData.nextattempt) > 0) {
    browser.elements.btnStop.click();
    setTimeout(_ => browser.elements.btnPause.click(), 2000);
    setTimeout(_ => browser.elements.btnRun.click(), 10000);
  }
}, 120000);
