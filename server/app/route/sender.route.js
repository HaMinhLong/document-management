module.exports = function (app) {
  const sender = require("../controller/sender.controller");

  // Create a new user
  app.post("/api/sender", sender.create);

  // Retrieve all user
  app.get("/api/sender", sender.findAll);

  app.get("/api/sender/:id", sender.findById);

  // // Update a Customer with Id
  app.put("/api/sender/:id", sender.update);

  // // Delete a Customer with Id
  app.delete("/api/sender/:id", sender.delete);
};
