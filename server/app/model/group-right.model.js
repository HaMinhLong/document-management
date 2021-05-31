module.exports = (sequelize, Sequelize) => {
  const GroupRight = sequelize.define("groupRight", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
    },
  });
  return GroupRight;
};
