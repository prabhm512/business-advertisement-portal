/* eslint-disable no-unused-vars */
"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Advertisements", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      prodName: {
        type: Sequelize.STRING
      },
      marketPrice: {
        type: Sequelize.DECIMAL
      },
      offeredPrice: {
        type: Sequelize.DECIMAL
      },
      prodImg: {
        type: Sequelize.BLOB
      },
      description: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Advertisements");
  }
};
