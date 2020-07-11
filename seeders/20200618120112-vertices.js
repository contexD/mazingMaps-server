"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "vertices",
      [
        {
          id: "1",
          data: JSON.stringify({ label: "mazingMapper" }),
          position: JSON.stringify({ x: 250, y: 5 }),
          graphId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "2",
          data: JSON.stringify({ label: "simple" }),
          position: JSON.stringify({ x: 100, y: 100 }),
          graphId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "3",
          data: JSON.stringify({ label: "intuitive" }),
          position: JSON.stringify({ x: 200, y: 200 }),
          graphId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "4",
          data: JSON.stringify({ label: "fetures" }),
          position: JSON.stringify({ x: 250, y: 5 }),
          graphId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "5",
          data: JSON.stringify({ label: "latex" }),
          position: JSON.stringify({ x: 100, y: 100 }),
          graphId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "6",
          data: JSON.stringify({ label: "markdown" }),
          position: JSON.stringify({ x: 200, y: 200 }),
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
