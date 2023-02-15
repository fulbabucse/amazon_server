const Product = require("../models/productsModel");

exports.getProducts = async (req, res, next) => {
  try {
    const start = parseInt(req.query.start);
    const end = parseInt(req.query.end);
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);
    const rating = parseInt(req.query.rating);

    const products = await Product.find({
      price: { $gt: start, $lt: end },
      rating: { $gt: rating },
    })
      .skip(page * size)
      .limit(size);
    const count = await Product.estimatedDocumentCount();
    res.status(200).send({ products, count });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getAllAdminProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);

    const products = await Product.find({})
      .skip(page * size)
      .limit(size)
      .sort({ createAt: -1 });
    const count = await Product.estimatedDocumentCount();
    res.status(200).send({ products, count });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
exports.getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    res.send(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getCategoryProducts = async (req, res, next) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category });
    res.send(products);
    // }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
