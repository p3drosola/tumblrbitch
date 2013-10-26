var MongoClient = require('mongodb').MongoClient,
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

  var db_url = process.env.MONGOLAB_URI ||
    'mongodb://localhost/tumblrbitch';

  console.log('Connecting to database: ', db_url);
  MongoClient.connect(db_url, onConnection);
  return 'OK!';
};
