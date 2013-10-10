module.exports.createServer = function () {
  'use strict';

  var _, db, server, config, express, tumblr, client, path;

  db = {
    blogs: [],
    categories: {
      1: {id: 1, name: 'Mens Fashion'},
      2: {id: 2, name: 'Illustration'},
      3: {id: 3, name: 'Writing'},
      4: {id: 4, name: 'Inspiration'},
      5: {id: 5, name: 'GIFs'}
    }
  };

  express = require('express');
  tumblr = require('tumblr.js');
  path = require('path');
  _ = require('underscore');
  require('js-yaml');

  // load the yml file
  try {
    config = require('../config.yml');
  } catch (e) {
    console.error('Missing config.yml check the README');
  }

  client = new tumblr.Client(config);

  // fetch list of blogs user follows
  client.following(function (err, data) {
    if (err) return console.log(err);
    console.log(data.blogs);
    db.blogs = data.blogs;

    _.findWhere(db.blogs, {name: 'jesselucas'}).category_id = 2;
    _.findWhere(db.blogs, {name: 'mariocaropreso'}).category_id = 3;

    _.findWhere(db.blogs, {name: 'yourstyle-men'}).category_id = 1;
    _.findWhere(db.blogs, {name: 'his-vogue-style'}).category_id = 1;
    _.findWhere(db.blogs, {name: 'styleguy'}).category_id = 1;
    _.findWhere(db.blogs, {name: 'fuckyeahfashionguys'}).category_id = 1;
  });

  // configure server
  server = express();

  server.use(express.static(path.resolve(__dirname, '../assets')));
  server.use(express.logger());

  server.engine('jade', require('jade').__express);

  server.set('view engine', 'jade')
  server.set('views', __dirname + '/views');
  server.set('db', db);
  server.set('tumblr', client);

  require('./routes.js')(server);

  return server;
};
