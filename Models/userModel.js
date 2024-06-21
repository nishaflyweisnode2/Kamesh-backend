const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  mobileNumber: {
    type: String,
  },
  otp: {
    type: String
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  language: {
    type: String
  },
  email: {
    type: String,

  },
  password: {
    type: String,
  },
  dateOfBirth: {
    type: String,

  },
  gender: {
    type: String,

  },
  liveIn: {
    type: String,

  },
  profileImage: {
    type: String,
    default: null,
  },
  facebookurl: {
    type: String,
  },
  twiterUrl: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'vendor', 'warehouse', 'driver'],
    default: 'user',
  },
  isUsedCars: {
    type: Boolean,
    default: false
  },
  isUsedCarApprovalList: {
    type: Boolean,
    default: false
  },
  isCheckCarValuation: {
    type: Boolean,
    default: false
  },
  isNewCars: {
    type: Boolean,
    default: false
  },
  isNewsReviews: {
    type: Boolean,
    default: false
  },
  isCarReport: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isFeaturedList: {
    type: Boolean,
    default: false
  },
  isImages: {
    type: Boolean,
    default: false
  },
  isVideos: {
    type: Boolean,
    default: false
  },
  isOffers: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});


// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;