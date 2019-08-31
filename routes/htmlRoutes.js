var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("index", {
      title: "Bitmap - Home",
      msg: "Welcome To Bitmap!",
    });
  });

  app.get("/create", function (req, res) {
    res.render("createAccount", {
      title: "Bitmap - Create Account",
      msg: "Welcome!",
    });
  });

  app.get("/profile/username:", function (req, res) {
    db.Bitmaps.findOne({
      where: {
        user: 1
      }
    }).then(function (dbProject2) {
      res.render("profile", {
        title: "Bitmap - My Profile",
        msg: "Welcome!",
        user: dbProject2
      });
    });
  });

  //   res.render("example", {
  //     example: dbProject2
  //   });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
}
