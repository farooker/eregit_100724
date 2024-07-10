/* eslint-disable no-undef */

module.exports = (app) => {
  const document_types = require("../data/document-data/get-document-types.json");

  app.post("/master/get-document-types", async (req, res) => {
    res.json(document_types);
  });

  app.post("/master/get-document-types", async (req, res) => {
    res.json(document_types);
  });
};
