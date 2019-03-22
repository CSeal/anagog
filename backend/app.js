const path = require('path');
const connectDb = require(path.join(__dirname, 'core', 'mongooseInit.js'));
const startServer = () => {
  const strategy = require(path.join(__dirname, 'core', 'passportAuthStrategy.js'));
  const passport = strategy(__dirname);
  const server = require(path.join(__dirname, 'server.js'));
  server.use(passport.initialize());

  const setRoutes = require(path.join(__dirname, 'core', 'router.js'));
  setRoutes(path.join(__dirname, 'controllers'), path.join(__dirname, 'models'));

  server.all('*', server.err404);
}

connectDb()
  .on('error', console.log)
  .on('disconnected', connectDb)
  .once('open', startServer);