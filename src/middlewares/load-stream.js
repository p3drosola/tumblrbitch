var _ = require('underscore'),
async = require('async');


module.exports = function (servear) {
  return function (req, res, next) {
    req.stream = _.findWhere(req.user.streams, {slug: req.params.slug});

    async.map(req.stream.blogs,
      function (name, callback) {
        req.tumblr.posts(name, function (err, data) {
          callback(undefined, data);
        });
      },
      function (err, data) {
        data = _.compact(data);
        data = _.pluck(data, 'posts');
        data = _.flatten(data);
        data = _.sortBy(data, function (post) {
          return - Number(post.timestamp);
        });
        req.stream.posts = data;
        next();
      }
    );

  };
};
