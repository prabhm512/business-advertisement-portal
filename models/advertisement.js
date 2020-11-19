"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Advertisement extends Model {
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
  Advertisement.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      prodName: DataTypes.STRING,
      marketPrice: DataTypes.DECIMAL,
      offeredPrice: DataTypes.DECIMAL,
      description: DataTypes.STRING,
      category: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Advertisement"
    }
  );
  return Advertisement;
};
