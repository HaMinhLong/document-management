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
    }
  );
  return User;
};
