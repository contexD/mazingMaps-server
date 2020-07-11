"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "edges",
      [
        {
          id: "e1-2",
          source: "1",
          target: "2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "e1-3",
          source: "1",
          target: "3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "e4-5",
          source: "4",
          target: "5",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "e4-6",
          source: "4",
          target: "6",
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
