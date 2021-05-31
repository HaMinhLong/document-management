const db = require("../config/db.config.js");
const Group = db.group;
const GroupRight = db.groupRight;
const Right = db.right;

exports.create = async (req, res) => {
  await Group.create({
    id: req.body.id,
    name: req.body.name,
  }).then((group) => {
    // Send created customer to client
    res.send(group);
  });
};

exports.findAll = (req, res) => {
  Group.findAll({
    include: Right,
  }).then((group) => {
    // Send all customers to Client
    res.send(group);
  });
};

exports.findById = (req, res) => {
  Group.findById(req.params.id).then((groups) => {
    res.send(groups);
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Group.destroy({
    where: { id: id },
  }).then(() => {
    res.status(200).send("deleted successfully a group with id = " + id);
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Group.update(
    {
      name: req.body.name,
    },
    { where: { id: req.params.id } }
  ).then(() => {
    res.status(200).send("updated successfully a group with name = " + id);
  });
};
