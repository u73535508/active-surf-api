const Rent = require("../models/rent");
exports.saveRent = async (req, res, next) => {
  try {
    if (req.body._id) {
      const rent = await Rent.findByIdAndUpdate(req.body._id, req.body);
      return res.status(201).json({ success: true, rent });
    }
    const rent = await Rent.create(req.body);
    res.status(201).json({ success: true, rent });
  } catch (error) {
    next(error);
  }
};
exports.getRentsInRange = async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const rents = await Rent.find({
      rentDates: {
        $elemMatch: {
          $gte: new Date(startDate).toISOString(),
          $lte: new Date(endDate).toISOString(),
        },
      },
    });

    res.status(200).json(rents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteRent = async (req, res, next) => {
  try {
    const rent = await Rent.findByIdAndDelete(req.params.rentId);
    res.status(200).json({ success: true, rent });
  } catch (error) {
    next(error);
  }
};
exports.getRentsForMember = async (req, res, next) => {
  try {
    const rents = await Rent.find({ memberId: req.params.memberId });
    res.status(200).json({ success: true, rents });
  } catch (error) {
    next(error);
  }
};
