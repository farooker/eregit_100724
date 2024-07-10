/* eslint-disable no-undef */

module.exports = (app) => {
    const acc_paymetn_terms = require("../data/get-account-payment-terms.json");
    app.get("master/get-account-payment-terms", async (req, res) => {
      res.json(acc_paymetn_terms);
    });
  };
  