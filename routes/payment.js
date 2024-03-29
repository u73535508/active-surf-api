const express = require("express");
const router = express.Router();
const {
  savePayment,
  getPaymentsInRange,
  deletePayment,
  getPaymentsForService,
} = require("../controllers/payment");
const { isAuthenticated } = require("../middleware/auth");

router.post("/payment/savePayment", savePayment);
router.get("/payment/getPaymentsInRange", getPaymentsInRange);
router.delete("/payment/deletePayment/:id", deletePayment);
router.get(
  "/payment/getPaymentsForService/:serviceId",

  getPaymentsForService
);
module.exports = router;
