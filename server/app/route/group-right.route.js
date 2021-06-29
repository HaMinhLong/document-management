module.exports = function (app) {
  const GroupRights = require("../controller/group-right.controller");

  // Create a new user
  app.post("/api/group-rights", GroupRights.create);

  // Retrieve all user
  app.get("/api/group-rights", GroupRights.findAll);

  app.get("/api/group-rights/:id", GroupRights.findById);

  // // Update a Customer with Id
  app.put("/api/group-rights/:id", GroupRights.update);

  // // Delete a Customer with Id
  app.delete("/api/group-rights/:id", GroupRights.delete);
};
