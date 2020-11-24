const fs = require("fs");

const db = require("../models");

const uploadFiles = async (req, res) => {
  try {
    console.log(req.file);

    // eslint-disable-next-line eqeqeq
    if (req.file == undefined) {
      return res.send("You must select a file.");
    }

    db.Image.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      data: fs.readFileSync(
        __basedir + "/public/images/uploads/" + req.file.filename
      )
    }).then(image => {
      fs.writeFileSync(
        __basedir + "/public/images/tmp/" + image.name,
        image.data
      );

      // return res.send("File has been uploaded.");
    });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

module.exports = {
  uploadFiles
};
