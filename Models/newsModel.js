const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String
},
  
});

module.exports = mongoose.model('News', newsSchema);

