// // Mongoose models
// const mongoose = require('mongoose');

// // Schema for 'Company' data
// const companySchema = new mongoose.Schema({
//   name: String,
//   address: String,
//   contactPerson: String,
// });

// // Schema for 'Model' data
// const modelSchema = new mongoose.Schema({
//   modelName: String,
//   description: String,
//   year: Number,
// });

// // Create Mongoose models from the schemas
// const Company = mongoose.model('Company', companySchema);
// const Model = mongoose.model('Model', modelSchema);

// module.exports = {
//   Company,
//   Model,
// };
const mongoose = require("mongoose");
const carSchema = new mongoose.Schema({
  ID: Number,
  modelName: String,
  allVersions: String,
  carColors: String,
});

// Check if the model already exists, and if not, create it
const Car = mongoose.models.Car || mongoose.model("Car", carSchema);

module.exports = {
  Car,
};
