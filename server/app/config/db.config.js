const env = require("./env.js");

const { Sequelize, Op } = require("sequelize");
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  port: env.port,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  },
});

const db = {};
db.Op = Op;
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
// db.customers = require('../model/customer.model.js')(sequelize, Sequelize);
db.departments = require("../model/department.model.js")(sequelize, Sequelize);
db.employees = require("../model/employee.model.js")(sequelize, Sequelize);
db.user = require("../model/user.model.js")(sequelize, Sequelize);

// db.employees.hasOne(db.user, { as: "employee" });
// db.user.belongsTo(db.employees, { as: "employee" });
db.departments.hasMany(db.employees, { as: "employees" });
db.employees.belongsTo(db.user, {
  foreignKey: "username",
  targetKey: "username",
});
db.user.hasOne(db.employees, { foreignKey: "username", targetKey: "username" });

module.exports = db;
