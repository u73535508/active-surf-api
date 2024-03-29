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
router.get("/debt/getDebtsInRange", getDebtsInRange);
router.get("/debt/getAllDebts", getAllDebts);
router.get(
  "/debt/getDebtsForMember/:memberId",

  getDebtsForMember
);
router.post("/debt/saveDebt", saveDebt);
router.delete("/debt/deleteDebt/:id", deleteDebt);
module.exports = router;
