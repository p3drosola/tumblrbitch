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
module.exports = function (callback) {
  function onConnection(err, db) {
    if (err) throw err;
    console.log('connected to db!');

    if (_.isFunction(callback)) {
      callback(db);
    } else if (_.isObject(callback)) {
      callback.set('db', db);
    }
  }

  console.log('connecting to database...');
  MongoClient.connect('mongodb://' + config.host + '/' + config.db, onConnection);
};
