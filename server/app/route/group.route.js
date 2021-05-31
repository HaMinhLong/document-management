module.exports = function (app) {
  const Groups = require("../controller/group.controller");

  // Create a new user
  app.post("/api/groups", Groups.create);

  // Retrieve all user
  app.get("/api/groups", Groups.findAll);

  app.get("/api/groups/:id", Groups.findById);

  // // Update a Customer with Id
  app.put("/api/groups/:id", Groups.update);

  // // Delete a Customer with Id
  app.delete("/api/groups/:id", Groups.delete);
};
