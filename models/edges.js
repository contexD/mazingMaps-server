"use strict";
module.exports = (sequelize, DataTypes) => {
  const edges = sequelize.define(
    "edges",
    {
      source: { type: DataTypes.STRING, allowNull: false },
      target: { type: DataTypes.STRING, allowNull: false },
    },
    {}
  );
  edges.associate = function (models) {
    edges.belongsTo(models.vertex, { as: "source" });
    edges.belongsTo(models.vertex, { as: "target" });
  };
  return edges;
};
