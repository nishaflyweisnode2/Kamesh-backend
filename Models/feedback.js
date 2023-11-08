const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name feedback Required"],
    },
    image: {
        type: String
    },
    rating:{
        type:Number
    }
    
});

module.exports = mongoose.model("Feedback", feedbackSchema);