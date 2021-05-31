const db = require("../config/db.config.js");
const Employee = db.employees;
const User = db.user;
const { Op } = require("sequelize");

// Post a Customer
exports.create = (req, res) => {
  // Save to MySQL database

  Employee.create({
    id: req.body.id,
    code: req.body.code,
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    roleId: req.body.roleId,
    roleName: req.body.roleName,
    departmentId: req.params.id,
    username: req.body.username,
  }).then((employee) => {
    // Send created customer to client
    res.send(employee);
  });
};

// FETCH all Customers
exports.findAll = (req, res) => {
  Employee.findAll().then((employee) => {
    // Send all customers to Client
    res.send(employee);
  });
};

// Find a Customer by Id
exports.findById = (req, res) => {
  Employee.findById(req.params.id).then((employee) => {
    res.send(employee);
  });
};

// Update a Customer
exports.update = (req, res) => {
  const id = req.params.id;
  Employee.update(
    {
      id: req.body.id,
      code: req.body.code,
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      roleId: req.body.roleId,
      roleName: req.body.roleName,
      username: req.params.username,
      departmentId: req.body.departmentId,
    },
    { where: { id: req.params.id } }
  ).then(() => {
    res.status(200).send("updated successfully a employee with id = " + id);
  });
};

// Delete a Customer by Id
exports.delete = (req, res) => {
  const id = req.params.id;
  Employee.destroy({
    where: { id: id },
  }).then(() => {
    res.status(200).send("deleted successfully a employee with id = " + id);
  });
  // console.log('1')
};

// List all available user
