const db = require("../models");

module.exports = function(app) {
  //get all the advertisements
  app.get("/api/advertisements", (req, res) => {
    db.Advertisement.findAll({}).then(ads => {
      console.log(ads);
      res.json(ads);
    });
  });
};
