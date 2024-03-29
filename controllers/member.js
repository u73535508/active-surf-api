const Member = require("../models/member");

exports.saveMember = async (req, res, next) => {
  try {
    const id = req.body.id;
    const memberExist = await Member.findById(id);
    if (memberExist) {
      const member = await Member.findByIdAndUpdate(id, req.body);
      return res.status(201).json({ success: true, member });
    }
    const member = await Member.create(req.body);
    res.status(201).json({ success: true, member });
  } catch (error) {
    next(error);
  }
};

exports.getAllMembers = async (req, res, next) => {
  try {
    const members = await Member.find();
    res.status(200).json({ success: true, members });
  } catch (error) {
    next(error);
  }
};

exports.getDebtors = async (req, res) => {
  try {
    const debtors = await Member.find({ debt: { $gt: 0 } });
    res.status(200).json(debtors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getMember = async (req, res, next) => {
  try {
    const member = await Member.findById(req.params.id);
    res.status(200).json({ success: true, member });
  } catch (error) {
    next(error);
  }
};

exports.deleteMember = async (req, res, next) => {
  try {
    console.log("req.params.id", req.params.id);
    const member = await Member.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, member });
  } catch (error) {
    next(error);
  }
};
