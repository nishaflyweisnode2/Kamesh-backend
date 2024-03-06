const Brand = require("../Models/brandModel");
const Car = require("../Models/carModel");

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

exports.createBrand = async (req, res) => {
  console.log("new");
  try {
    let findBrand = await Brand.findOne({ name: req.params.name });
    console.log(req.params.name)
    if (findBrand) {
      res.status(409).json({ message: "Brand already exit.", status: 404, data: {} });
    } else {
      upload.single("image")(req, res, async (err) => {
        if (err) { return res.status(400).json({ msg: err.message }); }
        const fileUrl = req.file ? req.file.path : "";
        const data = { name: req.params.name, image: fileUrl };
        const Brands = await Brand.create(data);
        res.status(200).json({ message: "Brand add successfully.", status: 200, data: Brands });
      })
    }

  } catch (error) {
    res.status(500).json({ status: 500, message: "internal server error ", data: error.message, });
  }
};

exports.getBrand = async (req, res) => {

  try {
    const brands = await Brand.find();

    res.json({ brands });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getBrandName = async (req, res) => {
  try {
    const brandName = await Car.distinct('Brand_name');
    const brandLink = await Car.distinct('Brand_link');
    const bodyType = await Car.distinct('bodyType');
    const fuelType = await Car.distinct('fuelType');

    const data = { name: brandName, image: brandLink };
    const Brands = await Brand.create(data);
    res.json({ status: 200, brandName, brandLink, bodyType, fuelType });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getBrandData = async (req, res) => {
  try {
    const distinctBrands = await Car.aggregate([
      { $group: { _id: { name: "$Brand_name", link: "$Brand_link" } } }
    ]);

    const brandData = distinctBrands.map(brand => ({
      name: brand._id.name,
      image: brand._id.link
    }));

    const existingBrands = await Brand.find({ name: { $in: brandData.map(brand => brand.name) } });
    const newBrands = brandData.filter(brand => !existingBrands.some(existingBrand => existingBrand.name === brand.name));

    await Brand.insertMany(newBrands);

    res.status(200).json({ status: 200, data: { brands: newBrands } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


exports.getBrandLink = async (req, res) => {
  try {
    const brands = await Car.distinct('Brand_link');

    res.json({ brands });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


exports.getBrandbyId = async (req, res) => {

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

exports.updateBrandbyId = async (req, res) => {
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



exports.deleteBrandbyId = async (req, res) => {
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