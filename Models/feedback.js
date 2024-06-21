const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    name: {
        type: String,
    },
    query: {
        type: String,

    }, email: {
        type: String,

    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    }

});

module.exports = mongoose.model("Feedback", feedbackSchema);