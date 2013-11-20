module.exports.createServer = function () {
  'use strict';

  var server, express, path;

  express = require('express');
  path = require('path');

  // configure server
  server = express();

  server.configure('production', function () {
    console.log('Connecting to newrelic');
    require('newrelic');
  });

  server.use(express.static(path.resolve(__dirname, '../assets')));
  server.use(express.logger());

  server.use(express.cookieParser());
  server.use(express.bodyParser());
  server.use(express.session({
    secret: (process.env.SESSION_SECRET || 'HODOR-HODOR-HODOR')
  }));

  server.engine('jade', require('jade').__express);

  server.set('view engine', 'jade');
  server.set('views', __dirname + '/views');

  require('./startup.js')(server);

  return server;
};
