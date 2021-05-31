const fs = require("fs");
const db = require("../config/db.config.js");
const Assigned = db.assigned;

// Post a Customer
exports.create = async (req, res) => {
  await Assigned.create({
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
  Assigned.findAll().then((assigned) => {
    // Send all customers to Client
    res.send(assigned);
  });
};

// // Find a Customer by Id
exports.findById = (req, res) => {
  Assigned.findById(req.params.id).then((assigned) => {
    res.send(assigned);
  });
};

// // Update a Customer
exports.update = (req, res) => {
  const id = req.params.id;
  Assigned.update(
    {
      employeeId: req.body.employeeId,
      teamId: req.body.teamId,
      roleId: req.body.roleId,
    },
    { where: { id: req.params.id } }
  ).then(() => {
    res.status(200).send("updated successfully a Assigned with id = " + id);
  });
  // };
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Assigned.destroy({
    where: { id: id },
  }).then(() => {
    res.status(200).send("deleted successfully a Assigned with id = " + id);
  });
};
