/**
 * load's the users's document from the database and sets's it on the request as req.user
 * @param  {Express} server
 * @return {Function}
 */
module.exports = function (server) {
  return function (req, res, next) {
    next();
    // var tumblr_id = 1; //TODO fixme. load from the session

    // server.get('db').collection('users').findOne({
    //   tumblr_id: tumblr_id
    // }, function (err, user) {
    //   if (err) throw err;
    //   req.user = user;
    //   next();
    // });
  };
};
