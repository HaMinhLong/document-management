module.exports = function (app) {
  const users = require("../controller/user.controller");

  // Create a new user
  app.post("/api/users", users.create);

  // Retrieve all user
  app.get("/api/users", users.findAll);

  // Get available user
  // app.get("/api/listAvailable", users.listAvailable);
  app.get("/api/listAvailable/:id", users.listAvailable);

  // Retrieve a single user by Id
  app.get("/api/users/:id", users.findById);

  // // Update a user with Id
  app.put("/api/users/:id", users.update);

  // // Delete a user with Id
  app.delete("/api/users/:id", users.delete);

  app.post("/api/users/signin", users.signin);
};

// http
