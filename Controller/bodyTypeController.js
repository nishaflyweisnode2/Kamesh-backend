const bodyType = require("../Models/bodyTypeModel");
const Car = require("../Models/carModel");
const City = require("../Models/cityModel");
const DisplayName = require("../Models/displaynameModel");

const express = require('express');
const router = express.Router();
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

exports.createbodyType = async (req, res) => {
  try {
    let findbodyTypes = await bodyType.findOne({ name: req.body.name });
    console.log(req.body.name)
    if (findbodyTypes) {
      res.status(409).json({ message: "bodyType already exit.", status: 404, data: {} });
    } else {
      upload.single("image")(req, res, async (err) => {
        if (err) { return res.status(400).json({ msg: err.message }); }
        const fileUrl = req.file ? req.file.path : "";
        const data = { name: req.body.name, image: fileUrl };
        const bodyTypes = await bodyType.create(data);
        res.status(200).json({ message: "bodyType add successfully.", status: 200, data: bodyTypes });
      })
    }

  } catch (error) {
    res.status(500).json({ status: 500, message: "internal server error ", data: error.message, });
  }
};

exports.getbodyType = async (req, res) => {

  try {
    // Fetch all brands from the database
    const bodyTypes = await bodyType.find();

    res.json({ bodyTypes });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getbodyTypebyId = async (req, res) => {

  try {
    const bodyTypeId = req.params.id;

    // Fetch the brand by its ID from the database
    const bodyTypes = await bodyType.findById(bodyTypeId);

    if (!bodyTypes) {
      return res.status(404).json({ message: 'bodyType not found' });
    }

    res.json({ bodyTypes });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updatebodyTypebyId = async (req, res) => {
  const { id } = req.params;
  const bodyTypes = await bodyType.findById(id);
  if (!bodyTypes) {
    res.status(404).json({ message: "bodyType Not Found", status: 404, data: {} });
  }
  upload.single("image")(req, res, async (err) => {
    if (err) { return res.status(400).json({ msg: err.message }); }
    const fileUrl = req.file ? req.file.path : "";
    bodyTypes.image = fileUrl || bodyTypes.image;
    bodyTypes.name = req.body.name;
    let update = await bodyTypes.save();
    res.status(200).json({ message: "Updated Successfully", data: update });
  })
};

exports.deletebodyTypebyId = async (req, res) => {
  console.log("hi");
  try {
    const bodyTypeId = req.params.id;

    // Find the brand by ID and remove it
    const deletedbodyTypes = await bodyType.findByIdAndRemove(bodyTypeId);

    if (!deletedbodyTypes) {
      return res.status(404).json({ message: 'bodyTypes not found' });
    }

    res.json({ message: 'bodyTypes deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getBodyData = async (req, res) => {
  try {
    const bodyTypes = await Car.aggregate([
      { $group: { _id: { name: "$bodyType" } } }
    ]);

    const bodyData = bodyTypes.map(brand => ({
      name: brand._id.name
    }));

    const existingBrands = await bodyType.find({ name: { $in: bodyData.map(brand => brand.name) } });
    const newBody = bodyData.filter(brand => !existingBrands.some(existingBrand => existingBrand.name === brand.name));

    await bodyType.insertMany(newBody);

    res.status(200).json({ status: 200, data: { bodyType: newBody } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getAllCity = async (req, res) => {

  try {
    // Fetch all brands from the database
    const bodyTypes = await City.find();

    res.json({ data: bodyTypes });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getCitybyId = async (req, res) => {

  try {
    const CityId = req.params.id;

    // Fetch the brand by its ID from the database
    const bodyTypes = await City.findById(CityId);

    if (!bodyTypes) {
      return res.status(404).json({ message: 'bodyType not found' });
    }

    res.json({ data: bodyTypes });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getCityData = async (req, res) => {
  try {
    const cityDatas = await Car.aggregate([
      { $group: { _id: { name: "$Location" } } }
    ]);
    const cityData = cityDatas.map(city => ({
      name: city._id.name
    }));

    const existingCity = await City.find({ name: { $in: cityData.map(city => city.name) } });

    const newBody = cityData.filter(city => !existingCity.some(existingCity => existingCity.name === city.name));

    if (newBody.length > 0) {
      await City.insertMany(newBody);
    }

    res.status(200).json({ status: 200, data: { City: newBody } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getAllDisplayName = async (req, res) => {

  try {
    // Fetch all brands from the database
    const bodyTypes = await DisplayName.find();

    res.json({ data: bodyTypes });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getDisplayNamebyId = async (req, res) => {

  try {
    const DisplayNameId = req.params.id;

    // Fetch the brand by its ID from the database
    const bodyTypes = await DisplayName.findById(DisplayNameId);

    if (!bodyTypes) {
      return res.status(404).json({ message: 'bodyType not found' });
    }

    res.json({ data: bodyTypes });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getDisplayNameData = async (req, res) => {
  try {
    const cityDatas = await Car.aggregate([
      { $group: { _id: { name: "$ModelName", Brand_name: "$Brand_name", car_images: "$car_images" } } }

    ]);
    const cityData = cityDatas.map(city => ({
      name: city._id.name,
      brandName: city._id.Brand_name,
      carImages: city._id.car_images
    }));

    const existingCity = await DisplayName.find({ name: { $in: cityData.map(city => city.name) } });

    const newBody = cityData.filter(city => !existingCity.some(existingCity => existingCity.name === city.name));

    if (newBody.length > 0) {
      await DisplayName.insertMany(newBody);
    }

    res.status(200).json({ status: 200, data: { DisplayName: newBody } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.displayNameSearch = async (req, res) => {
  try {
    const { brandName } = req.query;

    if (!brandName) {
      return res.status(400).send({ error: 'Brand name is required' });
    }

    const results = await DisplayName.find({ brandName: new RegExp(brandName, 'i') });
    res.json(results);
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while searching' });
  }
};