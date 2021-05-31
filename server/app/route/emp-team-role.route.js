module.exports = function (app) {
  const EmpTeamRole = require("../controller/emp-team-role.controller");

  // Create a new user
  app.post("/api/emp-team-role", EmpTeamRole.create);

  // Retrieve all user
  app.get("/api/emp-team-role", EmpTeamRole.findAll);

  app.get("/api/emp-team-role/:id", EmpTeamRole.findById);

  // // Update a Customer with Id
  app.put("/api/emp-team-role/:id", EmpTeamRole.update);

  // // Delete a Customer with Id
  app.delete("/api/emp-team-role/:id", EmpTeamRole.delete);
};
