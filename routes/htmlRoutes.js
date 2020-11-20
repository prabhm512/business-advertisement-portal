const path = require("path");

// html routes
module.exports = function(app) {
  app.get("/", (req, res) => {
    res.render("index");
    // res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  app.get("/advertise", (req, res) => {
    // res.render("advertise");
    res.sendFile(path.join(__dirname, "../public/advertise.html"));
  });
  app.get("/admin", (req, res) => {
    res.render("admin");
  });
};
