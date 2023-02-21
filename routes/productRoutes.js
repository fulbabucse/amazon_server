const express = require("express");

const router = express.Router();

const {
  getAllAdminProducts,
  getAllProducts,
  getBooks,
  getCategoryProducts,
  getProducts,
  getSingleProduct,
  getSingleProductReviews,
  postBook,
  postReview,
  getFashionProducts,
  getSearchProducts,
} = require("../controllers/productController");

router.get("/", getProducts);
router.get("/all", getAllProducts);
router.get("/all/:category", getCategoryProducts);
router.get("/admin/all", getAllAdminProducts);
router.get("/:id", getSingleProduct);
router.get("/books/get", getBooks);
router.get("/fashions/get", getFashionProducts);
router.get("/search/get", getSearchProducts);

// Post
router.post("/book/post", postBook);

// Review
router.post("/review", postReview);
router.get("/review/:id", getSingleProductReviews);

module.exports = router;
