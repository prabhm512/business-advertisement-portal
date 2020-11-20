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
      bussEmail: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Business"
    }
  );
  return Business;
};
