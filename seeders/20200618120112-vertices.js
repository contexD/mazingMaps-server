"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "vertices",
      [
        {
          data: "mazingMapper",
          graphId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          data: "simple",
          graphId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          data: "intuitive",
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
