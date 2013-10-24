var config = {
  host: 'localhost',
  db: 'tumblrbitch'
},
MongoClient = require('mongodb').MongoClient,
_ = require('underscore');


/**
 * Creates a mongodb connection.
 * @param  {Express|Function} callback
 */
module.exports = function (server, callback) {
  function onConnection(err, db) {
    if (err) throw err;
    console.log('Connected to db!');

    if (_.isFunction(callback)) {
      callback(db);
    }
    if (server) {
      server.set('db', db);
    }
  }

  console.log('Connecting to database...');
  MongoClient.connect('mongodb://' + config.host + '/' + config.db, onConnection);
  return 'OK!';
};
