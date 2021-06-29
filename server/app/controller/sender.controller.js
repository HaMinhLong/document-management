const db = require("../config/db.config.js");
const Sender = db.sender;

exports.create = async (req, res) => {
  await Sender.create({
    id: req.body.id,
    name: req.body.name,
  }).then((sender) => {
    // Send created customer to client
    res.send(sender);
  });
};

exports.findAll = (req, res) => {
  Sender.findAll().then((sender) => {
    // Send all customers to Client
    res.send(sender);
  });
};

exports.findById = (req, res) => {
  Sender.findById(req.params.id).then((sender) => {
    res.send(sender);
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Sender.destroy({
    where: { id: id },
  }).then(() => {
    res.status(200).send("deleted successfully a right with id = " + id);
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Sender.update(
    {
      name: req.body.name,
    },
    { where: { id: req.params.id } }
  ).then(() => {
    res.status(200).send("updated successfully a right with username = " + id);
  });
};
