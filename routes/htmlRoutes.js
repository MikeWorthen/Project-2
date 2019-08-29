var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    
      res.render("index", {
        title: "Bitmap - Home",
        msg: "Welcome To Bitmap!",
      });
  });
  app.get("/create", function(req, res) {
   
      res.render("createAccount", {
        title: "Bitmap - Create Account",
        msg: "Welcome!",
      });
  });
  app.get("/profile", function(req, res) {
    db.Bitmaps.findAll({
      where:{
         id: 1
      }
    }).then(function(dbProject2) {
      res.render("profile", {
        title: "Bitmap - My Profile",
        msg: "Welcome!",
        user: dbProject2
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
