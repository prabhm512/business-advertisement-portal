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
      Advertisement.belongsTo(models.Business, {
        foreignKey: {
          allowNull: false
        }
      });
    }
  }

  Advertisement.init(
    {
      prodName: {
        type: DataTypes.STRING
      },
      prodImg: {
        type: DataTypes.BLOB
      },
      originalPrice: {
        type: DataTypes.INTEGER
      },
      discount: {
        type: DataTypes.INTEGER
      },
      discountedPrice: {
        type: DataTypes.FLOAT
      },
      description: {
        type: DataTypes.STRING
      },
      active: {
        type: DataTypes.BOOLEAN
      }
    },
    {
      sequelize,
      modelName: "Advertisement"
    }
  );

  return Advertisement;
};
