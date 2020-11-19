const path = require("path");

// html routes
module.exports = function(app) {
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  app.get("/advertise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/advertise.html"));
  });
};
