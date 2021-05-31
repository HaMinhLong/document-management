const db = require("../config/db.config.js");
const User = db.user;
const Employee = db.Employee;
const { Sequelize, Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const Group = db.group;
const Right = db.right;

function isExisted(username) {
  return User.count({ where: { username: username } }).then((count) => {
    if (count != 0) {
      return true;
    }
    return false;
  });
}

// Post a Customer
exports.create = (req, res) => {
  // Save to MySQL database
  isExisted(req.body.username).then((isExisted) => {
    if (isExisted) {
      res.send("This username has been taken");
    } else {
      User.create({
        username: req.body.username,
        password: req.body.password,
        groupId: req.body.groupId,
      }).then((user) => {
        // Send created customer to client
        res.send(user);
      });
    }
  });
};

// FETCH all Customers
exports.findAll = (req, res) => {
  User.findAll().then((users) => {
    // Send all customers to Client
    res.send(users);
  });
};

// Find a Customer by Id
exports.findById = (req, res) => {
  User.findById(req.params.id).then((users) => {
    res.send(users);
  });
};

// Update a Customer
exports.update = (req, res) => {
  const id = req.params.id;
  User.update(
    {
      password: req.body.password,
      groupId: req.body.groupId,
    },
    { where: { username: req.params.id } }
  ).then(() => {
    res.status(200).send("updated successfully a user with username = " + id);
  });
};

// Delete a Customer by Id
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
    include: {
      model: Group,
      include: Right,
    },
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
      // Group.findAll({
      //   include: Right,
      //   where: {
      //     Id: user.groupId
      //   }
      //   }).then(group => {
      //     console.log(group)
      //     console.log(user)
      //     res.status(200).send(group);
      //     res.status(200).send(user);
      // });
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.listAvailable = (req, res) => {
  User.findAll({
    attributes: ["username"],
    where: {
      [Op.and]: [
        {
          username: {
            [Op.notIn]: Sequelize.literal(`(SELECT username
            FROM employees)`),
          },
        },
        { groupId: req.params.id },
      ],
    },
  }).then((username) => {
    // Send all customers to Client
    res.send(username);
  });
};
