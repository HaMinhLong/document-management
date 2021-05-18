const db = require("../config/db.config.js");
const Department = db.departments;
const { Op } = require("sequelize");

// Post a Department
exports.create = (req, res) => {
  // Save to MySQL database
  console.log(Department);
  Department.create({
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    belongto: req.body.belongto,
  }).then((departments) => {
    // Send created department to client
    res.send(departments);
  });
};

// FETCH all Departments
exports.findAll = (req, res) => {
  Department.findAll().then((departments) => {
    // Send all departments to Client
    res.send(departments);
  });
};

//
// exports.findSub = (req, res) => {
//   Department.findAll({
//     where: {
//       belongto: req.params.id,
//     },
//   }).then((departments) => {
//     // Send all departments to Client
//     res.send(departments);
//   });
// };

// Find a Department by Id
exports.findById = (req, res) => {
  Department.findById(req.params.id).then((departments) => {
    res.send(departments);
  });
};

// Update a Department
exports.update = (req, res) => {
  const id = req.params.id;
  Department.update(
    {
      name: req.body.name,
      description: req.body.description,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      belongto: req.body.belongto,
    },
    { where: { id: req.params.id } }
  ).then(() => {
    res.status(200).send("updated successfully a department with id = " + id);
  });
};

// Delete a Department by Id
exports.delete = (req, res) => {
  const id = req.params.id;
  Department.destroy({
    where: { id: id },
  }).then(() => {
    res.status(200).send("deleted successfully a department with id = " + id);
  });
};
