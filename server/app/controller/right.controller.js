const db = require("../config/db.config.js");
const Right = db.right;

exports.create = async (req, res) => {
  await Right.create({
    id: req.body.id,
    name: req.body.name,
    url: req.body.url,
  }).then((right) => {
    // Send created customer to client
    res.send(right);
  });
};

exports.findAll = (req, res) => {
  Right.findAll().then((right) => {
    // Send all customers to Client
    res.send(right);
  });
};

exports.findById = (req, res) => {
  Right.findById(req.params.id).then((rights) => {
    res.send(rights);
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Right.destroy({
    where: { id: id },
  }).then(() => {
    res.status(200).send("deleted successfully a right with id = " + id);
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Right.update(
    {
      name: req.body.name,
      url: req.body.url,
    },
    { where: { id: req.params.id } }
  ).then(() => {
    res.status(200).send("updated successfully a right with username = " + id);
  });
};
