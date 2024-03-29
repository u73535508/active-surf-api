const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["credit_card", "cash", "iban", "currency"],
    required: [true, "Ödeme tipi giriniz."],
  },
  amount: {
    type: Number,
    required: [true, "Ödeme miktarı giriniz."],
  },
  date: {
    type: Date,
    required: [true, "Tarih ekleyiniz."],
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "serviceType",
    required: [true, "Hizmet ID'si giriniz."],
  },
  rate: {
    type: String,
  },
  memberName: {
    type: String,
    required: [true, "Üye adı giriniz."],
  },
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
    required: [true, "Üye ID'si giriniz."],
  },
  serviceType: {
    type: String,
    enum: ["Lesson", "Storage", "Rent", "Debt", "Camp"],
    required: [true, "Hizmet tipi giriniz."],
  },
});

module.exports = mongoose.model("Payment", PaymentSchema);
