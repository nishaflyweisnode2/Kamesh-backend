const mongoose = require("mongoose");
const schema = mongoose.Schema;
const FeedbackSchema = new mongoose.Schema(
    {
        couponCode: {
            type: String,
        },
        title: {
            type: String,
        },
        companyname: {
            type: String,
        },
        amount: {
            type: Number,
        },
        expirationDate: {
            type: Date,
        },
        activationDate: {
            type: Date,
        },
        status: {
            type: Boolean,
            default: false,
        },
    },
    { timeseries: true }
);
module.exports = mongoose.model("offer", FeedbackSchema);