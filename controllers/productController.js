const Product = require("../models/productsModel");
const Review = require("../models/reviewModel");

// Example Route: http://localhost:5000/products?start=${start}&end=${end}&page=${page}&size=${size}&rating=${rating}
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
      .limit(size)
      .sort({ createAt: -1 });
    const count = await Product.estimatedDocumentCount();
    res.status(200).send({ products, count });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Example Route: http://localhost:5000/products/admin/all?page=${page}&size=${size}
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

// Example Route: http://localhost:5000/products/all
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}).sort({ createAt: -1 });
    res.send(products);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Example Route: http://localhost:5000/products/${id}
exports.getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    res.send(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Example Route: http://localhost:5000/products/all/${category}}
exports.getCategoryProducts = async (req, res, next) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category });
    res.send(products);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Example Route: http://localhost:5000/products/book/post
exports.postBook = async (req, res, next) => {
  try {
    const data = req.body;
    const product = new Product({
      title: data.title,
      description: data.description,
      price: parseInt(data.price),
      discountPercentage: parseFloat(data.discountPercentage),
      rating: parseFloat(data.rating),
      stock: parseInt(data.stock),
      category: data.category,
      thumbnail: data.images[0],
      images: data.images,
      author: req.body.author,
      book_page_length: parseInt(data.book_page_length),
      language: data.language,
      publication_date: data.publication_date,
      paper_type: data.paper_type,
      department: data.department,
      isbn: data.isbn,
    });
    const saveBook = await product.save();
    res.status(200).send(saveBook);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Example Route: http://localhost:5000/products/books/get
exports.getBooks = async (req, res, next) => {
  try {
    const books = await Product.find({ category: "books" });
    res.send(books);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Example Route: http://localhost:5000/products/fashions/get
exports.getFashionProducts = async (req, res, next) => {
  try {
    const fashions = await Product.find({ department: "fashions" });
    res.status(200).send(fashions);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Review

// Example Route: http://localhost:5000/products/review
exports.postReview = async (req, res, next) => {
  try {
    const reviews = new Review({
      name: req.body.name,
      productId: req.body.productId,
      email: req.body.email,
      user_image: req.body.image,
      message: req.body.message,
      reviewed_date: req.body.reviewed_date,
      user_join_date: req.body.join_date,
      product_images: req.body.images,
      rating: parseFloat(req.body.rating),
    });
    const result = await reviews.save();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Example Route: http://localhost:5000/products/review/${id}
exports.getSingleProductReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ productId: req.params.id }).sort({
      createAt: -1,
    });
    res.status(200).send(reviews);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Example Route: http://localhost:5000/products/search/get?dept=${dept}&key=${key}
exports.getSearchProducts = async (req, res, next) => {
  try {
    const { dept, key } = req.query;
    const title = RegExp(key, "i");
    const department = RegExp(dept, "i");
    const products = await Product.find({ $or: [{ title }, { department }] });
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Example Route: http://localhost:5000/products/dept/all/${department}
exports.getProductsByDepartment = async (req, res, next) => {
  try {
    const { department } = req.params;
    const products = await Product.find({ department });
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
