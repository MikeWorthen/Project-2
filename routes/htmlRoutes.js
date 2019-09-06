var db = require("../models");
const Sequalize = require("sequelize");
var path = require("path");
const Op = Sequalize.Op;

var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/profile");
    }
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

  app.get("/Myprofile/:user?", function(req, res) {
    db.Bitmaps2.findOne({
      where: {
        username: req.params.user
      }
    }).then(function(dbProject2) {
      res.render("profile", {
        title: "Bitmap - My Profile",
        msg: "Welcome!",
        user: dbProject2
      });
    });
  });

  app.get("/search", function(req, res) {
    res.render("searchProfile", {
      title: "Bitmap - Search",
      msg: "Welcome To Bitmap!"
    });
  });

  app.get("/profile/:search?", (req, res) => {
    let { user } = req.query;
    console.log(user);

    db.Bitmaps2.findOne({
      where: { username: { [Op.like]: "%" + user + "%" } }
    }).then(function(dbProject2) {
      res.render("profile", {
        title: "Bitmap -" + user + " Profile",
        user: dbProject2
      });
    });
  });


  app.get("/login", function(req, res) {
    res.render("login");
    if (req.user) {
      res.redirect("/members");
    }
  });

    // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "memmbers"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
