"use strict";
module.exports = (sequelize, DataTypes) => {
  const graph = sequelize.define(
    "graph",
    {
      name: { type: DataTypes.STRING, allowNull: false },
    },
    {}
  );
  graph.associate = function (models) {
    graph.belongsTo(models.user);
    graph.hasMany(models.vertex);
  };
  return graph;
};
