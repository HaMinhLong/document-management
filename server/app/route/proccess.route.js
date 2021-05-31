module.exports = function (app) {
  const Proccess = require("../controller/proccess.controller");

  // Create a new user
  app.post("/api/proccess", Proccess.create);

  // Retrieve all user
  app.get("/api/proccess", Proccess.findAll);

  app.get("/api/proccess/:id", Proccess.findById);

  // // Update a Customer with Id
  app.put("/api/proccess/:id", Proccess.update);

  // // Delete a Customer with Id
  app.delete("/api/proccess/:id", Proccess.delete);
};
