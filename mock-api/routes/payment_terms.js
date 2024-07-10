/* eslint-disable no-undef */


module.exports = (app) => {
  const payment_terms = require("../data/master-get-payment-terms.json");
  const create_payment_terms = require("../data/create-payment-term.json")
  // const role_by_id = require("../data/role_by_id.json");

  app.get("/master/get-payment-terms", async (req, res) => {
    res.json(payment_terms);
  });

  app.get("/master/create-payment-term", async (req, res) => {
    res.json(create_payment_terms);
  });

};

