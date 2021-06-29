module.exports = (sequelize, Sequelize) => {
  const Sender = sequelize.define("sender", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
    },
  });
  return Sender;
};
