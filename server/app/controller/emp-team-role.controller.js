const fs = require("fs");
const db = require("../config/db.config.js");
const EmployeeTeamRole = db.EmpTeamRole;

// Post a Customer
exports.create = async (req, res) => {
  await EmployeeTeamRole.create({
    id: req.body.id,
    employeeId: req.body.employeeId,
    teamId: req.body.teamId,
    roleId: req.body.roleId,
  }).then((EmployeeTeamRoles) => {
    // Send created customer to client
    res.send(EmployeeTeamRoles);
  });
};

// FETCH all Customers
exports.findAll = (req, res) => {
  EmployeeTeamRole.findAll().then((EmployeeTeamRoles) => {
    // Send all customers to Client
    res.send(EmployeeTeamRoles);
  });
};

// // Find a Customer by Id
exports.findById = (req, res) => {
  EmployeeTeamRole.findById(req.params.id).then((EmployeeTeamRoles) => {
    res.send(EmployeeTeamRoles);
  });
};

// // Update a Customer
exports.update = (req, res) => {
  const id = req.params.id;
  EmployeeTeamRole.update(
    {
      employeeId: req.body.employeeId,
      teamId: req.body.teamId,
      roleId: req.body.roleId,
    },
    { where: { id: req.params.id } }
  ).then(() => {
    res
      .status(200)
      .send("updated successfully a EmployeeTeamRole with id = " + id);
  });
  // };
};

exports.delete = (req, res) => {
  const id = req.params.id;
  EmployeeTeamRole.destroy({
    where: { id: id },
  }).then(() => {
    res
      .status(200)
      .send("deleted successfully a EmployeeTeamRole with id = " + id);
  });
};
