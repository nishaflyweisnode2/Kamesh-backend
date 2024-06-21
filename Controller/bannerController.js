const Banner = require("../Models/bannerModel");

exports.AddBanner = async (req, res) => {
  try {
    const { name } = req.params;

    let findBanner = await Banner.findOne({ name });

    if (findBanner) {
      return res.status(409).json({ message: "Banner already exists.", status: 404, data: {} });
    }
    console.log(req.file);
    if (req.file) {
      const fileUrl = req.file ? req.file.path : "";
      const data = { name, image: fileUrl };

      const banner = await Banner.create(data);
      return res
        .status(200)
        .json({
          message: "Banner added successfully.",
          status: 200,
          data: banner,
        });
    } else {
      return res.status(400).json({ msg: err.message });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      data: error.message,
    });
  }
};

exports.getBanner = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json({ success: true, banners: banners });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "internal server error ",
      data: error.message,
    });
  }
};

exports.getbannerbyId = async (req, res) => {
  try {
    const bannerId = req.params.id;

    // Fetch the brand by its ID from the database
    const banners = await Banner.findById(bannerId);

    if (!banners) {
      return res.status(404).json({ message: "banners not found" });
    }

    res.json({ banners });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.updateBanner = async (req, res) => {
  const { id } = req.params;
  const banner = await Banner.findById(id);
  if (!banner) {
    res
      .status(404)
      .json({ message: "Banner Not Found", status: 404, data: {} });
  }
  const fileUrl = req.file ? req.file.path : "";
  banner.image = fileUrl || banner.image;
  banner.name = req.body.name;
  let update = await banner.save();
  res.status(200).json({ message: "Updated Successfully", data: update });
};

exports.removeBanner = async (req, res) => {
  const { id } = req.params;
  const banner = await Banner.findById(id);
  if (!banner) {
    res
      .status(404)
      .json({ message: "Banner Not Found", status: 404, data: {} });
  } else {
    await Banner.findByIdAndDelete(banner._id);
    res.status(200).json({ message: "Banner Deleted Successfully !" });
  }
};
