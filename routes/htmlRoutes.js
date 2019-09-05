var db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index", {
      title: "Bitmap - Home",
      msg: "Welcome To Bitmap!"
    });
  });
  app.get("/create", function(req, res) {
    res.render("createAccount", {
      title: "Bitmap - Create Account",
      msg: "Welcome!"
    });
  });
  app.get("/login", isAuthenticated, function(req, res) {
    res.render("login", {
      title: "Bitmap - Home",
      msg: "Welcome To Bitmap!"
    });
  });
  app.get("/profile", function(req, res) {
    db.User.findOne({
      where: {
        user: email
      }
    }).then(function(dbUser) {
      res.render("profile", {
        title: "Bitmap - My Profile",
        msg: "Welcome!",
        user: dbUser
      });
    });
  });

  // app.get("/", function(req, res) {
  //   // If the user already has an account send them to the members page
  //   if (req.user) {
  //     res.redirect("/profile");
  //   }
  //   res.sendFile(path.join(__dirname, "profile.handlebars"));
  // });

  // app.get("/login", function(req, res) {
  //   // If the user already has an account send them to the members page
  //   if (req.user) {
  //     res.redirect("/profile");
  //   }
  //   res.sendFile(path.join(__dirname, "profile.handlebars"));
  // });

  // // Here we've add our isAuthenticated middleware to this route.
  // // If a user who is not logged in tries to access this route they will be redirected to the signup page
  // app.get("/create", isAuthenticated, function(req, res) {
  //   res.sendFile(path.join(__dirname, "create"));
  // });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.User.findOne({ where: { id: req.params.id } }).then(function(
      dbProject2
    ) {
      res.render("login", {
        example: dbProject2
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
