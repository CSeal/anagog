const mongoose = require('mongoose');
const bluebird = require('bluebird');

module.exports = () =>{
  mongoose.Promise = bluebird;
  mongoose.set('debug', true);

  const options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    dbName: 'anagog',
    user: 'root',
    pass: 'root',
  }
  mongoose.connect('mongodb://localhost/', options)
  return mongoose.connection;
}