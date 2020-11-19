const db = require("../models");

module.exports = function(app) {
  //get all the advertisements includigng the business related to
  app.get("/api/advertisements", (req, res) => {
    db.Advertisement.findAll({ include: [db.Business] }).then(ads => {
      console.log(ads);
      res.json(ads);
    });
  });
};
