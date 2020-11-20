"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Business extends Model {
    static associate(models) {
      Business.hasMany(models.Advertisement, {
        onDelete: "cascade"
      });
    }
  }
  Business.init(
    {
      bussName: DataTypes.STRING,
      bussCategory: DataTypes.STRING,
      bussEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          // length of email should be bw 3 to 140 characters
          len: [3, 140],
          isEmail: true
        }
      }
    },
    {
      sequelize,
      modelName: "Business"
    }
  );
  return Business;
};
