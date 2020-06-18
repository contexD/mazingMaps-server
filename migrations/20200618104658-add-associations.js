"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn(
        "graphs", //source model
        "userId", //name of foreign key which is added
        {
          type: Sequelize.INTEGER,
          references: {
            model: "users", //target model
            key: "id", //key in target model
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        }
      )
      .then(() => {
        return queryInterface
          .addColumn(
            "vertices", //source model
            "graphId", //name of foreign key which is added
            {
              type: Sequelize.INTEGER,
              references: {
                model: "graphs", //target model
                key: "id", //key in target model
              },
              onUpdate: "CASCADE",
              onDelete: "SET NULL",
            }
          )
          .then(() => {
            return queryInterface
              .addColumn(
                "edges", //source model
                "source", //name of foreign key which is added
                {
                  type: Sequelize.INTEGER,
                  references: {
                    model: "vertices", //target model
                    key: "id", //key in target model
                  },
                  onUpdate: "CASCADE",
                  onDelete: "SET NULL",
                }
              )
              .then(() =>
                queryInterface.addColumn(
                  "edges", //source model
                  "target", //name of foreign key which is added
                  {
                    type: Sequelize.INTEGER,
                    references: {
                      model: "vertices", //target model
                      key: "id", //key in target model
                    },
                    onUpdate: "CASCADE",
                    onDelete: "SET NULL",
                  }
                )
              );
          });
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .removeColumn(
        "graphs", //name of source model
        "userId" //key to remove
      )
      .then(() => {
        return queryInterface.removeColumn("vertices", "graphId").then(() => {
          return queryInterface.removeColumn("edges", "source").then(() => {
            return queryInterface.removeColumn("edges", "target");
          });
        });
      });
  },
};
