const db = require("../config/db.config.js");
const Proccess = db.proccess;

exports.create = async (req, res) => {
  await Proccess.create({
    id: req.body.id,
    name: req.body.name,
    description: req.body.id,
    status: req.body.name,
    employeeId: req.body.employeeId,
  }).then((proccess) => {
    // Send created customer to client
    res.send(proccess);
  });
};

exports.findAll = (req, res) => {
  Proccess.findAll({}).then((proccess) => {
    // Send all customers to Client
    res.send(proccess);
  });
};

exports.findById = (req, res) => {
  Proccess.findById(req.params.id).then((proccess) => {
    res.send(proccess);
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Proccess.destroy({
    where: { id: id },
  }).then(() => {
    res.status(200).send("deleted successfully a Proccess with id = " + id);
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Proccess.update(
    {
      name: req.body.name,
      description: req.body.id,
      status: req.body.name,
      employeeId: req.body.employeeId,
    },
    { where: { id: req.params.id } }
  ).then(() => {
    res.status(200).send("updated successfully a Proccess with name = " + id);
  });
};
