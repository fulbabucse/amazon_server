const Category = require("../models/categoryModel");

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({}).sort({ createAt: 1 });
    res.send(categories);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
