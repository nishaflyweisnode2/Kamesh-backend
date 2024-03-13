var multer = require("multer");
require('dotenv').config()
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({ cloud_name: "dtijhcmaa", api_key: "624644714628939", api_secret: "tU52wM1-XoaFD2NrHbPrkiVKZvY", });




const storage = new CloudinaryStorage({ cloudinary: cloudinary, params: { folder: "Kamesh/carImage", allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"], }, });
const carImage = multer({ storage: storage });







module.exports = { carImage,}