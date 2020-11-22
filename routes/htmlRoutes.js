// const path = require("path");
const db = require("../models");

// html routes
module.exports = function (app) {
  app.get("/", (req, res) => {
    db.Advertisement.findAll({ include: [db.Business] }).then(data => {
      const adsInDb = {
        ads: data
      };
      res.render("index", adsInDb);
    });
  });
  app.get("/advertise", (req, res) => {
    res.render("advertise");
    // res.sendFile(path.join(__dirname, "../public/advertise.html"));
  });
  app.get("/admin", (req, res) => {
    db.Advertisement.findAll({ include: [db.Business] }).then(data => {
      const adsInDb = {
        ads: data
      };
      res.render("admin", adsInDb);
    });
  });
  app.get("/test", (req, res) => {
    db.Advertisement.findAll({ include: [db.Business] }).then(data => {
      const adsInDb = {
        ads: data
      };
      res.render("test", adsInDb);
    });
  });
};
