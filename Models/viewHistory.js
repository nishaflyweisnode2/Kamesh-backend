const mongoose = require('mongoose');

const viewHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sell',
    required: true,
  },
  viewedAt: {
    type: Date,
    default: Date.now,
  },
});

const ViewHistory = mongoose.model('ViewHistory', viewHistorySchema);

module.exports = ViewHistory;
