const db = require("../config/db.config.js");
const User = db.user;
const bcrypt = require("bcryptjs");
const { Sequelize, Op } = require("sequelize");

function isExisted(username) {
  return User.count({ where: { username: username } }).then((count) => {
    if (count != 0) {
      return true;
    }
    return false;
  });
}

// Post a User
exports.create = (req, res) => {
  // Save to MySQL database
  isExisted(req.body.username).then((isExisted) => {
    if (isExisted) {
      res.send("This username has been taken");
    } else {
      User.create({
        username: req.body.username,
        password: req.body.password,
        roleId: req.body.roleId,
        roleName: req.body.roleName,
      }).then((user) => {
        // Send created User to client
        res.send(user);
      });
    }
  });
};

// FETCH all Users
exports.findAll = (req, res) => {
  User.findAll().then((users) => {
    // Send all users to Client
    res.send(users);
  });
};

// exports.listAvailable = (req, res) => {
//   User.findAll({
//     attributes: ["username"],
//     where: {
//       username: {
//         [Op.notIn]: Sequelize.literal(`(SELECT username
//           FROM employees)`),
//       },
//     },
//   }).then((username) => {
//     // Send all users to Client
//     res.send(username);
//   });
//   // res.send("1");
// };

exports.listAvailable = (req, res) => {
  User.findAll({
    attributes: ["username"],
    where: {
      [Op.and]: [
        // {
        //   username: {
        //     [Sequelize.Op.notIn]: Sequelize.literal(`(SELECT username
        //   FROM employees)`),
        //   },
        // },
        { roleId: req.params.id },
      ],
    },
  }).then((username) => {
    // Send all customers to Client
    res.send(username);
  });
};

// Find a User by Id
exports.findById = (req, res) => {
  User.findById(req.params.id).then((users) => {
    res.send(users);
  });
};

// Update a User
exports.update = (req, res) => {
  const id = req.params.id;
  // console.log(req.params.id),
  // console.log(req.body)
  User.update(
    {
      password: req.body.password,
      roleId: req.body.roleId,
      roleName: req.body.roleName,
    },
    { where: { username: req.params.id } }
  ).then(() => {
    res.status(200).send("updated successfully a user with username = " + id);
  });
};

// Delete a User by Id
exports.delete = (req, res) => {
  const id = req.params.id;
  User.destroy({
    where: { username: id },
  }).then(() => {
    res.status(200).send("deleted successfully a user with id = " + id);
  });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(200).send({ message: "User Not found." });
      }

      function compareString(str1, str2) {
        if (str1 === str2) return true;
        else return false;
      }

      if (!compareString(req.body.password, user.password)) {
        return res.status(200).send({
          message: "Invalid Password!",
        });
      }
      res.status(200).send({
        username: user.username,
        password: user.password,
        roleId: user.roleId,
        roleName: user.roleName,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
