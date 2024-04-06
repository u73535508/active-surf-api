const express = require("express");
const router = express.Router();
const {
  saveExpense,
  getExpensesInRange,
  deleteExpense,
} = require("../controllers/expense");
const { isAuthenticated } = require("../middleware/auth");

router.post("/expense/saveExpense", isAuthenticated, saveExpense);
router.get("/expense/getExpensesInRange", isAuthenticated, getExpensesInRange);
router.delete("/expense/deleteExpense/:id", isAuthenticated, deleteExpense);

module.exports = router;
