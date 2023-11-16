const Feedback = require('../Models/feedback')
require('dotenv').config();

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
exports.addFeedback = async (req, res) => {
  try {
    const { name,query,email } = req.body;
    // Create a feedback entry
    const feedback = await Feedback.create({name,query,email});

    res.status(201).json({ success: true, message: 'Feedback submitted successfully', feedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.getFeedback = async (req, res) => {
  try {
    const Feedbacks = await Feedback.find();
    res.status(200).json({ success: true, Feedbacks: Feedbacks });

  } catch (error) {
    res.status(500).json({ status: 500, message: "internal server error ", data: error.message, });
  }
};


exports.getfeedbackbyId= async (req, res) => {

    try {
        const feedbackId = req.params.id;
    
        // Fetch the brand by its ID from the database
        const feedbacks = await Feedback.findById(feedbackId);
    
        if (!feedbacks) {
          return res.status(404).json({ message: 'feedback not found' });
        }
    
        res.json({ feedbacks });
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    };
    
exports.updatefeedback = async (req, res) => {
  const { id } = req.params;
  const Feedbacks = await Feedback.findById(id);
  if (!Feedbacks) {
    res.status(404).json({ message: "Feedbacks Not Found", status: 404, data: {} });
  }
  upload.single("image")(req, res, async (err) => {
    if (err) { return res.status(400).json({ msg: err.message }); }
    const fileUrl = req.file ? req.file.path : "";
    Feedbacks.image = fileUrl || banner.image;
    Feedbacks.name = req.body.name;
    Feedbacks.rating = req.body.rating;

    let update = await Feedbacks.save();
    res.status(200).json({ message: "Updated Successfully", data: update });
  })
};

exports.removefeedback = async (req, res) => {
  const { id } = req.params;
  const feedback = await Feedback.findById(id);
  if (!feedback) {
    res.status(404).json({ message: "feedback Not Found", status: 404, data: {} });
  } else {
    await Feedback.findByIdAndDelete(feedback._id);
    res.status(200).json({ message: "feedback Deleted Successfully !" });
  }
};