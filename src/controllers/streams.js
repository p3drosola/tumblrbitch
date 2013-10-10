var _ = require('underscore'),
    async = require('async');


module.exports = function (server) {

  var db = server.get('db'),
      tumblr = server.get('tumblr');

  return {
    index: function (req, res) {
      res.render('stream/index', {
        title: 'Stream',
        categories: db.categories,
        blogs: db.blogs
      });
    },
    show: function (req, res) {
      var category = db.categories[req.params.id],
          blogs = _.where(db.blogs, {category_id: category.id});

      async.map(_.pluck(blogs, 'name'), tumblr.posts.bind(tumblr), function (err, data) {
        if (err) return console.error(err);

        var posts = _.flatten(_.pluck(data, 'posts'));
        console.log('got', posts.length, 'posts');

        if (category) {
          res.render('stream/show', {
            title: 'Stream',
            categories: db.categories,
            category: category,
            posts: posts
          });
        } else {
          res.end('404');
        }
      });
    }
  };
};
