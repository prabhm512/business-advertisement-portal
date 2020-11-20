// const path = require("path");
const db = require("../models");

// html routes
module.exports = function(app) {
  app.get("/", (req, res) => {
    res.render("index");
    // res.sendFile(path.join(__dirname, "../public/index.html"));
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
      console.log(data[0].dataValues.Business.dataValues.bussName);
      res.render("admin", adsInDb);
    });
  });
};
