/* eslint-disable no-undef */


module.exports = (app) => {
  const employee_type = require("../data/employee-type.json");



  app.get("/master/get-employee-types", async (req, res) => {
    res.json(employee_type);
  });


};
