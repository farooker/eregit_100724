/* eslint-disable no-undef */

module.exports = (app) => {
  const business_partner_groups = require("../data/business-partner-groups.json");
  const business_partner_type = require("../data/create-business-partner-type.json")
  app.get("/master/get-business-partner-groups", async (req, res) => {
    res.json(business_partner_groups);
  });

  app.post("/master/create-business-partner-type", async (req, res) => {
    res.json(business_partner_type);
  });
};
