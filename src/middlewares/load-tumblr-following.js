module.exports = function (server) {

  return function (req, res, next) {

    var blogs = [];

    function load (offset) {
      req.tumblr.following({limit: 20, offset: offset}, function (err, data) {
        if (err) throw err;

        blogs = blogs.concat(data.blogs);
        if (data.total_blogs > blogs.length) {
          load(blogs.length);
        } else {
          req.tumblr_following = blogs;
          next();
        }
      });
    }
    load(0);
  };
};
