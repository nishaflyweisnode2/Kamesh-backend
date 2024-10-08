const express = require('express');
const VideoBanner = require('../Controller/videoController')
const videoPattern = "[^\\s]+(.*?)\\.(mp4|avi|mov|flv|wmv)$";
// const imagePattern = "[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$";
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
    folder: "videos", // optional folder name in your Cloudinary account
    allowed_formats: ["mp4", "avi", "mov", "flv", "wmv"], // allowed video formats
    resource_type: "video", // specify the resource type as video
  },
});

const upload = multer({ storage: storage });
const router = express();
router.post('/add', VideoBanner.AddVideoBanner);
router.get('/', VideoBanner.getVideoBanner);
router.put('/update/:id', upload.single("video"), VideoBanner.updateById);
router.delete('/delete/:id', VideoBanner.DeleteVideoBanner);



module.exports = router;