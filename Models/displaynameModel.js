const mongoose = require('mongoose');

const displayNameSchema = new mongoose.Schema({
    brandName: {
        type: String,
    },
    carImages: [{
        url: String,
    }],
    name: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true
    },
});


const displayName = mongoose.model('DisplayName', displayNameSchema);

module.exports = displayName;