module.exports = function (server) {
  var helpers = require('./controllers/helpers.js')(server),
      streams = require('./controllers/streams.js')(server);


  server.use(helpers.getUser);

  server.get('/',           streams.index);
  server.get('/stream/:id', streams.show);
};
