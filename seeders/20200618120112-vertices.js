"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "vertices",
      [
        {
          data: "mazingMapper",
          x: 250,
          y: 5,
          graphId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          data: "simple",
          x: 100,
          y: 100,
          graphId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          data: "intuitive",
          x: 200,
          y: 200,
          graphId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          data: "features",
          graphId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          data: "latex",
          graphId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          data: "markdown",
          graphId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("vertices", null, {});
  },
};
