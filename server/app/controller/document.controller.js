const fs = require("fs");
const db = require("../config/db.config.js");
const Document = db.document;

// Post a Customer
exports.create = async (req, res) => {
  await Document.create({
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    openDate: req.body.openDate,
    status: req.body.status,
    data: req.file.buffer,
    proccessId: req.body.proccessId,
  }).then((document) => {
    // Send created customer to client
    res.send(document);
  });
  console.log(req.file);
};

// FETCH all Customers
exports.findAll = (req, res) => {
  Document.findAll().then((document) => {
    // Send all customers to Client
    res.send(document);
  });
};

// //
exports.delete = (req, res) => {
  const id = req.params.id;
  Document.destroy({
    where: { id: id },
  }).then(() => {
    res.status(200).send("deleted successfully a Document with id = " + id);
  });
};

// // Find a Customer by Id
exports.findById = (req, res) => {
  Document.findById(req.params.id).then((document) => {
    res.send(document);
  });
};

// // Update a Customer
exports.update = (req, res) => {
  const id = req.params.id;
  Document.update(
    {
      name: req.body.name,
      description: req.body.description,
      openDate: req.body.openDate,
      status: req.body.status,
      data: req.file.buffer,
      proccessId: req.body.proccessId,
    },
    { where: { id: req.params.id } }
  ).then(() => {
    res.status(200).send("updated successfully a Document with id = " + id);
  });
};
