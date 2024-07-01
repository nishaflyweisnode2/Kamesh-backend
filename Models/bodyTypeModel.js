const mongoose = require('mongoose');

const bodyTypesSchema = new mongoose.Schema({
  name: {
    type: String,
  }
  
});

module.exports = mongoose.model('bodyType', bodyTypesSchema);

