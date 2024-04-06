const mongoose = require("mongoose");
const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "İsim giriniz."],
    maxlength: 32,
  },
  tc: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Doğum tarihi giriniz."],
  },
  phoneNumber: {
    type: String,
    required: [true, "Telefon numarası giriniz."],
  },
  email: {
    type: String,
    required: [true, "Mail giriniz."],
  },
  address: {
    type: String,
    required: [true, "Adres bilgisi giriniz."],
  },
  accountTypes: {
    type: [String],
    enum: ["rent", "lesson", "storage", "camp"],
  },
  debt: {
    type: Number,
    default: 0,
  },
});
memberSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    const Lesson = require("./lesson");
    const Storage = require("./storage");
    const Rent = require("./rent");
    const Debt = require("./debt");
    const Payment = require("./payment");
    const Camp = require("./camp");
    const memberId = doc._id;
    await Lesson.deleteMany({ memberId: memberId });
    await Storage.deleteMany({ memberId: memberId });
    await Rent.deleteMany({ memberId: memberId });
    await Debt.deleteMany({ memberId: memberId });
    await Camp.deleteMany({ memberId: memberId });
    await Payment.deleteMany({ memberId: memberId });
  }
});
module.exports = mongoose.model("Member", memberSchema);
