const Payment = require("../models/payment");

exports.savePayment = async (req, res, next) => {
  try {
    const {
      type,
      amount,
      date,
      serviceId,
      memberName,
      serviceType,
      rate,
      memberId,
    } = req.body;
    const payment = new Payment({
      type,
      serviceType,
      memberId,
      serviceId,
      rate,
      memberName,
      amount,
      date: new Date(date),
    });

    await payment.save();

    res.status(200).json({ success: true, payment });
  } catch (error) {
    next(error);
  }
};

exports.getPaymentsInRange = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    const payments = await Payment.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    });

    res.status(200).json({ success: true, payments });
  } catch (error) {
    next(error);
  }
};
exports.getPaymentsForService = async (req, res, next) => {
  try {
    const payments = await Payment.find({ serviceId: req.params.serviceId });
    res.status(200).json({ success: true, payments });
  } catch (error) {
    next(error);
  }
};

exports.deletePayment = async (req, res, next) => {
  try {
    console.log("req.params.id", req.params.id);
    const payment = await Payment.findByIdAndDelete(req.params.id);
    console.log("payment", payment);
    res.status(200).json({ success: true, payment });
  } catch (error) {
    next(error);
  }
};
