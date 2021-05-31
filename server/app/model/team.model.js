module.exports = (sequelize, Sequelize) => {
  const Team = sequelize.define("team", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
    },
    team_name: {
      type: Sequelize.STRING,
    },
  });
  return Team;
};
