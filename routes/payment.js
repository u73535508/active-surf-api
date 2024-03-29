const express = require("express");
const router = express.Router();
const {
  savePayment,
  getPaymentsInRange,
  deletePayment,
  getPaymentsForService,
} = require("../controllers/payment");
const { isAuthenticated } = require("../middleware/auth");

router.post("/payment/savePayment", isAuthenticated, savePayment);
router.get("/payment/getPaymentsInRange", isAuthenticated, getPaymentsInRange);
router.delete("/payment/deletePayment/:id", isAuthenticated, deletePayment);
router.get(
  "/payment/getPaymentsForService/:serviceId",
  isAuthenticated,
  getPaymentsForService
);
module.exports = router;
