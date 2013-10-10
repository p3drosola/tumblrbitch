module.exports = function (server) {
  var streams = require('./controllers/streams.js')(server);

  server.get('/',           streams.index);
  server.get('/stream/:id', streams.show);
};
