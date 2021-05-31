module.exports = function (app) {
  const teams = require("../controller/team.controller");

  // Create a new user
  app.post("/api/teams", teams.create);

  // Retrieve all user
  app.get("/api/teams", teams.findAll);

  app.get("/api/teams/:id", teams.findById);

  // // Update a Customer with Id
  app.put("/api/teams/:id", teams.update);

  // // Delete a Customer with Id
  app.delete("/api/teams/:id", teams.delete);
};
