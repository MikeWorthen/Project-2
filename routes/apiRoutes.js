var db = require("../models");

module.exports = function(app) {
  // Get all users
  app.get("/api/:users?", function(req, res) {
    if (req.params.users) {
      // Display the JSON for ONLY that user.
      // Displays user where username = req.params.user
      db.Bitmaps.findOne({
        where: {
          username: req.params.users
        }
      }).then(function(result) {
        return res.json(result);
      });
    } else {
      db.Bitmaps.findAll().then(function(result) {
        return res.json(result);
      });
    }
  });
  
  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};