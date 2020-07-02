"use strict";
module.exports = (sequelize, DataTypes) => {
  const bcrypt = require("bcrypt");
  const user = sequelize.define(
    "user",
    {
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {}
  );

  user.associate = function (models) {
    user.hasMany(models.graph);
  };

  user.findByLogin = async (login) => {
    const result = await user.findOne({ where: { email: login } });
    return result;
  };

  user.beforeCreate(async (userInstance) => {
    userInstance.password = await userInstance.generatePasswordHash();
  });

  user.prototype.generatePasswordHash = async function () {
    const saltRounds = 10;
    return await bcrypt.hash(this.password, saltRounds);
  };

  user.prototype.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  return user;
};
