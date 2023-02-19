const express = require("express");
const router = express.Router();

const ordersController = require("../controllers/ordersController");

router.post("/", ordersController.postOrders);
router.get("/", ordersController.getAllOrders);
router.get("/:email", ordersController.getOrderByUser);
router.patch("/update-quantity/:id", ordersController.updateQuantity);

module.exports = router;
