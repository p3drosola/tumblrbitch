var port = process.env.PORT || 5000,
server = require('./src/server').createServer();
server.listen(port);

console.log('\n>> Startup completed!')
console.log('Listening on port', port);
