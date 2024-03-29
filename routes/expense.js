const express = require("express");
const router = express.Router();
const {
  saveExpense,
  getExpensesInRange,
  deleteExpense,
} = require("../controllers/expense");
const { isAuthenticated } = require("../middleware/auth");

router.post("/expense/saveExpense", saveExpense);
router.get("/expense/getExpensesInRange", getExpensesInRange);
router.delete("/expense/deleteExpense/:id", deleteExpense);

module.exports = router;
