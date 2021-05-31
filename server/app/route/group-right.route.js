module.exports = function (app) {
  const GroupRights = require("../controller/group-right.controller");

  // Retrieve all group rights
  app.get("/api/group-rights", GroupRights.findAll);

  app.get("/api/group-rights/:id", GroupRights.findById);

  // Create a new group right
  app.post("/api/group-rights", GroupRights.create);

  // // Update a group right with Id
  app.put("/api/group-rights/:id", GroupRights.update);

  // // Delete a group right with Id
  app.delete("/api/group-rights/:id", GroupRights.delete);
};
