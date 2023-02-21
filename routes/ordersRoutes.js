const express = require("express");
const router = express.Router();

const {
  getAllOrders,
  getOrderByUser,
  postOrders,
  updateQuantity,
  deleteProductFromCart,
} = require("../controllers/ordersController");

router.post("/", postOrders);
router.get("/", getAllOrders);
router.get("/:email", getOrderByUser);
router.patch("/update-quantity/:id", updateQuantity);
router.delete("/:id", deleteProductFromCart);

module.exports = router;
