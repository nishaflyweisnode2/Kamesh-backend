const mongoose = require('mongoose');

const displayNameSchema = new mongoose.Schema({
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