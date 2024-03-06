const mongoose = require('mongoose');

const bodyTypesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
  
});

module.exports = mongoose.model('bodyType', bodyTypesSchema);

