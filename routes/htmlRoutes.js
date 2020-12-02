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
    }).then(adsData => {
      const adsInDb = {
        approved: adsData
      };
      res.render("index", adsInDb);
      // res.sendFile(path.join(__dirname, "../public/index.html"));
    });
  });

  // get ads by category
  app.get("/category/:category", (req, res) => {
    db.Advertisement.findAll({
      include: [db.Business],
      where: {
        active: true
      }
    }).then(ads => {
      const filteredRes = ads.filter(
        ad => ad.Business.bussCategory === req.params.category
      );
      const adsByCat = {
        adCat: filteredRes
      };
      res.render("category", adsByCat);
    });
  });

  app.get("/advertise", (req, res) => {
    res.render("advertise");
    // res.sendFile(path.join(__dirname, "../public/advertise.html"));
  });

  app.get("/contact", (req, res) => {
    res.render("contactus");
    // res.sendFile(path.join(__dirname, "../public/advertise.html"));
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
    }).then(adsData => {
      const adsInDb = {
        ads: adsData
      };
      res.render("preview", adsInDb);
    });
  });

  app.get("/about", (req, res) => {
    res.render("about");
  });

  // app.get("/advertise", homeController.getHome);
};
