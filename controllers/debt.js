const Debt = require("../models/debt");
exports.saveDebt = async (req, res, next) => {
  try {
    if (req.body._id) {
      const debt = await Debt.findByIdAndUpdate(req.body._id, req.body);
      return res.status(201).json({ success: true, debt });
    }
    const debt = await Debt.create(req.body);
    res.status(201).json({ success: true, debt });
  } catch (error) {
    next(error);
  }
};
exports.getAllDebts = async (req, res, next) => {
  try {
    const debts = await Debt.find();
    res.status(200).json({ success: true, debts });
  } catch (error) {
    next(error);
  }
};
exports.deleteDebt = async (req, res, next) => {
  try {
    const debt = await Debt.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, debt });
  } catch (error) {
    next(error);
  }
};
exports.getDebtsForMember = async (req, res, next) => {
  try {
    const debts = await Debt.find({ memberId: req.params.memberId });
    res.status(200).json({ success: true, debts });
  } catch (error) {
    next(error);
  }
};
exports.getDebtsInRange = async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const debts = await Debt.find({
      debtDate: {
        $gte: new Date(startDate).toISOString(),
        $lte: new Date(endDate).toISOString(),
      },
    });
    res.status(200).json(debts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
