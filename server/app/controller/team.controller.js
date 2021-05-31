const db = require("../config/db.config.js");
const Team = db.team;

exports.create = async (req, res) => {
  await Team.create({
    id: req.body.id,
    team_name: req.body.team_name,
  }).then((team) => {
    // Send created customer to client
    res.send(team);
  });
};

exports.findAll = (req, res) => {
  Team.findAll({}).then((team) => {
    // Send all customers to Client
    res.send(team);
  });
};

exports.findById = (req, res) => {
  Team.findById(req.params.id).then((team) => {
    res.send(team);
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Team.destroy({
    where: { id: id },
  }).then(() => {
    res.status(200).send("deleted successfully a group with id = " + id);
  });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Team.update(
    {
      team_name: req.body.team_name,
    },
    { where: { id: req.params.id } }
  ).then(() => {
    res.status(200).send("updated successfully a group with name = " + id);
  });
};
