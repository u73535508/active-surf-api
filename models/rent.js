mongoose = require("mongoose");
const Member = require("./member");
const rentSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Lütfen bir üye ID'si ekleyin"],
    ref: "Member",
  },
  memberName: {
    type: String,
    required: [true, "Lütfen bir üye adı ekleyin"],
  },
  isPaid: {
    default: false,
    type: Boolean,
    required: [true, "Lütfen bir ödeme durumu ekleyin"],
  },
  remainingPrice: {
    type: Number,
    required: [true, "Lütfen kalan bir fiyat ekleyin"],
  },
  item: {
    type: String,
    required: [true, "Lütfen bir ürün adı ekleyin"],
    maxlength: [32, "Ürün adı en fazla 32 karakter olabilir"],
  },

  startDate: {
    type: Date,
    required: [true, "Lütfen bir başlangıç tarihi ekleyin"],
  },
  endDate: {
    type: Date,
    required: [true, "Lütfen bir bitiş tarihi ekleyin"],
  },
  rentDates: {
    type: [Date],
    required: [true, "Please add a date"],
  },
  price: {
    type: Number,
    required: [true, "Lütfen bir fiyat ekleyin"],
  },
  description: {
    type: String,
  },
  rentDates: {
    type: [Date],
    required: [true, "Lütfen bir tarih ekleyin"],
  },
});
rentSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    const memberId = doc.memberId;
    const member = await Member.findById(memberId);
    member.debt -= doc.remainingPrice;
    const Payment = require("./payment");
    await Payment.deleteMany({ serviceId: doc._id });
    await member.save();
  }
});
module.exports = mongoose.model("Rent", rentSchema);
