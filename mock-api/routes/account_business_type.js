/* eslint-disable no-undef */

module.exports = (app) => {
    const acc_business_partner_types = require("../data/account-business-partner-types.json");
    app.get("master/get-account-business-partner-types", async (req, res) => {
      res.json(acc_business_partner_types);
    });
  };
  