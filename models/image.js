"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  Image.init(
    {
      type: DataTypes.STRING,
      name: DataTypes.STRING,
      data: DataTypes.BLOB("long")
    },
    {
      sequelize,
      modelName: "Image"
    }
  );
  return Image;
};
