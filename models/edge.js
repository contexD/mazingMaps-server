"use strict";
module.exports = (sequelize, DataTypes) => {
  const edge = sequelize.define(
    "edge",
    {
      source: { type: DataTypes.INTEGER, allowNull: false },
      target: { type: DataTypes.INTEGER, allowNull: false },
    },
    {}
  );
  edge.associate = function (models) {
    edge.belongsTo(models.vertex, {
      as: "source",
      foreignKey: "source",
    });
    edge.belongsTo(models.vertex, {
      as: "target",
      foreignKey: "target",
    });
  };
  return edge;
};
