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

router.post("/", postOrders);
router.get("/", getAllOrders);
router.get("/:email", getOrderByUser);
router.patch("/update-quantity/:id", updateQuantity);
router.delete("/:id", deleteProductFromCart);
router.delete("/after-purchase/:email", deleteOrders);

// Billing
router.post("/billings", postBillingAddress);
router.get("/billings/:email", getBillingAddress);

module.exports = router;
