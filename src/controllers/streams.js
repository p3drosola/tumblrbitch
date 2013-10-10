var _ = require('underscore');

module.exports = function (server) {

  var db = server.get('db'),
      tumblr = server.get('tumblr');

  return {
    index: function (req, res) {
      res.render('stream/index.jade', {
        title: 'Stream',
        categories: db.categories,
        blogs: db.blogs
      });
    },
    show: function (req, res) {
      var category = db.categories[req.params.id],
          category_blogs = _.findWhere(db.blogs, {category_id: category.id});

      _.each(category_blogs, function () {
        // TODO: fetch blog posts
      });

      if (category) {
        res.render('stream/item.jade', {
          title: 'Stream',
          categories: db.categories,
          category: category
        });
      } else {
        res.end('404');
      }
    }
  };
};
