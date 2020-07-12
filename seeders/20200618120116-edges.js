"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "edges",
      [
        {
          id: "e1-2",
          sourceId: 1,
          targetId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "e1-3",
          sourceId: 1,
          targetId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "e4-5",
          sourceId: 4,
          targetId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "e4-6",
          sourceId: 4,
          targetId: 6,
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
