// Import
const express = require("express");
const router = express.Router();

// Controller
const { getCategories } = require("../controllers/categoryController");

// Category Routes
router.get("/", getCategories);

// Export router
module.exports = router;
