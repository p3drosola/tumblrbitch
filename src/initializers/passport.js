var passport = require('passport'),
ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn,
TumblrStrategy = require('passport-tumblr').Strategy;

module.exports = function (server) {

  var callbackURL = (process.env.URL || "http://localhost:3000")  + '/auth/callback';

  passport.use(new TumblrStrategy({
      consumerKey: "D14SuZBxeWABmgPQgUVnnhCYYmt2ve0SI8zhPG24r8zylArf9k",
      consumerSecret: "qSJ6Gr7OxVY42s4m3ljhTyEZor4stK2p4OSwKMPupQ5x3C8n3U",
      callbackURL: callbackURL
    },
    function (token, token_secret, profile, done) {
      server.get('db').collection('users').findOne({username: profile.username}, function (err, user) {
        // insert a new user
        if (err || !user) {
          user = {
            username: profile.username,
            tumblr_token: token,
            tumblr_token_secret: token_secret,
            streams: []
          };
          server.get('db').collection('users').insert(user, function () {
            done(null, user);
          });
        } else {
          done(null, user);
        }
      });
    }
  ));

  // Passport session setup.
  //   To support persistent login sessions, Passport needs to be able to
  //   serialize users into and deserialize users out of the session.  Typically,
  //   this will be as simple as storing the user ID when serializing, and finding
  //   the user by ID when deserializing.  However, since this example does not
  //   have a database of user records, the complete Tumblr profile is serialized
  //   and deserialized.
  passport.serializeUser(function (user, done) {
    console.log(">>> Serializing", user);
    done(null, user.username);
  });

  passport.deserializeUser(function (username, done) {
    console.log('>>> Deserializing', username);
    server.get('db').collection('users').findOne({username: username}, done);
  });

  server.use(passport.initialize());
  server.use(passport.session());


  server.get('/auth', passport.authenticate('tumblr'));
  server.get('/auth/callback', passport.authenticate('tumblr', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));
};
