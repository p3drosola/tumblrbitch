module.exports = function (server) {
  return function (req, res, next) {
    req.tumblr.userInfo(function (err, data) {
      if (err) throw err;
      req.tumblr_user = data;
      next();
    });
  };
};