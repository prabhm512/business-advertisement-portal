const fs = require("fs");

const db = require("../models");

const uploadFiles = async (req, res) => {
  try {
    console.log(req.file);

    // eslint-disable-next-line eqeqeq
    if (req.file == undefined) {
      return res.send("You must select a file.");
    }
    // This give a unique id to every image
    // const uniqueID = req.file.filename.split("-")[0];

    db.Image.create({
      type: req.file.mimetype,
      name: req.file.filename,
      data: fs.readFileSync(
        __basedir + "/public/images/uploads/" + req.file.filename
      )
    }).then(() => {
      setTimeout(() => {
        return res.redirect("/advertise");
      }, 1000);
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

module.exports = {
  uploadFiles
};
