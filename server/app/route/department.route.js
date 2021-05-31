module.exports = function (app) {
  const departments = require("../controller/department.controller");

  // Create a new Customer
  app.post("/api/departments", departments.create);

  // Retrieve all Customer
  app.get("/api/departments", departments.findAll);

  // app.get('/api/departments/:id', departments.findSub);

  // Retrieve a single Customer by Id
  app.get("/api/departments/:id", departments.findById);

  // // Update a Customer with Id
  app.put("/api/departments/:id", departments.update);

  // // Delete a Customer with Id
  app.delete("/api/departments/:id", departments.delete);
};

// http
