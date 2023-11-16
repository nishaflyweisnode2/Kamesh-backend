const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: [true, "name feedback Required"],
    },
    // image: {
    //     type: String
    // },
    // rating:{
    //     type:Number
    // }
    query: {
        type: String,
      
    },email: {
        type: String,
      
    },
    
});

module.exports = mongoose.model("Feedback", feedbackSchema);