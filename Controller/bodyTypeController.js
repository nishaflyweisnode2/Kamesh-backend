const bodyType = require("../Models/bodyTypeModel");

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

  exports.createbodyType= async (req, res) => {
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

exports.getbodyType= async (req, res) => {

try {
    // Fetch all brands from the database
    const bodyTypes = await bodyType.find();

    res.json({ bodyTypes });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getbodyTypebyId= async (req, res) => {

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

exports.updatebodyTypebyId= async (req, res) => {
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



exports.deletebodyTypebyId= async (req, res) => {
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