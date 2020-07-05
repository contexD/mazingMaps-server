"use strict";
module.exports = (sequelize, DataTypes) => {
  const edges = sequelize.define(
    "edges",
    {
      sourceId: { type: DataTypes.INTEGER, allowNull: false },
      targetId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {}
  );
  edges.associate = function (models) {
    edges.belongsTo(models.vertex, { as: "source" });
    edges.belongsTo(models.vertex, { as: "target" });
  };
  return edges;
};
