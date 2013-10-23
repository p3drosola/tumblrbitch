module.exports = function (server) {
  var streams = require('./controllers/streams.js')(server),
      loadUser = require('./middleware/load-user.js')(server),
      loadTumblr = require('./middleware/load-tumblr.js')(server);

  server.use(loadUser);
  server.use(loadTumblr);

  server.get('/', streams.index);
  server.get('/stream/:slug', streams.show);
};
