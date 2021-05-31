module.exports = (sequelize, Sequelize) => {
  const Document = sequelize.define("document", {
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
    openDate: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
    },
    data: {
      type: Sequelize.BLOB("long"),
    },
  });
  return Document;
};
