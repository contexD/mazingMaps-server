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
    vertex.hasMany(models.edge);
  };
  return vertex;
};
