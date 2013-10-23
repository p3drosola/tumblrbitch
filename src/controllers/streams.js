var _ = require('underscore'),
async = require('async');

module.exports = function (server) {

  var loadStream = require('../middleware/load-stream.js')(server);

  return {
    index: function (req, res) {
      res.render('stream/index', {
        title: 'Stream',
        user: req.user
      });
    },
    show: function (req, res) {
      loadStream(req, res, function () {

        console.log('got the stream', req.stream);

        res.render('stream/show', {
          title: 'Stream',
          user: req.user,
          stream: req.stream
        });
      });
    }
  };
};
