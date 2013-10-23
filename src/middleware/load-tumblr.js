require('js-yaml');

var tumblr = require('tumblr.js'),
path = require('path'),
server_tokens;

try {
  server_tokens = require(path.resolve(__dirname, '../../config.yml'));
} catch (e) {
  console.error('Missing config.yml check the README');
}

module.exports = function (server) {
  return function (req, res, next) {
    var config = {
      consumer_key: server_tokens.consumer_key,
      consumer_secret: server_tokens.consumer_secret,
      token: req.user.tumblr_token,
      token_secret: req.user.tumblr_token_secret
    };
    req.tumblr =  tumblr.createClient(config);
    next();
  };
};
