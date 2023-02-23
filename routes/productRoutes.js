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
  getProductsByDepartment,
} = require("../controllers/productController");
const authentication = require("../middleware/authentication");

router.get("/", getProducts);
router.get("/all", getAllProducts);
router.get("/all/:category", getCategoryProducts);
router.get("/admin/all", getAllAdminProducts);
router.get("/:id", getSingleProduct);
router.get("/books/get", getBooks);
router.get("/fashions/get", getFashionProducts);
router.get("/search/get", getSearchProducts);
router.get("/dept/all/:department", getProductsByDepartment);

// Post
router.post("/book/post", authentication, postBook);

// Review
router.post("/review", authentication, postReview);
router.get("/review/:id", authentication, getSingleProductReviews);

module.exports = router;
