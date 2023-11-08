// companyModel.js
const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: String,
  allVersions: String,
  carColors: String,
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
