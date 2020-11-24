// const path = require("path");
const db = require("../models");
const isAuthenticated = require("../config/middleware/auth");
// html routes
module.exports = function(app) {
  app.get("/", (req, res) => {
    db.Advertisement.findAll({
      include: [db.Business],
      where: {
        active: true
      }
    }).then(data => {
      const approvedAds = {
        approved: data
      };
      res.render("index", approvedAds);
    });
    // res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  app.get("/advertise", (req, res) => {
    res.render("advertise");
    // res.sendFile(path.join(__dirname, "../public/advertise.html"));
  });

  app.get("/contactus", (req, res) => {
    res.render("contactus");
    // res.sendFile(path.join(__dirname, "../public/advertise.html"));
  });

  //signup route, created for now but it can be deleted in the future when all admins are etup, if sign up is successful rediret to login otherwise stay in the page
  app.get("/signup", (req, res) => {
    if (req.user) {
      res.redirect("login");
    }
    res.render("signup");
  });
  //login route, it check the passowrd and login and redirect to the admin page, otherwise stay on the login.
  app.get("/login", (req, res) => {
    if (req.user) {
      res.redirect("admin");
    }
    res.render("login");
  });

  //admin route protected by authentication, checks if the admin is logged to be render all admin info
  app.get("/admin", isAuthenticated, (req, res) => {
    db.Advertisement.findAll({ include: [db.Business] }).then(data => {
      const adsInDb = {
        ads: data
      };
      res.render("admin", adsInDb);
    });
  });

  app.get("/product/:id", (req, res) => {
    db.Advertisement.findAll({
      include: [db.Business],
      where: {
        id: req.params.id
      }
    }).then(data => {
      const adsInDb = {
        ads: data
      };
      res.render("preview", adsInDb);
    });
  });

  app.get("/about", (req, res) => {
    res.render("about");
  });

  app.get("/contact", (req, res) => {
    res.render("contact");
  });
};
