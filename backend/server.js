const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

server.err404 = (req, res, next) => {
  res.status(404)
  res.send({err: 'Not found'});
}

server.set('port', 3001);
server.set('cors', true);

server.use((req, res, next) => {
  if (server.get('cors')) {
    res.setHeader('Access-Control-Allow-Headers', 'content-type, x-requested-with');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT');
    res.setHeader('Access-Control-Max-Age', '86400');
  }
  next();
});

server.use(bodyParser.json());
server.use(cookieParser());

server.listen(server.get('port'), () => {
  console.log(`Server start on port ${server.get('port')}`)
});

module.exports = server;