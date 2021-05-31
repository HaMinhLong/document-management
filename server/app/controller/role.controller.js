const db = require("../config/db.config.js");
const Role = db.role;

exports.create = async (req, res) => {
  await Role.create({
    id: req.body.id,
    role_name: req.body.role_name,
  }).then((role) => {
    // Send created customer to client
    res.send(role);
  });
};

exports.findAll = (req, res) => {
  Role.findAll({}).then((role) => {
    // Send all customers to Client
    res.send(role);
  });
};

exports.findById = (req, res) => {
  Role.findById(req.params.id).then((role) => {
    res.send(role);
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Role.destroy({
    where: { id: id },
  }).then(() => {
    res.status(200).send("deleted successfully a role with id = " + id);
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Role.update(
    {
      role_name: req.body.role_name,
    },
    { where: { id: req.params.id } }
  ).then(() => {
    res.status(200).send("updated successfully a role with name = " + id);
  });
};
