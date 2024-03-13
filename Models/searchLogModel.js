const mongoose = require('mongoose');

const searchLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
    },
    searchQuery: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const SearchLog = mongoose.model('SearchLog', searchLogSchema);

module.exports = SearchLog;
