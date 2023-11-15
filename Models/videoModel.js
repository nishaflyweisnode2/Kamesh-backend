const mongoose = require('mongoose');

const VideoBannerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name Blog Required"],
},
video: {
    type: String
},
view: {
  type: String,
  default:""
},like: {
  type: String,
  default:""

},
});



module.exports = mongoose.model("VideoBanner", VideoBannerSchema);