const app = require('express')();
const proxy = require('express-http-proxy');

const HOST = 'http://127.0.0.1';
const PORT = 4444;
const FAH = `${HOST}:7396`;

app.use(proxy(FAH, {
  userResDecorator: (_, proxyData, userReq) => {
    if (userReq.path === '/api/updates' && proxyData) {
      console.log(JSON.parse(proxyData.toString('utf-8'))[0]);
    }
    return new Promise(resolve => resolve(proxyData));
  }
}));
app.listen(PORT, () => console.log(`Proxy is running at ${HOST}:${PORT}\n`));

require('./browse');

module.exports = app;
