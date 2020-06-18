"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "edges",
      [
        {
          sourceId: 1,
          targetId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sourceId: 1,
          targetId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sourceId: 3,
          targetId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sourceId: 3,
          targetId: 5,
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