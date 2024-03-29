const express = require("express");
const {
  getDebtsForMember,
  saveDebt,
  getAllDebts,
  deleteDebt,
  getDebtsInRange,
} = require("../controllers/debt");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();
router.get("/debt/getDebtsInRange", isAuthenticated, getDebtsInRange);
router.get("/debt/getAllDebts", isAuthenticated, getAllDebts);
router.get(
  "/debt/getDebtsForMember/:memberId",
  isAuthenticated,
  getDebtsForMember
);
router.post("/debt/saveDebt", isAuthenticated, saveDebt);
router.delete("/debt/deleteDebt/:id", isAuthenticated, deleteDebt);
module.exports = router;
