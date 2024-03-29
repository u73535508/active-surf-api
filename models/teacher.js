const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Öğretmen adı ekleyiniz."],
    maxlength: 32,
  },
});

module.exports = mongoose.model("Teacher", teacherSchema);
