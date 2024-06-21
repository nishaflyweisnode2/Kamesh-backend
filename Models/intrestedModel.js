const mongoose = require('mongoose');

const intrestedSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    name: {
        type: String,
        required: true
    },
    mobile_number: {
        type: String,
        required: true
    }
});

const Intrested = mongoose.model('Intrested', intrestedSchema);

module.exports = Intrested;
