module.exports = function (server) {
  return function (req, res, next) {
    req.tumblr.following(function (err, data) {
      if (err) throw err;
      req.tumblr_following = data.blogs;
      next();
    });
  };
};