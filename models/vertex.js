"use strict";
module.exports = (sequelize, DataTypes) => {
  const vertex = sequelize.define(
    "vertex",
    {
      data: { type: DataTypes.JSON, allowNull: false },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "inputNode",
      },
      position: { type: DataTypes.JSON },
    },
    {}
  );
  vertex.associate = function (models) {
    vertex.belongsTo(models.graph);
    vertex.belongsToMany(models.vertex, {
      as: "targets",
      through: "edges",
      foreignKey: "source",
      otherKey: "target",
    });
    vertex.belongsToMany(models.vertex, {
      as: "sources",
      through: "edges",
      foreignKey: "target",
      otherKey: "source",
    });
  };
  return vertex;
};
