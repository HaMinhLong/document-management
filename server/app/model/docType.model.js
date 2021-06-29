module.exports = (sequelize, Sequelize) => {
  const DocType = sequelize.define("docType", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
    },
  });
  return DocType;
};
