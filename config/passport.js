var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

passport.use(
  new LocalStrategy(
    {
      email: "email"
      // username: "username"
    },
    function(user, password, done) {
      // When a user tries to sign in this code runs
      db.User.findOne({
        where: {
          user: email
        }
      }).then(function(dbUser) {
        console.log(dbUser);
        // If there's no user with the given email
        if (!dbUser) {
          return done(null, false, {
            message: "Incorrect email."
          });
        }
        // If there is a user with the given email, but the password the user gives us is incorrect
        else if (!dbUser.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password."
          });
        }
        // If none of the above, return the user
        return done(null, dbUser);
      });
    }
  )
);

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
