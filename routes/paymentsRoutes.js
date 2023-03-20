const express = require("express");
const router = express.Router();

const {
  createPaymentSession,
  getOrdersByEmail,
} = require("../controllers/paymentController");
const authentication = require("../middleware/authentication");

router.post("/create-checkout-session", authentication, createPaymentSession);
router.get("/completed-orders", authentication, getOrdersByEmail);

module.exports = router;
