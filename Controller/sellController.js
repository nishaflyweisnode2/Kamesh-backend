const Sell = require("../Models/sellModel");
const ViewHistory = require("../Models/viewHistory");



const imagePattern = "[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$";
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { loginAdmin } = require("./userController");
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


exports.AddSell = async (req, res) => {
  const { name } = req.body;

  try {
    upload.array("image")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ msg: err.message });
      }

      let images = [];
      for (let i = 0; i < req.files.length; i++) {
        images.push(req.files[i] ? req.files[i].path : "");
      }

      const data = {
        ...req.body,
        images,
      };

      const product = await Sell.create(data);
      return res.status(200).json({ message: "Product added successfully.", status: 200, data: product });
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error", data: error.message });
  }

};

exports.getSell = async (req, res) => {
  try {
    const Sells = await Sell.find().populate("brand");
    res.status(200).json({ success: true, Sells: Sells });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "internal server error ",
      data: error.message,
    });
  }
};

exports.getSellById = async (req, res) => {
  const sellId = req.params.id;

  try {
    const sell = await Sell.findById(sellId).populate('brand');

    if (!sell) {
      return res.status(404).json({ success: false, message: 'Sell not found' });
    }

    // Check if the user is logged in
    if (req.user) {
      // Save the viewed product to the user's view history
      const viewHistory = new ViewHistory({
        user: req.user._id,
        car: sellId,
      });

      await viewHistory.save();
    }

    res.status(200).json({ success: true, sell: sell });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
      data: error.message,
    });
  }
};

exports.getUserViewHistory = async (req, res) => {
  try {
    const viewHistory = await ViewHistory.find({ user: req.user.id })
      .populate('car');


    res.status(200).json({ success: true, viewHistory: viewHistory });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
      data: error.message,
    });
  }
};

exports.getSellsByBrandId = async (req, res) => {
  const brandId = req.params.brandId;

  try {
    const sells = await Sell.find({ brand: brandId }).populate("brand");

    if (sells.length === 0) {
      return res.status(404).json({ success: false, message: 'No sells found for the given brand ID' });
    }

    res.status(200).json({ success: true, sells: sells });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
      data: error.message,
    });
  }
};

exports.makePopular = async (req, res) => {

  const { productId } = req.params;

  try {
    // Find the product by ID
    const product = await Sell.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update the product type to "popular"
    product.type = 'popular';

    // Save the updated product
    await product.save();

    res.status(200).json({ message: 'Product type set to popular', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getPopular = async (req, res) => {

  try {
    // Find products with type "popular"
    const popularProducts = await Sell.find({ type: 'popular' });

    res.status(200).json({ success: true, popularProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.removeSell = async (req, res) => {
  const { id } = req.params;
  const Sells = await Sell.findById(id);
  if (!Sells) {
    res
      .status(404)
      .json({ message: "Sell Not Found", status: 404, data: {} });
  } else {
    await Sell.findByIdAndDelete(Sells._id);
    res.status(200).json({ message: "Sell Deleted Successfully !" });
  }
};
