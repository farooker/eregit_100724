/* eslint-disable no-undef */

module.exports = (app) => {
    const banks = require('../data/get-banks.json')
  
  app.get('/master/get-banks', async (req, res) => {
    res.json(banks);
  });
  }
  
  