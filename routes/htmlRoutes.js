var db = require("../models");
const Sequalize = require("sequelize");
const Op = Sequalize.Op;

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

  app.get("/profile/:user?", function(req, res) {
    db.Bitmaps.findOne({
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

  app.get("/profile/:search?", (req, res) => {
    let { user } = req.query;

    db.Bitmaps.findOne({
      where: { username: { [op.like]: '%'+ user + '%' } }})
      .then(function(dbProject2) {
      res.render("profile", {
        title: "Bitmap - My Profile",
        msg: "Welcome!",
        user: dbProject2
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
