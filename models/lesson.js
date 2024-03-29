const mongoose = require("mongoose");
const Member = require("./member");
const { ObjectId } = mongoose.Schema.Types;
const lessonSchema = new mongoose.Schema({
  isGroup: {
    type: Boolean,
    required: [true, "Ders tipi ekleyiniz. (Grup mu bireysel mi?)"],
  },
  startDate: {
    type: Date,
    required: [true, "Ders başlangıç tarihi ekleyiniz."],
  },
  endDate: {
    type: Date,
    required: [true, "Ders bitiş tarihi ekleyiniz."],
  },
  lessonAmount: {
    type: Number,
    required: [true, "Ders sayısı ekleyiniz."],
  },
  isPaid: {
    default: false,
    type: Boolean,
    required: [true, "Please add a payment status"],
  },
  lessonDates: {
    type: [Date],
    required: [true, "Please add a date"],
  },
  remainingPrice: {
    type: Number,
    required: [true, "Please add a remaining price"],
  },
  remainingLessonAmount: {
    type: Number,
    required: [true, "Please add a remaining lesson amount"],
  },
  price: {
    type: Number,
    required: [true, "Fiyat ekleyiniz"],
  },
  lessonKind: {
    type: String,
    enum: ["windSurf", "kiteSurf", "wingFoil"],
    required: [
      true,
      "Ders tipi ekleyiniz. (Rüzgar sörfü, uçurtma sörfü, kanat sörfü)",
    ],
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
lessonSchema.index({ lessonDates: 1, memberId: 1 });
lessonSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    const memberId = doc.memberId;
    const member = await Member.findById(memberId);
    const Payment = require("./payment");
    await Payment.deleteMany({ serviceId: doc._id });
    member.debt -= doc.remainingPrice;
    await member.save();
  }
});
module.exports = mongoose.model("Lesson", lessonSchema);
