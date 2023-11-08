const mongoose = require('mongoose');

const VideoBannerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name Blog Required"],
},
video: {
    type: String
},

});



module.exports = mongoose.model("VideoBanner", VideoBannerSchema);