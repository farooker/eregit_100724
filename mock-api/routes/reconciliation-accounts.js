/* eslint-disable no-undef */

module.exports = (app) => {
    const data = require("../data/get-reconciliation-accounts.json");
    app.get("/master/get-reconciliation-accounts", async (req, res) => {
      res.json(data);
    });
  };
  