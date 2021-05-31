module.exports = (sequelize, Sequelize) => {
  const Assigned = sequelize.define("assigned", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
    },
  });
  return Assigned;
};
