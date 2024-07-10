/* eslint-disable no-undef */

module.exports = (app) => {
    const data = require("../data/get-business-register-type-by-tax.json");
    app.post("/master/get-business-register-type-by-tax/:id", async (req, res) => {
      res.json(data);
    });
  };
  