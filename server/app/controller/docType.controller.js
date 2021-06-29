const db = require("../config/db.config.js");
const DocType = db.docType;

exports.create = async (req, res) => {
  await DocType.create({
    id: req.body.id,
    name: req.body.name,
  }).then((doctype) => {
    // Send created customer to client
    res.send(doctype);
  });
};

exports.findAll = (req, res) => {
  DocType.findAll().then((doctype) => {
    // Send all customers to Client
    res.send(doctype);
  });
};

exports.findById = (req, res) => {
  DocType.findById(req.params.id).then((doctype) => {
    res.send(doctype);
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  DocType.destroy({
    where: { id: id },
  }).then(() => {
    res.status(200).send("deleted successfully a right with id = " + id);
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  DocType.update(
    {
      name: req.body.name,
    },
    { where: { id: req.params.id } }
  ).then(() => {
    res.status(200).send("updated successfully a right with username = " + id);
  });
};
