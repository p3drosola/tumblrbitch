var _ = require('underscore'),
_s = require('underscore.string');

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
    var categorized_blogs = _.flatten(_.pluck(req.user.streams, 'blogs')),
    uncategorized_blogs = _.difference(_.pluck(req.tumblr_following, 'name'), categorized_blogs);

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

  controller.update = ['ensureLogin', function (req, res) {
    var streams = JSON.parse(req.body.streams);
    _.each(streams, function (stream) {
      stream.slug = _s.dasherize(stream.name);
    });
    console.log('setting streams', streams);
    req.flash('info', 'Saved streams!');
    server.get('db').collection('users').update({username: req.user.username}, { $set: {
      streams: streams
    }}, function (err) {
      if (err) throw err;
      res.redirect('/organize');
    });
  }];

  return controller;
};
