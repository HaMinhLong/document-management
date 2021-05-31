module.exports = function (app) {
  const assigned = require("../controller/assigned.controller");

  // Create a new Customer
  app.post("/api/assigned", assigned.create);

  // Retrieve all Customer
  app.get("/api/assigned", assigned.findAll);

  // app.get('/api/departments/:id', departments.findSub);

  // Retrieve a single Customer by Id
  app.get("/api/assigned/:id", assigned.findById);

  // // Update a Customer with Id
  app.put("/api/assigned/:id", assigned.update);

  // // Delete a Customer with Id
  app.delete("/api/assigned/:id", assigned.delete);
};
