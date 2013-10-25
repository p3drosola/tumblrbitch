module.exports = function (server) {
  var controller = {};


  controller.index = ['ensureLogin', 'tumblr', 'loadTumblrUser', function (req, res) {
    var first_stream = req.user.streams[0];
    if (first_stream) {
      res.redirect('/streams/' + first_stream.slug);
    } else {
      res.redirect('/organize');
    }
  }];

  /*
   * Presents the index page
   */
  controller.organize = ['ensureLogin', 'tumblr', 'loadTumblrFollowing', function (req, res) {
    var uncategorized_blogs;
    res.render('stream/organize', {
      title: 'Yo!',
      user: req.user,
      tumblr_following: req.tumblr_following,
      uncategorized_blogs: uncategorized_blogs
    });
  }];

  /*
   * Loads & displays the specified stream
   */
  controller.show = ['ensureLogin', 'tumblr', 'loadStream', function (req, res) {
    res.render('stream/show', {
      title: 'Stream',
      user: req.user,
      stream: req.stream
    });
  }];

  return controller;
};
