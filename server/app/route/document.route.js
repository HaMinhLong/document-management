module.exports = function (app) {
  const documents = require("../controller/document.controller");
  var multer = require("multer");
  var upload = multer();
  // Create a new Customer
  app.post("/api/documents", upload.single("data"), documents.create);

  // Retrieve all Customer
  app.get("/api/documents", documents.findAll);

  // Retrieve a single Customer by Id
  app.get("/api/documents/:id", documents.findById);

  // // Update a Customer with Id
  app.put("/api/documents/:id", upload.single("data"), documents.update);

  // // Delete a Customer with Id
  app.delete("/api/documents/:id", documents.delete);
};
