var multer = require("multer");
require('dotenv').config()
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: 'dvwecihog',
  api_key: '364881266278834',
  api_secret: '5_okbyciVx-7qFz7oP31uOpuv7Q'
});



const storage = new CloudinaryStorage({ cloudinary: cloudinary, params: { folder: "Kamesh/carImage", allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF", "jiff", "JIFF", "jfif", "JFIF", "mp4", "MP4", "webm", "WEBM"], }, });
const carImage = multer({ storage: storage });
const storage1 = new CloudinaryStorage({ cloudinary: cloudinary, params: { folder: "Kamesh/Image", allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF", "jiff", "JIFF", "jfif", "JFIF", "mp4", "MP4", "webm", "WEBM"], }, });
const Image = multer({ storage: storage1 });
const storage2 = new CloudinaryStorage({ cloudinary: cloudinary, params: { folder: "Kamesh/usedCarImage", allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF", "jiff", "JIFF", "jfif", "JFIF", "mp4", "MP4", "webm", "WEBM"], }, });
const usedCarImage = multer({ storage: storage2 });
const storage3 = new CloudinaryStorage({ cloudinary: cloudinary, params: { folder: "Kamesh//profileImage", allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF", "jiff", "JIFF", "jfif", "JFIF", "mp4", "MP4", "webm", "WEBM"], }, });
const profileImage = multer({ storage: storage3 });






module.exports = { carImage, Image, usedCarImage, profileImage }