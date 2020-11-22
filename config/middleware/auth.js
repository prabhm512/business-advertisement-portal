module.exports = (req, res, next) => {
  // If the admin is logged in, continue with the request to the restricted route
  if (req.user) {
    return next();
  }
  // If the admin isn't logged in, redirect them to the login page
  return res.redirect("/login");
};
