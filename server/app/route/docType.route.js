module.exports = function (app) {
  const docType = require("../controller/docType.controller");

  // Create a new user
  app.post("/api/doctype", docType.create);

  // Retrieve all user
  app.get("/api/doctype", docType.findAll);

  app.get("/api/doctype/:id", docType.findById);

  // // Update a Customer with Id
  app.put("/api/doctype/:id", docType.update);

  // // Delete a Customer with Id
  app.delete("/api/doctype/:id", docType.delete);
};
