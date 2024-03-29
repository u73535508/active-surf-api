const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: [true, "Gider miktarı giriniz."],
  },
  expenseDate: {
    type: Date,
    required: [true, "Tarih ekleyiniz."],
  },
  expenseName: {
    type: String,
    required: [true, "Gider ismi giriniz."],
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("Expense", ExpenseSchema);
