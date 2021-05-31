module.exports = function (app) {
  const roles = require("../controller/role.controller");

  // Create a new user
  app.post("/api/roles", roles.create);

  // Retrieve all user
  app.get("/api/roles", roles.findAll);

  app.get("/api/roles/:id", roles.findById);

  // // Update a Customer with Id
  app.put("/api/roles/:id", roles.update);

  // // Delete a Customer with Id
  app.delete("/api/roles/:id", roles.delete);
};
