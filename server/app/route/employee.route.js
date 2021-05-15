module.exports = function(app) {
 
    const employees = require('../controller/employee.controller');
 
    // Create a new Customer
    app.post('/api/employees/:id', employees.create);
 
    // Retrieve all Customer
    app.get('/api/employees', employees.findAll);

 
    // Retrieve a single Customer by Id
    app.get('/api/employees/:id', employees.findById);
 
    // // Update a Customer with Id
    app.put('/api/employees/:id', employees.update);
 
    // // Delete a Customer with Id
    app.delete('/api/employees/:id', employees.delete);
}