const db = require('../config/db.config.js');
const Department = db.departments;
const { Op } = require("sequelize");


// Post a Customer
exports.create = (req, res) => {	
	// Save to MySQL database
	console.log(Department)
	Department.create({  
	  id: req.body.id,
      description: req.body.description,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      belongto: req.body.belongto,
	}).then(departments => {		
		// Send created customer to client
		res.send(departments);
	});
};
 
// FETCH all Customers
exports.findAll = (req, res) => {
	Department.findAll().then(departments => {
	  // Send all customers to Client
	  res.send(departments);
	});
};

//
exports.findSub = (req, res) => {
	Department.findAll({
		where: {
			belongto: req.params.id
		}
	  }).then(departments => {
	  // Send all customers to Client
	  res.send(departments);
	});
};


// Find a Customer by Id
exports.findById = (req, res) => {	
	Department.findById(req.params.id).then(departments => {
		res.send(departments);
	})
};
 
// Update a Customer
exports.update = (req, res) => {
	const id = req.params.id;
	Department.update( { 
		description: req.body.description,
		phoneNumber: req.body.phoneNumber,
		email: req.body.email,
		belongto: req.body.belongto,}, 
					 { where: {id: req.params.id} }
				   ).then(() => {
					 res.status(200).send("updated successfully a department with id = " + id);
				   });
};
 
// Delete a Customer by Id
exports.delete = (req, res) => {
	const id = req.params.id;
	Department.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).send('deleted successfully a department with id = ' + id);
	});
};