const mongoose = require('mongoose');

const fuelSchema = new mongoose.Schema({
  name: {
    type: String,
  },

});

module.exports = mongoose.model('Fuel', fuelSchema);

