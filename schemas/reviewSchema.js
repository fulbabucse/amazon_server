const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  user_image: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  reviewed_date: {
    type: String,
    required: true,
  },
  user_join_date: {
    type: String,
    required: true,
  },
  product_images: {
    type: Array,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  createAt: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = reviewSchema;
