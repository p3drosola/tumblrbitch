module.exports = function (server) {
  var controller = {};


  /*
   * Presents the index page
   */
  controller.index = ['loadUser', function (req, res) {
    res.render('stream/index', {
      title: 'Yo!',
      user: req.user
    });
  }];
  
  /*
   * Loads & displays the specified stream
   */
  controller.show = ['loadUser', 'loadTumblr', 'loadStream', function (req, res) {
    res.render('stream/show', {
      title: 'Stream',
      user: req.user,
      stream: req.stream
    });

  }];

  return controller;
};
