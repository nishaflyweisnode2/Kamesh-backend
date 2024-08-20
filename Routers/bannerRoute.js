const express = require("express");
const bannerControllers = require("../Controller/bannerController");
require("dotenv").config();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: 'dvwecihog',
  api_key: '364881266278834',
  api_secret: '5_okbyciVx-7qFz7oP31uOpuv7Q'
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "images/image",
    allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF", "jiff", "JIFF", "jfif", "JFIF", "mp4", "MP4", "webm", "WEBM"],
  },
});

const upload = multer({ storage });

const router = express();
// const upload = require("../middleware/fileUpload");/
// const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
// const authJwt = require("../middleware/authJwt");

router.post("/:name", upload.single("image"), [bannerControllers.AddBanner]);
router.get("/", [bannerControllers.getBanner]);
router.route("/get/:id").get(bannerControllers.getbannerbyId);

router.put("/update/:id", upload.single("image"),[bannerControllers.updateBanner]);

router.delete("/:id", [bannerControllers.removeBanner]);

module.exports = router;
