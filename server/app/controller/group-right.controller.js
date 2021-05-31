const db = require("../config/db.config.js");
const GroupRight = db.groupRight;
const Group = db.group;

exports.create = async (req, res) => {
  await GroupRight.create({
    id: req.body.id,
    rightId: req.body.rightId,
    groupId: req.body.groupId,
  }).then((groupRight) => {
    // Send created group right to client
    res.send(groupRight);
  });
};

exports.findAll = (req, res) => {
  GroupRight.findAll({}).then((groupRight) => {
    // Send all group rights to Client
    res.send(groupRight);
  });
};

exports.findById = (req, res) => {
  GroupRight.findById(req.params.id).then((groupRight) => {
    res.send(groupRight);
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  GroupRight.destroy({
    where: { id: id },
  }).then(() => {
    res.status(200).send("deleted successfully a group-right with id = " + id);
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  GroupRight.update(
    {
      rightId: req.body.rightId,
      groupId: req.body.groupId,
    },
    { where: { id: req.params.id } }
  ).then(() => {
    res
      .status(200)
      .send("updated successfully a group-right with name = " + id);
  });
};
