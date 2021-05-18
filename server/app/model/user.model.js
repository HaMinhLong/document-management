const { Sequelize, Op } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user", // Model name
    {
      username: {
        type: Sequelize.STRING,
        unique: true,
        primaryKey: true,
      },
      password: {
        type: Sequelize.STRING,
      },
      roleId: {
        type: Sequelize.STRING,
      },
      roleName: {
        type: Sequelize.STRING,
      },
    }
  );

  return User;
};
