/**
 * Creates a mongodb connection.
 * @param  {Express} server
 */
module.exports = function (server) {
  var mongoose, db;

  mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/tumblrbitch');
  console.log('connecting to database...');

  db = mongoose.connection;
  db.on('error', function (error) {
    console.error('db connection error:', error);
    process.exit();
  });
  db.once('open', function () {
    console.log('db connection established');
  });

  if (server) server.set('db', db);
  return db;
};


/* schema

  user: {
    streams: [
      {
        name: 'Mens Fashion',
        blogs: [
          'yourstyle-men',
          'his-vogue-style',
          'styleguy',
          'fuckyeahfashionguys',
        ]
      }
    ]
  }
 */
