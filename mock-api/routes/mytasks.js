/* eslint-disable no-undef */

// const { delay } = require("../utils");

module.exports = (app) => {
  const account_tasks = require("../data/getall-account-newtasks.json");



  app.get("/partner/get-account-tasks", async (req, res) => {
    res.setHeader("Items-Offset", 0);
    res.setHeader("Items-Limit", 10);
    res.setHeader("Items-Total", 24);
    res.json(account_tasks);
  });

};

// /v1/partner/search-business-partner
// /v1/partner/create-business-partner-profile-form
