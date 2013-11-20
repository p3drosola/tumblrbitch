if (process.env.NODE_ENV === 'productiion') {
  console.log('Connecting to newrelic');
  require('newrelic');
}

var port = process.env.PORT || 3000,
server = require('./src/server').createServer();
server.listen(port);

console.log('\n>> Startup completed!');
console.log('Listening on port', port);
