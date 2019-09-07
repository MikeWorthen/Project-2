var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

// Telling passport we want to use a Local Strategy.
passport.use(new LocalStrategy(
  // Sign in using an email
  {
    usernameField: "email"
  },
  function(email, password, done) {
    // When trying sign in this code runs
    db.User.findOne({
      where: {
        email: email
      }
    }).then(function(dbUser) {
      // If no user found
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect email."
        });
      }
      // user found/ incorrect password
      else if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      // If no user found
      return done(null, dbUser);
    });
  }
));

// Needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
