"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          firstName: "max",
          lastName: "max",
          email: "max@max.com",
          password: "$2b$10$kIWpgfB81f8dF8DVQfqI/eJGvX.nAE19CslpYmY0R4eGGhZzYI3Ju",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "peter",
          lastName: "peter",
          email: "peter@peter.com",
          password: "abcd",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
