const Expense = require("../models/expense");

exports.saveExpense = async (req, res) => {
  try {
    const { expenseName, price, expenseDate, paymentType, description } =
      req.body;
    const expense = new Expense({
      expenseName,
      price,
      expenseDate,
      paymentType,
      description,
    });
    await expense.save();
    res.status(200).json({ message: "Gider başarıyla kaydedildi." });
  } catch (error) {
    res.status(500).json({ error: "Gider kaydedilirken bir hata oluştu." });
  }
};
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Gider başarıyla silindi." });
  } catch (error) {
    res.status(500).json({ error: "Gider silinirken bir hata oluştu." });
  }
};
exports.getExpensesInRange = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    const expenses = await Expense.find({
      expenseDate: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    });

    res.status(200).json({ success: true, expenses });
  } catch (error) {
    next(error);
  }
};
