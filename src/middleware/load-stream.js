var _ = require('underscore'),
async = require('async');


module.exports = function (servear) {
  return function (req, res, next) {
    req.stream = _.findWhere(req.user.streams, {slug: req.params.slug});

    async.map(req.stream.blogs, req.tumblr.posts.bind(req.tumblr),
      function (err, data) {
        if (err) throw err;
        var posts = _.flatten(_.pluck(data, 'posts'));
        posts = _.sortBy(posts, 'timestamp');
       	req.stream.posts = posts;
        next();
      });
  };
};
