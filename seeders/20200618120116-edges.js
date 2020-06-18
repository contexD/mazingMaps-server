"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "edges",
      [
        {
          source: 1,
          target: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          source: 1,
          target: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          source: 3,
          target: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          source: 3,
          target: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("edges", null, {});
  },
};
