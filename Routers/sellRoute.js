const express = require("express");
const sellControllers = require("../Controller/sellController");

require("dotenv").config();


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
const router = express();

const authJwt = require("../middleware/authJwt");

router.post("/add", [sellControllers.AddSell]);
router.get("/", [sellControllers.getSell]);
router.get("/:id", [authJwt.verifyToken,sellControllers.getSellById]);
router.get("/brand/:brandId", [sellControllers.getSellsByBrandId]);
router.get("/view/history", [authJwt.verifyToken,sellControllers.getUserViewHistory]);


router.put("/popular/:productId", [sellControllers.makePopular]);
router.get("/popular/get", [sellControllers.getPopular]);


router.delete("/:id", [sellControllers.removeSell]);

module.exports = router;
