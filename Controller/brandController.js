const Brand = require("../Models/brandModel");

const express = require('express');
const router = express.Router();
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

  exports.createBrand= async (req, res) => {
    try {
        let findBrand = await Brand.findOne({ name: req.body.name });
        console.log(req.body.name)
        if (findBrand) {
          res.status(409).json({ message: "Brand already exit.", status: 404, data: {} });
        } else {
          upload.single("image")(req, res, async (err) => {
            if (err) { return res.status(400).json({ msg: err.message }); }
            const fileUrl = req.file ? req.file.path : "";
            const data = { name: req.body.name, image: fileUrl };
            const Brands = await Brand.create(data);
            res.status(200).json({ message: "Brand add successfully.", status: 200, data: Brands });
          })
        }
    
      } catch (error) {
        res.status(500).json({ status: 500, message: "internal server error ", data: error.message, });
      }
    };

exports.getBrand= async (req, res) => {

try {
    // Fetch all brands from the database
    const brands = await Brand.find();

    res.json({ brands });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getBrandbyId= async (req, res) => {

try {
    const brandId = req.params.id;

    // Fetch the brand by its ID from the database
    const brand = await Brand.findById(brandId);

    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    res.json({ brand });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateBrandbyId= async (req, res) => {
  const { id } = req.params;
const Brands = await Brand.findById(id);
if (!Brands) {
  res.status(404).json({ message: "Brand Not Found", status: 404, data: {} });
}
upload.single("image")(req, res, async (err) => {
  if (err) { return res.status(400).json({ msg: err.message }); }
  const fileUrl = req.file ? req.file.path : "";
  Brands.image = fileUrl || Brands.image;
  Brands.name = req.body.name;
  let update = await Brands.save();
  res.status(200).json({ message: "Updated Successfully", data: update });
})
};



exports.deleteBrandbyId= async (req, res) => {
console.log("hi");
try {
    const brandId = req.params.id;

    // Find the brand by ID and remove it
    const deletedBrand = await Brand.findByIdAndRemove(brandId);

    if (!deletedBrand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    res.json({ message: 'Brand deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};