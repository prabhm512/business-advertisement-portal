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
    })
      .then(image => {
        fs.writeFileSync(
          __basedir + "/public/images/tmp/" + image.name,
          image.data
        );

        // return res.send("File has been uploaded.");
      })
      .then(() => {
        // Remove the image file from the tmp folder as too many images will cause the app to increase in size
        // Images in tmp folder are not being used
        fs.unlinkSync(__basedir + "/public/images/tmp/" + req.file.filename);
      });
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};

module.exports = {
  uploadFiles
};
