const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  category_name: {
    type: String,
    required: true,
  },
  sub_category: {
    type: Array,
    required: true,
  },
  createAt: {
    type: Number,
    default: Date.now(),
  },
});

module.exports = categorySchema;
