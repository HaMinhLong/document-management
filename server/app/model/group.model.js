module.exports = (sequelize, Sequelize) => {
  const Group = sequelize.define("group", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
    },
  });
  return Group;
};
