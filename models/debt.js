const mongoose = require("mongoose");
const Member = require("./member");
const debtSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Ürün adı boş bırakılamaaz"],
  },
  price: {
    type: Number,
    required: [true, "Fiyat boş bırakılamaz"],
  },
  remainingPrice: {
    type: Number,
    required: true,
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },

  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Member",
  },
  description: {
    type: String,
  },
  memberName: {
    type: String,
    required: [true, "Üye adı boş bırakılamaz"],
  },
  debtDate: {
    type: Date,
    required: [true, "Borç tarihi ekleyiniz."],
  },
});
debtSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    const memberId = doc.memberId;
    const member = await Member.findById(memberId);
    const Payment = require("./payment");
    await Payment.deleteMany({ serviceId: doc._id });
    member.debt -= doc.remainingPrice;
    await member.save();
  }
});
module.exports = mongoose.model("Debt", debtSchema);
