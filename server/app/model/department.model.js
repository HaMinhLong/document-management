module.exports = (sequelize, Sequelize) => {
  const Department = sequelize.define("department", {
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
    phoneNumber: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    belongto: {
      type: Sequelize.STRING,
      // foreignKey: true,
      allowNull: true,
    },
  });
  Department.hasMany(Department, {
    as: "Children",
    foreignKey: "belongto",
    useJunctionTable: false,
  });
  return Department;
};
