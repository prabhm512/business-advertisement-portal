"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Business extends Model {
    // static associate(models) {
    //   Business.hasMany(models.Advertisement, {
    //     onDelete: "cascade"
    //   });
    // }
  }
  Business.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      bussName: DataTypes.STRING,
      bussCategory: DataTypes.STRING,
      bussDescription: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Business"
    }
  );
  return Business;
};
