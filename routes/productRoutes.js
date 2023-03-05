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
  postProduct,
  postReview,
  getFashionProducts,
  getSearchProducts,
  getProductsByDepartment,
  deleteProduct,
} = require("../controllers/productController");
const authentication = require("../middleware/authentication");

router.get("/", getProducts);
router.get("/all", getAllProducts);
router.get("/all/:category", getCategoryProducts);
router.get("/admin/all", getAllAdminProducts);
router.get("/:id", getSingleProduct);
router.delete("/:id", deleteProduct);
router.get("/books/get", getBooks);
router.get("/fashions/get", getFashionProducts);
router.get("/search/get", getSearchProducts);
router.get("/dept/all/:department", getProductsByDepartment);

// Post
router.post("/product/post", authentication, postProduct);

// Review
router.post("/review", authentication, postReview);
router.get("/review/:id", authentication, getSingleProductReviews);

module.exports = router;
