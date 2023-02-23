const express = require("express");
const router = express.Router();

const {
  getAllOrders,
  getOrderByUser,
  postOrders,
  updateQuantity,
  deleteProductFromCart,
  postBillingAddress,
  getBillingAddress,
  deleteOrders,
} = require("../controllers/ordersController");
const authentication = require("../middleware/authentication");

router.post("/", authentication, postOrders);
router.get("/", authentication, getAllOrders);
router.get("/:email", authentication, getOrderByUser);
router.patch("/update-quantity/:id", authentication, updateQuantity);
router.delete("/:id", authentication, deleteProductFromCart);
router.delete("/after-purchase/:email", authentication, deleteOrders);

// Billing
router.post("/billings", authentication, postBillingAddress);
router.get("/billings/:email", authentication, getBillingAddress);

module.exports = router;
