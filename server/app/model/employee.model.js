module.exports = (sequelize, Sequelize) => {
	const Employee = sequelize.define('employee', {
	  id: {
		type: Sequelize.STRING,
        primaryKey: true
	  },
      name: {
		type: Sequelize.STRING,
	  },
      phoneNumber: {
		type: Sequelize.STRING,
	  },
      email: {
		type: Sequelize.STRING,
	  },
      roleId: {
        type: Sequelize.STRING, 
      },
      roleName: {
        type: Sequelize.STRING, 
      }
	},);
	return Employee;
}