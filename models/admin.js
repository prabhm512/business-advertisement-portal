// requiring bcrypt for password hashing.
const bcrypt = require("bcryptjs");
// Creating our Admin model
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define("Admin", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  // Creating a custom method for our Admin model and compare the password
  Admin.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the Admin Model lifecycle
  // In this case, before a Admin is created, we will automatically hash their password
  Admin.addHook("beforeCreate", admin => {
    admin.password = bcrypt.hashSync(
      admin.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  return Admin;
};
