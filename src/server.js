module.exports.createServer = function () {
  'use strict';

  var server, express, path;

  express = require('express');
  path = require('path');

  // configure server
  server = express();

  server.use(express.static(path.resolve(__dirname, '../assets')));
  server.use(express.logger());

  server.engine('jade', require('jade').__express);

  server.set('view engine', 'jade');
  server.set('views', __dirname + '/views');

  require('./startup.js')(server);

  return server;
};
