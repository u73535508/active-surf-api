const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Please add a username"],
      maxlength: 32,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Please add a password"],
      minLength: [6, "Password should be minimum 6 character"],
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
// verify password
userSchema.methods.comparePassword = async function (yourPassword) {
  return await bcrypt.compare(yourPassword, this.password);
};

// get the token
userSchema.methods.jwtGenerateToken = function () {
  return jwt.sign(
    {
      id: this.id,
    },
    process.env.JWT_SECRET,
    { expiresIn: 3600 }
  );
};
userSchema.index({ username: 1 }, { unique: true });
module.exports = mongoose.model("User", userSchema);
