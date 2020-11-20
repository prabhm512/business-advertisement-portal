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
    // static associate(models) {
    //   Advertisement.belongsTo(models.Business, {
    //     foreignKey: {
    //       allowNull: false
    //     }
    //   });
    // }
  }

  Advertisement.init(
    {
      // id: {
      //   type: DataTypes.UUID,
      //   primaryKey: true,
      //   defaultValue: DataTypes.UUIDV4 // Or Sequelize.UUIDV1
      // },
      prodName: {
        type: DataTypes.STRING
      },
      prodImg: {
        type: DataTypes.BLOB
      },
      marketPrice: {
        type: DataTypes.DECIMAL
      },
      offeredPrice: {
        type: DataTypes.DECIMAL
      },
      description: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: "Advertisement"
    }
  );

  return Advertisement;
};
