const db = require("../models");

module.exports = function(app) {
  // get all businesses
  app.get("/api/businesses", (req, res) => {
    db.Business.findAll().then(bus => {
      res.json(bus);
    });
  });

  //get all the advertisements including the business related to
  app.get("/api/advertisements", (req, res) => {
    db.Advertisement.findAll({ include: [db.Business] }).then(ads => {
      // console.log(ads);
      res.json(ads);
    });
  });

  // post the bussiness
  app.post("/api/businesses", (req, res) => {
    db.Business.create({
      bussName: req.body.bussName,
      bussCategory: req.body.bussCategory,
      bussEmail: req.body.bussEmail
    })
      .then(bus => {
        console.log(bus);
        res.json(bus);
      })
      .catch(err => res.json(err));
  });

  //post the add
  app.post("/api/advertisements", async (req, res) => {
    let businessID;
    // Get the record in the db where business name is the name passed in by the user
    await db.Business.findOne({
      attributes: ["id"],
      where: {
        bussEmail: req.body.bussEmail
      }
    }).then(result => {
      businessID = result.dataValues.id;
    });

    // Create a record in the advertisements table
    db.Advertisement.create({
      prodName: req.body.prodName,
      description: req.body.prodDesc,
      originalPrice: req.body.originalPrice,
      discount: req.body.discount,
      discountedPrice: parseFloat(
        ((100 - req.body.discount) / 100) * req.body.originalPrice
      ),
      prodImg: req.body.prodImg,
      BusinessId: businessID
    })
      .then(ads => {
        console.log(discountedPrice);
        // console.log(ads);
        res.json(ads);
      })
      .catch(err => res.json(err));
  });
};
