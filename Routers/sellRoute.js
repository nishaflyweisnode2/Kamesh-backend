const express = require("express");
const sellControllers = require("../Controller/sellController");

require("dotenv").config();


const imagePattern = "[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$";
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({ 
    cloud_name: 'dtijhcmaa', 
    api_key: '624644714628939', 
    api_secret: 'tU52wM1-XoaFD2NrHbPrkiVKZvY' 
  });
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "images/image",
    allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"],
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
