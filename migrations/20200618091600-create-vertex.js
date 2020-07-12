"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("vertices", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.Integer,
      },
      data: {
        allowNull: false,
        type: Sequelize.JSON,
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "inputNode",
      },
      position: {
        type: Sequelize.JSON,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("vertices");
  },
};
