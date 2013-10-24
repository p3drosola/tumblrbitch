var port = 3000;
var server = require('./src/server').createServer();
server.listen(port);

console.log('\n>> Startup completed!')
console.log('Listening on port', port);
