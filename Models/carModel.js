// const mongoose = require('mongoose');

// const carSchema = new mongoose.Schema({
// //   ID: Number,
// //   modelName: String,
// //   allVersions: String,
// //   carColors: String,
// //   company: String,
// //   specifications: {
// //     engineTransmission: {
// //       engine: String,
// //       acceleration: String,
// //       fuelType: String,
// //       maxPower: String,
// //       maxTorque: String,
// //       maxEnginePerformance: String,
// //       maxMotorPerformance: String,
// //       mileage: String,
// //       drivingRange: String,
// //       drivetrain: String,
// //       transmission: String,
// //       emissionStandard: String,
// //       battery: String,
// //       electricMotor: String,
// //       others:String
// //     },
// //     dimension: {
// //       length: String,
// //       weight: String,
// //       height: String,
// //     base:String,
// //     kerbweight:String
// //     },
// //   },
// // });

// const Car = mongoose.model('Car', carSchema);

// module.exports = Car;

const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  company: String,
  model: String,
  category: String,
  subcategory: String,
  specifications: {
    engineAndTransmission: {
      maxEnginePerformance: String,
      maxMotorPerformance: String,
      mileageARAI: String,
    },
  },
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;

