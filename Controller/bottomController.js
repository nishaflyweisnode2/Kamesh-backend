const Banner = require('../Models/bottomModel')
require('dotenv').config();

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
exports.AddBanner = async (req, res) => {
  console.log("bot");
  try {
    let findBanner = await Banner.findOne({ name: req.params.name });
    console.log(req.params.name)
    if (findBanner) {
      res.status(409).json({ message: "Banner already exit.", status: 404, data: {} });
    } else {
      upload.single("image")(req, res, async (err) => {
        if (err) { return res.status(400).json({ msg: err.message }); }
        // console.log(req.file);
        const fileUrl = req.file ? req.file.path : "";
        const data = { name: req.params.name, image: fileUrl };
        const banner = await Banner.create(data);
        res.status(200).json({ message: "Banner add successfully.", status: 200, data: banner });
      })
    }

  } catch (error) {
    res.status(500).json({ status: 500, message: "internal server error ", data: error.message, });
  }
};

exports.getbottom = async (req, res) => {

  try {
    // Fetch all brands from the database
    const banners = await Banner.find();

    res.json({ banners });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


exports.getBottombyId = async (req, res) => {
  try {
    const bannerId = req.params.id;

    // Fetch the brand by its ID from the database
    const banners = await Banner.findById(bannerId);

    if (!banners) {
      return res.status(404).json({ message: "banners not found" });
    }

    res.json({ banners });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.updateBottom = async (req, res) => {
  const { id } = req.params;
  const banner = await Banner.findById(id);
  if (!banner) {
    res
      .status(404)
      .json({ message: "Banner Not Found", status: 404, data: {} });
  }
  upload.single("image")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ msg: err.message });
    }
    const fileUrl = req.file ? req.file.path : "";
    banner.image = fileUrl || banner.image;
    banner.name = req.body.name;
    let update = await banner.save();
    res.status(200).json({ message: "Updated Successfully", data: update });
  });
};

exports.removeBottom = async (req, res) => {
  const { id } = req.params;
  const banner = await Banner.findById(id);
  if (!banner) {
    res
      .status(404)
      .json({ message: "Banner Not Found", status: 404, data: {} });
  } else {
    await Banner.findByIdAndDelete(banner._id);
    res.status(200).json({ message: "Banner Deleted Successfully !" });
  }
};