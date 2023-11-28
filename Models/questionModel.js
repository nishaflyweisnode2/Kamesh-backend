const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  name: {
    type: String,
  },

  number: {
    type: String,
  },
  haveCar: {
    type: String,
    enum: ['yes', 'no',]
  }
  
});

module.exports = mongoose.model("Question", questionSchema);
