"use strict";
module.exports = (sequelize, DataTypes) => {
  const vertex = sequelize.define(
    "vertex",
    {
      data: { type: DataTypes.TEXT, allowNull: false },
      type: {type: DataTypes.STRING, allowNull: false, defaultValue: "inputNode"},
      x: { type: DataTypes.INTEGER },
      y: { type: DataTypes.INTEGER },
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
