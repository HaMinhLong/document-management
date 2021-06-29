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
db.departments = require("../model/department.model.js")(sequelize, Sequelize);
db.employees = require("../model/employee.model.js")(sequelize, Sequelize);
db.user = require("../model/user.model.js")(sequelize, Sequelize);
db.right = require("../model/right.model.js")(sequelize, Sequelize);
db.group = require("../model/group.model.js")(sequelize, Sequelize);
db.document = require("../model/document.model.js")(sequelize, Sequelize);
db.role = require("../model/role.model.js")(sequelize, Sequelize);
// db.team = require('../model/team.model.js')(sequelize, Sequelize);
// db.EmpTeamRole = require('../model/emp-team-role.model.js')(sequelize, Sequelize);
db.groupRight = require("../model/group-right.model.js")(sequelize, Sequelize);
// db.proccess = require('../model/proccess.model.js')(sequelize, Sequelize);
db.assigned = require("../model/assigned.model.js")(sequelize, Sequelize);
db.document = require("../model/document.model.js")(sequelize, Sequelize);
db.sender = require("../model/sender.model.js")(sequelize, Sequelize);
db.docType = require("../model/docType.model.js")(sequelize, Sequelize);

//association
db.departments.hasMany(db.employees, { as: "employees" });
db.employees.belongsTo(db.user, {
  foreignKey: "username",
  targetKey: "username",
});
db.user.hasOne(db.employees, { foreignKey: "username", targetKey: "username" });
db.right.belongsToMany(db.group, { through: db.groupRight });
db.group.belongsToMany(db.right, { through: db.groupRight });
db.user.belongsTo(db.group);
db.group.hasOne(db.user);

// db.employees.belongsToMany(db.team, { through: db.EmpTeamRole });
// db.team.belongsToMany(db.employees, { through: db.EmpTeamRole });
// db.employees.belongsToMany(db.role, { through: db.EmpTeamRole});
// db.team.belongsToMany(db.role, { through: db.EmpTeamRole});

db.employees.hasMany(db.document, { as: "documents" });
db.departments.hasMany(db.document, { as: "documents" });
// db.proccess.hasMany(db.document, { as: "proccess" });

db.employees.belongsToMany(db.role, { through: db.assigned });
db.role.belongsToMany(db.employees, { through: db.assigned });
db.employees.belongsToMany(db.document, { through: db.assigned });
db.role.belongsToMany(db.document, { through: db.assigned });
//
db.sender.hasMany(db.document, { as: "documents" });
db.docType.hasMany(db.document, { as: "documents" });

module.exports = db;
