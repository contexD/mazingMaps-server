"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          firstName: "test",
          lastName: "test",
          email: "test@test.com",
          password: "abcd",
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
