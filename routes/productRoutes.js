const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController");

router.get("/", productController.getProducts);
router.get("/all", productController.getAllProducts);
router.get("/all/:category", productController.getCategoryProducts);
router.get("/admin/all", productController.getAllAdminProducts);
router.get("/:id", productController.getSingleProduct);

// Review
router.post("/review", productController.postReview);
router.get("/review/:id", productController.getSingleProductReviews);

module.exports = router;
