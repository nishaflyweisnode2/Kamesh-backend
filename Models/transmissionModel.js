const mongoose = require('mongoose');
const imagePattern = "[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$";
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: 'dvwecihog',
  api_key: '364881266278834',
  api_secret: '5_okbyciVx-7qFz7oP31uOpuv7Q'
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "images/image",
    allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF", "jiff", "JIFF", "jfif", "JFIF", "mp4", "MP4", "webm", "WEBM"],
  },
});
const upload = multer({ storage: storage });
const transmissionSchema = new mongoose.Schema({
  name: {
    type: String,
  },

});

module.exports = mongoose.model('Transmission', transmissionSchema);

