const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    images: [{
        url: String,
      }],

});

module.exports = mongoose.model('Image', imageSchema);

