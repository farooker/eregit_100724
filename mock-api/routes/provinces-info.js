/* eslint-disable no-undef */
module.exports = (app) => {
  const provices = require("../data/provinces-info/provinces.json");
  const district = require("../data/provinces-info/district.json");
  const sub_district = require("../data/provinces-info/sub-district.json");
  const post_code = require("../data/provinces-info/post-code.json");

  app.get("/master/get-provinces", async (req, res) => {
    res.json(provices);
  });

  app.get("/master/get-districts", async (req, res) => {
    res.json(district);
  });

  app.get("/master/get-subdistricts", async (req, res) => {
    res.json(sub_district);
  });

  app.get("/master/get-postal-codes", async (req, res) => {
    res.json(post_code);
  });
};
