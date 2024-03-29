const Storage = require("../models/storage");
exports.saveStorage = async (req, res, next) => {
  try {
    if (req.body._id) {
      const storage = await Storage.findByIdAndUpdate(req.body._id, req.body);
      return res.status(201).json({ success: true, storage });
    }
    const storage = await Storage.create(req.body);
    res.status(201).json({ success: true, storage });
  } catch (error) {
    next(error);
  }
};

exports.deleteStorage = async (req, res, next) => {
  try {
    const storage = await Storage.findByIdAndDelete(req.params.storageId);
    res.status(200).json({ success: true, storage });
  } catch (error) {
    next(error);
  }
};
exports.getStoragesForMember = async (req, res, next) => {
  try {
    const storages = await Storage.find({ memberId: req.params.memberId });
    res.status(200).json({ success: true, storages });
  } catch (error) {
    next(error);
  }
};
exports.getStoragesInRange = async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const storages = await Storage.find({
      startDate: {
        $gte: new Date(startDate),
      },
      endDate: {
        $lte: new Date(endDate),
      },
    });
    res.status(200).json(storages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
