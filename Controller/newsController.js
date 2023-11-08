const News = require("../Models/newsModel");

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

  exports.createNews= async (req, res) => {
    console.log("hi");
    try {
        let findNews = await News.findOne({ content: req.body.content });
        console.log(req.body.content)
        if (findNews) {
          res.status(409).json({ message: "News already exit.", status: 404, data: {} });
        } else {
          upload.single("image")(req, res, async (err) => {
            if (err) { return res.status(400).json({ msg: err.message }); }
            const fileUrl = req.file ? req.file.path : "";
            const data = { content: req.body.content, image: fileUrl };
            const news = await News.create(data);
            res.status(200).json({ message: "News add successfully.", status: 200, data: news });
          })
        }
    
      } catch (error) {
        res.status(500).json({ status: 500, message: "internal server error ", data: error.message, });
      }
    };

exports.getNews= async (req, res) => {

try {
    // Fetch all brands from the database
    const news = await News.find();

    res.json({ news });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getNewsbyId= async (req, res) => {

try {
    const newsId = req.params.id;

    // Fetch the brand by its ID from the database
    const news = await News.findById(newsId);

    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    res.json({ news });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateNewsbyId= async (req, res) => {
  const { id } = req.params;
const news = await News.findById(id);
if (!news) {
  res.status(404).json({ message: "News Not Found", status: 404, data: {} });
}
upload.single("image")(req, res, async (err) => {
  if (err) { return res.status(400).json({ msg: err.message }); }
  const fileUrl = req.file ? req.file.path : "";
  news.image = fileUrl || news.image;
  news.content = req.body.content;
  let update = await news.save();
  res.status(200).json({ message: "Updated Successfully", data: update });
})
};



exports.deleteNewsbyId= async (req, res) => {
console.log("hi");
try {
    const NewsId = req.params.id;

    // Find the brand by ID and remove it
    const deletedNews = await News.findByIdAndRemove(NewsId);

    if (!deletedNews) {
      return res.status(404).json({ message: 'News not found' });
    }

    res.json({ message: 'News deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};