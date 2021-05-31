module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define("role", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
    },
    role_name: {
      type: Sequelize.ENUM,
      values: ["Trưởng nhóm", "Thành viên"],
    },
  });
  return Role;
};
