const News = require("../Models/newsModel");

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

exports.createNews = async (req, res) => {
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
        const data = { content: req.body.content, title: req.body.title, image: fileUrl };
        const news = await News.create(data);
        res.status(200).json({ message: "News add successfully.", status: 200, data: news });
      })
    }

  } catch (error) {
    res.status(500).json({ status: 500, message: "internal server error ", data: error.message, });
  }
};

exports.getNews = async (req, res) => {

  try {
    // Fetch all brands from the database
    const news = await News.find();

    res.json({ news });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
exports.getNewsbyId = async (req, res) => {
  try {
    const newsId = req.params.id;

    // Fetch the news by its ID from the database
    const news = await News.findById(newsId);

    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    // Increase the read count by 1
    news.readCount += 1;

    // Save the updated news with the increased read count
    await news.save();

    res.json({ news });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateNewsbyId = async (req, res) => {
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



exports.deleteNewsbyId = async (req, res) => {
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

exports.getMostReadNews = async (req, res) => {
  try {
    // Fetch the most read news articles, limit to 5 for example
    const mostReadNews = await News.find()
      .sort({ readCount: -1 }) // Sort in descending order based on readCount


    res.status(200).json({ success: true, mostReadNews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.getRecentNews = async (req, res) => {
  try {
    // Fetch the most recent news articles, limit to 5 for example
    const recentNews = await News.find()
      .sort({ createdAt: -1 }) // Sort in descending order based on createdAt
      .limit(5); // Limit the results to the top 5 most recent news

    res.status(200).json({ success: true, recentNews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};