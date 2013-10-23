module.exports = function (server) {
  var streams = require('./controllers/streams.js')(server),
      loadUser = require('./middleware/load-user.js')(server);

  server.use(loadUser);

  server.get('/',           streams.index);
  server.get('/stream/:id', streams.show);
};
