const VideoBanner = require('../Models/videoModel')
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
// const cloudinary = require('cloudinary').v2;
const videoPattern = "[^\\s]+(.*?)\\.(mp4|avi|mov|flv|wmv)$";
// const imagePattern = "[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$";
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dtijhcmaa",
  api_key: "624644714628939",
  api_secret: "tU52wM1-XoaFD2NrHbPrkiVKZvY",
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

exports.AddVideoBanner = async (req, res) => {
upload.single("video")(req, res, async (err) => {
  if (err) { return res.status(400).json({ msg: err.message }); }
  // console.log(req.file);
  const fileUrl = req.file ? req.file.path : "";
  const data = { name: req.body.name, video: fileUrl };
  const blog = await VideoBanner.create(data);
  res.status(200).json({ message: "VideoBanner added successfully.", status: 200, data: blog });
})
}


// Update Video Banner ----- Admin
  exports.updateById = catchAsyncErrors(async (req, res) => {
    try {
        const { id } = req.params;
    
        // Check if the video banner exists
        const videoBanner = await VideoBanner.findById(id);
    
        if (!videoBanner) {
          return res.status(404).json({ message: 'Video banner not found' });
        }
    
        // Check if a file was uploaded
        if (!req.file) {
          return res.status(400).json({ message: 'No file uploaded' });
        }
    
        // Update the video file
        videoBanner.video = req.file.path;
    
        // Save the updated video banner
        await videoBanner.save();
    
        return res.status(200).json({ message: 'Video banner video updated successfully', data: videoBanner });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    });

  // Get the Video Banner
  exports.getVideoBanner = catchAsyncErrors(async (req, res) => {
    try {
      const videoBanners = await VideoBanner.find();
      res.json({ videoBanners });
    } catch (error) {
      console.error('Failed to fetch video banners:', error);
      res.status(500).json({ error: 'Failed to fetch video banners.' });
    }
  });


  //Delete the Video Banner
  exports.DeleteVideoBanner = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;

  try {
    const videoBanner = await VideoBanner.findById(id);

   
    await videoBanner.deleteOne();

    res.json({ message: 'Video banner deleted successfully.' });
  } catch (error) {
    console.error('Failed to delete video banner:', error);
    res.status(500).json({ error: 'Failed to delete video banner.' });
  }
});


exports.getVideoData = async (req, res) => {
  try {
    const videoTypes = await Car.aggregate([
      { $group: { _id: { name: "$video_link" } } }
    ]);

    const videoData = videoTypes.map(brand => ({
      name: brand._id.name
    }));

    const existingBrands = await Transmission.find({ name: { $in: videoData.map(brand => brand.name) } });
    const newBody = videoData.filter(brand => !existingBrands.some(existingBrand => existingBrand.name === brand.name));

    await Transmission.insertMany(newBody);

    res.status(200).json({ status: 200, data: { videoTypes: newBody } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};