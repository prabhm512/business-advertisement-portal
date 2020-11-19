const db = require("../models");

module.exports = function(app) {
  //get all the advertisements includigng the business related to
  app.get("/api/advertisements", (req, res) => {
    db.Advertisement.findAll({ include: [db.Business] }).then(ads => {
      console.log(ads);
      res.json(ads);
    });
  });
  //post the add
  app.post("/api/advertisements", (req, res) => {
    db.Advertisement.create({
      prodName: req.body.name,
      prodImg: req.body.image,
      marketPrice: req.body.marketPrice,
      offeredPrice: req.body.offeredPrice,
      description: req.body.description
    })
      .then(ads => {
        res.json(ads);
      })
      .catch(err => {
        res.json(err);
      });
  });
};
