const Camp = require("../models/camp");
exports.saveCamp = async (req, res, next) => {
  try {
    if (req.body._id) {
      const camp = await Camp.findByIdAndUpdate(req.body._id, req.body);
      return res.status(201).json({ success: true, camp });
    }
    const camp = await Camp.create(req.body);
    res.status(201).json({ success: true, camp });
  } catch (error) {
    next(error);
  }
};

exports.getCampsForMember = async (req, res, next) => {
  try {
    const camps = await Camp.find({ memberId: req.params.memberId });
    res.status(200).json({ success: true, camps });
  } catch (error) {
    next(error);
  }
};

exports.getCampsForTeacher = async (req, res, next) => {
  try {
    const camps = await Camp.find({ teacherId: req.params.teacherId });
    res.status(200).json({ success: true, camps });
  } catch (error) {
    next(error);
  }
};
exports.getCampsForTeacherInRange = async (req, res, next) => {
  const { startDate, endDate, teacherId } = req.query;
  try {
    const camps = await Camp.find({
      teacherId: teacherId,
      campDates: {
        $elemMatch: {
          $gte: new Date(startDate).toISOString(),
          $lte: new Date(endDate).toISOString(),
        },
      },
    });
    res.status(200).json(camps);
  } catch (error) {
    next(error);
  }
};
exports.getCampsInRange = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const camps = await Camp.find({
      campDates: {
        $elemMatch: {
          $gte: new Date(startDate).toISOString(),
          $lte: new Date(endDate).toISOString(),
        },
      },
    });

    res.status(200).json(camps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteCamp = async (req, res, next) => {
  try {
    const camp = await Camp.findByIdAndDelete(req.params.campId);
    res.status(200).json({ success: true, camp });
  } catch (error) {
    next(error);
  }
};
