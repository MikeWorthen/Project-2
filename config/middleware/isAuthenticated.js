module.exports = function(req, res, next) {
  // If the user is logged in, continue to profile
  if (req.user) {
    return next();
  }
  // redirect to create account
  return res.redirect("/");
};
