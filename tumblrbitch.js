var port = 3000;
var server = require('./src/server').createServer();
server.listen(port);
console.log('listening on port', port);
