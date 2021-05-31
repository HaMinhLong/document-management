module.exports = function (app) {
  const rights = require("../controller/right.controller");

  // Retrieve all right
  app.get("/api/rights", rights.findAll);

  app.get("/api/rights/:id", rights.findById);

  // Create a new right
  app.post("/api/rights", rights.create);

  // // Update a right with Id
  app.put("/api/rights/:id", rights.update);

  // // Delete a right with Id
  app.delete("/api/rights/:id", rights.delete);
};
