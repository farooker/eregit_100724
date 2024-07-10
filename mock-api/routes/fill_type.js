/* eslint-disable no-undef */

module.exports = (app) => {
  const fill_types = require("../data/get-fill-types.json");
  app.get("/master/get-fill-types", async (req, res) => {
    res.json(fill_types);
  });
};
