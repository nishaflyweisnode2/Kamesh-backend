const express = require("express");
const bannerControllers = require("../Controller/bannerController");
require("dotenv").config();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dtijhcmaa",
  api_key: "624644714628939",
  api_secret: "tU52wM1-XoaFD2NrHbPrkiVKZvY",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "images/image",
    allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"],
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
