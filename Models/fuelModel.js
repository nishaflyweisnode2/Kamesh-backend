const mongoose = require('mongoose');

const fuelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('Fuel', fuelSchema);

