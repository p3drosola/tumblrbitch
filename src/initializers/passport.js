var passport = require('passport'),
TumblrStrategy = require('passport-tumblr').Strategy;

module.exports = function (server) {

  passport.use(new TumblrStrategy({
      consumerKey: "D14SuZBxeWABmgPQgUVnnhCYYmt2ve0SI8zhPG24r8zylArf9k",
      consumerSecret: "qSJ6Gr7OxVY42s4m3ljhTyEZor4stK2p4OSwKMPupQ5x3C8n3U",
      callbackURL: "http://localhost:3000/auth/callback"
    },
    function (token, tokenSecret, profile, done) {
      console.log('auth callback');
      console.log(token, tokenSecret, profile);
      done(null, profile);
      // User.findOrCreate({ tumblrId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
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
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });

  server.use(passport.initialize());
  server.use(passport.session());

  server.get('/auth', passport.authenticate('tumblr'));
  server.get('/auth/callback', passport.authenticate('tumblr', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));
};
