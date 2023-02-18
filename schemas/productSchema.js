const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
    required: false,
  },
  rating: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  author: {
    type: String,
    required: false,
  },
  book_page_length: {
    type: Number,
    required: false,
  },
  language: {
    type: String,
    required: false,
  },
  publication_date: {
    type: String,
    required: false,
  },
  paper_type: {
    type: String,
    required: false,
  },
  department: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: false,
  },
  createAt: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = productSchema;
