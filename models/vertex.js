"use strict";
module.exports = (sequelize, DataTypes) => {
  const vertex = sequelize.define(
    "vertex",
    {
      data: { type: DataTypes.TEXT, allowNull: false },
    },
    {}
  );
  vertex.associate = function (models) {
    vertex.belongsTo(models.graph);
    vertex.belongsToMany(models.vertex, {
      as: "targets",
      through: "edges",
      foreignKey: "sourceId",
      otherKey: "targetId",
    });
    vertex.belongsToMany(models.vertex, {
      as: "sources",
      through: "edges",
      foreignKey: "targetId",
      otherKey: "sourceId",
    });
  };
  return vertex;
};
