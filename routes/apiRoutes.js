const db = require("../models");
// eslint-disable-next-line no-unused-vars
const uploadController = require("../controllers/upload");
// eslint-disable-next-line no-unused-vars
const upload = require("../config/middleware/upload");

// eslint-disable-next-line prefer-const
let passport = require("../config/passport");

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

  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json(req.user);
  });

  app.post("/api/signup", (req, res) => {
    db.Admin.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
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
        // console.log(bus);
        res.json(bus);
      })
      .catch(err => res.json(err));
  });

  // Post route for image upload
  // app.post("/api/images", upload.single("file"), uploadController.uploadFiles);

  //post the add
  app.post("/api/advertisements", async (req, res) => {
    let businessID;
    // Get the record in the db where business name is the name passed in by the user
    await db.Business.findOne({
      attributes: ["id"],
      where: {
        bussEmail: req.body.bussEmail
      }
    })
      .then(result => {
        businessID = result.dataValues.id;
        // console.log(upload.storage.filename.uniqueFileName);
      })
      .catch(err => res.json(err));

    // Create a record in the advertisements table
    setTimeout(async () => {
      console.log(req.body);
      // Get the name of the last image in the table
      const imgID = parseInt(await db.Image.max("id"));
      // Store the name of the image with the returned ID
      let nameLastImg;

      await db.Image.findOne({
        attributes: ["name"],
        where: {
          id: imgID
        }
      })
        .then(result => {
          nameLastImg = result.dataValues.name;
        })
        .catch(err => res.json(err));

      db.Advertisement.create({
        prodName: req.body.prodName,
        description: req.body.prodDesc,
        originalPrice: req.body.originalPrice,
        webLink: req.body.webLink,
        discount: req.body.discount,
        discountedPrice: parseFloat(
          ((100 - req.body.discount) / 100) * req.body.originalPrice
        ),
        // prodImg: req.body.prodImg,
        active: false,
        archive: false,
        imgName: req.body.imgSingleFileUploadURL,
        BusinessId: businessID
      })
        .then(ads => {
          // console.log(discountedPrice);
          // console.log(ads);
          return res.json(ads);
        })
        .catch(err => res.json(err));
    }, 1000);
  });

  // Delete the advertisement from the table
  app.delete("/api/advertisements/:id", (req, res) => {
    db.Advertisement.destroy({
      where: {
        id: req.params.id
      }
    }).then(ads => res.json(ads));
  });

  // Update the active field in the advertisement table if it is approved
  app.put("/api/advertisements/:id", (req, res) => {
    db.Advertisement.update(
      { active: req.body.active },
      {
        where: {
          id: req.params.id
        }
      }
    ).then(ads => res.json(ads));
  });

  // Update the archive field in teh advertisement table
  app.put("/api/archives/:id", (req, res) => {
    db.Advertisement.update(
      { archive: req.body.archive, active: req.body.active },
      {
        where: {
          id: req.params.id
        }
      }
    ).then(ads => res.json(ads));
  });
};
