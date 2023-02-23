// Category Model
const Category = require("../models/categoryModel");

// Example Route: http://localhost:5000/categories
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({}).sort({ createAt: 1 });
    res.send(categories);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
