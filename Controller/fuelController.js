const Fuel = require("../Models/fuelModel");
const Car = require("../Models/carModel");

const express = require('express');
const router = express.Router();
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

  exports.createFuel= async (req, res) => {
    try {
        let findFuel = await Fuel.findOne({ name: req.body.name });
        console.log(req.body.name)
        if (findFuel) {
          res.status(409).json({ message: "Fuel already exit.", status: 404, data: {} });
        } else {
          upload.single("image")(req, res, async (err) => {
            if (err) { return res.status(400).json({ msg: err.message }); }
            const fileUrl = req.file ? req.file.path : "";
            const data = { name: req.body.name, image: fileUrl };
            const Fuels = await Fuel.create(data);
            res.status(200).json({ message: "Fuel add successfully.", status: 200, data: Fuels });
          })
        }
    
      } catch (error) {
        res.status(500).json({ status: 500, message: "internal server error ", data: error.message, });
      }
    };


exports.getFuel= async (req, res) => {

try {
    // Fetch all brands from the database
    const Fuels = await Fuel.find();

    res.json({ Fuels });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getFuelbyId= async (req, res) => {

try {
    const FuelId = req.params.id;

    // Fetch the brand by its ID from the database
    const Fuels = await Fuel.findById(FuelId);

    if (!Fuels) {
      return res.status(404).json({ message: 'Fuel not found' });
    }

    res.json({ Fuels });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateFuelbyId= async (req, res) => {
  const { id } = req.params;
const Fuels = await Fuel.findById(id);
if (!Fuels) {
  res.status(404).json({ message: "Fuel Not Found", status: 404, data: {} });
}
upload.single("image")(req, res, async (err) => {
  if (err) { return res.status(400).json({ msg: err.message }); }
  const fileUrl = req.file ? req.file.path : "";
  Fuels.image = fileUrl || Fuels.image;
  Fuels.name = req.body.name;
  let update = await Fuels.save();
  res.status(200).json({ message: "Updated Successfully", data: update });
})
};


exports.deleteFuelbyId= async (req, res) => {
console.log("hi2");
try {
    const FuelId = req.params.id;

    // Find the brand by ID and remove it
    const deletedFuel = await Fuel.findByIdAndRemove(FuelId);

    if (!deletedFuel) {
      return res.status(404).json({ message: 'Fuel not found' });
    }

    res.json({ message: 'Fuel deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getFuelData = async (req, res) => {
  try {
    const fuelTypes = await Car.aggregate([
      { $group: { _id: { name: "$fuelType" } } }
    ]);

    const fuelData = fuelTypes.map(brand => ({
      name: brand._id.name
    }));

    const existingBrands = await Fuel.find({ name: { $in: fuelData.map(brand => brand.name) } });
    const newBody = fuelData.filter(brand => !existingBrands.some(existingBrand => existingBrand.name === brand.name));

    await Fuel.insertMany(newBody);

    res.status(200).json({ status: 200, data: { fuelTypes: newBody } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};