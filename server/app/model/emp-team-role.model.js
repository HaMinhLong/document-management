module.exports = (sequelize, Sequelize) => {
  const EmpTeamRole = sequelize.define("emp-team-role", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
    },
  });
  return EmpTeamRole;
};
