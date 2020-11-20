const db = require("../models");

module.exports = function(app) {
  //get all the advertisements including the business related to
  app.get("/api/advertisements", (req, res) => {
    // db.Advertisement.findAll({ include: [db.Business] }).then(ads => {
    //   console.log(ads);
    //   res.json(ads);
    // });
    db.Advertisement.findAll().then(ads => {
      console.log(ads);
      res.json(ads);
    });
  });
  //post the add
  app.post("/api/advertisements", (req, res) => {
    console.log(req.body);
    db.Advertisement.create({
      prodName: req.body.prodName,
      description: req.body.prodDesc,
      marketPrice: req.body.marketPrice,
      offeredPrice: req.body.offeredPrice,
      prodImg: req.body.prodImg
    })
      .then(ads => {
        console.log(ads);
        res.json(ads);
      })
      .catch(err => {
        res.json(err);
      });
  });
};
