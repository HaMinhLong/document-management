module.exports = function (app) {
  const rights = require("../controller/right.controller");

  // Create a new user
  app.post("/api/rights", rights.create);

  // Retrieve all user
  app.get("/api/rights", rights.findAll);

  app.get("/api/rights/:id", rights.findById);

  // // Update a Customer with Id
  app.put("/api/rights/:id", rights.update);

  // // Delete a Customer with Id
  app.delete("/api/rights/:id", rights.delete);
};
