const mongoose = require("mongoose");
const Member = require("./member");
const { ObjectId } = mongoose.Schema.Types;
const campSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: [true, "Ders başlangıç tarihi ekleyiniz."],
  },
  endDate: {
    type: Date,
    required: [true, "Ders bitiş tarihi ekleyiniz."],
  },
  campAmountWeek: {
    type: Number,
    required: [true, "Ders sayısı ekleyiniz."],
  },

  campAmountDay: {
    type: Number,
    required: [true, "Ders sayısı ekleyiniz."],
  },
  isPaid: {
    default: false,
    type: Boolean,
    required: [true, "Please add a payment status"],
  },
  campDates: {
    type: [Date],
    required: [true, "Please add a date"],
  },
  remainingPrice: {
    type: Number,
    required: [true, "Please add a remaining price"],
  },
  remainingCampAmount: {
    type: Number,
    required: [true, "Please add a remaining lesson amount"],
  },
  price: {
    type: Number,
    required: [true, "Fiyat ekleyiniz"],
  },

  campType: {
    type: String,
    enum: ["beginner1", "beginner2", "advanced"],
    required: [true, "Kamp türü ekleyiniz. (Beginner 1, Beginner 2, Advanced)"],
  },
  memberName: {
    type: String,
    required: [true, "Öğrenci ekleyiniz."],
  },
  teacherName: {
    type: String,
    required: [true, "Öğretmen ekleyiniz."],
  },
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Member",
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Öğretmen ekleyiniz."],
    ref: "Teacher",
  },
  description: {
    type: String,
  },
});
campSchema.index({ campDates: 1, memberId: 1, teacherId: 1 });
campSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    const memberId = doc.memberId;
    const member = await Member.findById(memberId);
    const Payment = require("./payment");
    await Payment.deleteMany({ serviceId: doc._id });
    member.debt -= doc.remainingPrice;
    await member.save();
  }
});
module.exports = mongoose.model("Camp", campSchema);
