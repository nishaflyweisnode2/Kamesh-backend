const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    type:{
        type:String,
        enum: ['General', 'Recommended',],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);