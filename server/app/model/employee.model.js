module.exports = (sequelize, Sequelize) => {
  const Employee = sequelize.define("employee", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    code: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    phoneNumber: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    roleId: {
      type: Sequelize.STRING,
    },
    roleName: {
      type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.STRING,
    },
  });

  return Employee;
};
