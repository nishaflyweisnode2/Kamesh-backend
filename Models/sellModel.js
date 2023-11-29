const mongoose = require("mongoose");

const sellSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name Sell Required"],
  },
  images: {
    type: [String],
    required: true,
  },
  pincode: {
    type: String,
    required: [true, "name Sell Required"],
  },
  carDate: {
    type: String,
    required: [true, "name Sell Required"],
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
    required: true,
  },
  fueltype: {
    type: String,
    required: [true, "name Sell Required"],
  },
  type: {
    type: String,
    enum: ['popular'],
  },
  
  variant: {
    type: String,
    required: [true, "name Sell Required"],
  },
  ownerType: {
    type: String,
    required: [true, "name Sell Required"],
  },
  kmDriven: {
    type: String,
    required: [true, "name Sell Required"],
  },
  priceRange: {
    type: String,
    required: [true, "name Sell Required"],
  },
  mobile: {
    type: String,
    required: [true, "number  Required"],
  },
});

module.exports = mongoose.model("Sell", sellSchema);
