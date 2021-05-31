module.exports = (sequelize, Sequelize) => {
  const Proccess = sequelize.define("proccess", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
    },
  });
  return Proccess;
};
