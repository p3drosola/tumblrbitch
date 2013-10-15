var User = require('../models/user.js');

module.exports = function (server) {
  var db = server.get('db');
  return {
    /**
     * Sets the req.user property
     */
    getUser: function (req, res, next) {
      User.findOne({id: 1}, function (err, user) {
        if (err) {
          console.error(user);
          res.end();
        } else {
          req.user = user;
          next();
        }
      });
    }
  };
};
