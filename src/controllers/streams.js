var _ = require('underscore');

function loadStream(req, res, callback) {
    // req.category = category;
    callback();
}

module.exports = function (server) {

  var _ = require('underscore'),
    async = require('async'),
    User = require('../models/user.js');

  return {
    index: function (req, res) {
      res.render('stream/index', {
        title: 'Stream',
        categories: req.user.categories
      });
    },
    show: function (req, res) {

      loadStream(req, res, function () {

        console.log(req.user);

        // res.render('stream/show', {
        //   title: 'Stream',
        //   categories: req.categories,
        //   category: req.categories,
        //   posts: posts
        // });
      });

      // var category = db.categories[req.params.id],
      //     blogs = _.where(db.blogs, {category_id: category.id});

      // async.map(_.pluck(blogs, 'name'), tumblr.posts.bind(tumblr), function (err, data) {
      //   if (err) return console.error(err);

      //   var posts = _.flatten(_.pluck(data, 'posts'));
      //   console.log('got', posts.length, 'posts');

      //   if (category) {

      //   } else {
      //     res.end('404');
      //   }
      // });
    }
  };
};
