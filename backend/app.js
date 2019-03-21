const path = require('path');
const connectDb = require('./core/mongooseInit');
const startServer = () => {
  const server = require('./server');
  const setRoutes = require('./core/router');
  setRoutes(path.join(__dirname, 'controllers'), path.join(__dirname, 'models'));
  server.all('*', server.err404);
}

connectDb()
  .on('error', console.log)
  .on('disconnected', connectDb)
  .once('open', startServer);