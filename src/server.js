module.exports.createServer = function () {
  'use strict';

  var server, express, path, fs;

  express = require('express');
  path = require('path');
  fs = require('fs');

  // configure server
  server = express();

  server.use(express.static(path.resolve(__dirname, '../assets')));
  server.use(express.logger());

  server.engine('jade', require('jade').__express);

  server.set('view engine', 'jade');
  server.set('views', __dirname + '/views');

  // initializers
  function loadInitializer(name) {
    console.log('loading initializer:', name);
    require(__dirname + '/initializers/' + name)(server);
  }


  fs.readdirSync(__dirname + '/initializers').forEach(loadInitializer);

  // load route handlers
  require('./routes.js')(server);

  return server;
};
