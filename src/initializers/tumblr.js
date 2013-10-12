module.exports = function (server) {
  var path = require('path'), tumblr, config;
  require('js-yaml');

  // load the yml file
  try {
    config = require(path.resolve(__dirname, '../../config.yml'));
  } catch (e) {
    console.error('Missing config.yml check the README');
  }

  tumblr = new require('tumblr.js').Client(config);
  server.set('tumblr', tumblr);
};
