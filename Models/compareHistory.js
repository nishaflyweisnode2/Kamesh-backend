// models/CompareHistory.js

const mongoose = require('mongoose');

const compareHistorySchema = new mongoose.Schema({
  car1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true,
  },
  car2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true,
  },
  count: {
    type: Number,
    default: 1,
  },
});

const CompareHistory = mongoose.model('CompareHistory', compareHistorySchema);

module.exports = CompareHistory;
