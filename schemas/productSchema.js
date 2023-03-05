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
  age: {
    type: String,
    required: false,
  },
  capacity: {
    type: String,
    required: false,
  },
  color: {
    type: String,
    required: false,
  },
  compatible_device: {
    type: String,
    required: false,
  },
  connectivity_tech: {
    type: String,
    required: false,
  },
  connector_type: {
    type: String,
    required: false,
  },
  graphics_coprocessor: {
    type: String,
    required: false,
  },
  hd_interface: {
    type: String,
    required: false,
  },
  item_weight: {
    type: String,
    required: false,
  },
  material_dimension: {
    type: String,
    required: false,
  },
  materials: {
    type: String,
    required: false,
  },
  model: {
    type: String,
    required: false,
  },
  os: {
    type: String,
    required: false,
  },
  power_source: {
    type: String,
    required: false,
  },
  printing_tech: {
    type: String,
    required: false,
  },
  ram: {
    type: Number,
    required: false,
  },
  refresh_rate: {
    type: String,
    required: false,
  },
  resolution: {
    type: String,
    required: false,
  },
  screen_size: {
    type: String,
    required: false,
  },
  special_features: {
    type: String,
    required: false,
  },
  style: {
    type: String,
    required: false,
  },
  theme: {
    type: String,
    required: false,
  },
  voltage: {
    type: String,
    required: false,
  },
  createAt: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
// 40
