
var tumblr = require('tumblr.js'),
path = require('path'),
consumer_key = process.env.CONSUMER_KEY,
consumer_secret = process.env.CONSUMER_SECRET;


if (!consumer_key || !consumer_secret) {
  throw new Error('Missing tumblr config ENV variables. Check the readme.');
}

module.exports = function (server) {
  return function (req, res, next) {
    var config = {
      consumer_key: consumer_key,
      consumer_secret: consumer_secret,
      token: req.user.tumblr_token,
      token_secret: req.user.tumblr_token_secret
    };
    req.tumblr =  tumblr.createClient(config);
    next();
  };
};
