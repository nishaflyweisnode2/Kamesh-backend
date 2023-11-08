const Transmission = require("../Models/transmissionModel");

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

  exports.createTransmission= async (req, res) => {
    try {
        let findTransmission = await Transmission.findOne({ name: req.body.name });
        console.log(req.body.name)
        if (findTransmission) {
          res.status(409).json({ message: "Transmission already exit.", status: 404, data: {} });
        } else {
          upload.single("image")(req, res, async (err) => {
            if (err) { return res.status(400).json({ msg: err.message }); }
            const fileUrl = req.file ? req.file.path : "";
            const data = { name: req.body.name, image: fileUrl };
            const Transmissions = await Transmission.create(data);
            res.status(200).json({ message: "Transmission add successfully.", status: 200, data: Transmissions });
          })
        }
    
      } catch (error) {
        res.status(500).json({ status: 500, message: "internal server error ", data: error.message, });
      }
    };


exports.getTransmission= async (req, res) => {

try {
    // Fetch all brands from the database
    const Transmissions = await Transmission.find();

    res.json({ Transmissions });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getTransmissionbyId= async (req, res) => {

try {
    const TransmissionId = req.params.id;

    // Fetch the brand by its ID from the database
    const Transmissions = await Transmission.findById(TransmissionId);

    if (!Transmissions) {
      return res.status(404).json({ message: 'Transmission not found' });
    }

    res.json({ Transmissions });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateTransmissionbyId= async (req, res) => {
    const { id } = req.params;
  const Transmissions = await Transmission.findById(id);
  if (!Transmissions) {
    res.status(404).json({ message: "Transmission Not Found", status: 404, data: {} });
  }
  upload.single("image")(req, res, async (err) => {
    if (err) { return res.status(400).json({ msg: err.message }); }
    const fileUrl = req.file ? req.file.path : "";
    Transmissions.image = fileUrl || Transmissions.image;
    Transmissions.name = req.body.name;
    let update = await Transmissions.save();
    res.status(200).json({ message: "Updated Successfully", data: update });
  })
};



exports.deleteTransmissionbyId= async (req, res) => {
console.log("hi2");
try {
    const TransmissionId = req.params.id;

    // Find the brand by ID and remove it
    const deletedTransmission = await Transmission.findByIdAndRemove(TransmissionId);

    if (!deletedTransmission) {
      return res.status(404).json({ message: 'Transmission not found' });
    }

    res.json({ message: 'Transmission deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};