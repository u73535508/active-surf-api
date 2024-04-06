const User = require("../models/user");
const ErrorResponse = require("../utils/errorResponse");

exports.signup = async (req, res, next) => {
  const { username } = req.body;
  const userExist = await User.findOne({ username });
  if (userExist) {
    next(new ErrorResponse("User already exist", 400));
  }
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.userProfile = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
};
exports.signin = async (req, res, next) => {
  try {
    console.log("girdim");
    const { username, password } = req.body;
    if (!username || !password) {
      next(new ErrorResponse("Email and password are required", 400));
    }
    const user = await User.findOne({ username });
    if (!user) {
      next(new ErrorResponse("Invalid credentials", 400));
    }
    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      next(new ErrorResponse("Invalid credentials", 400));
    }
    generateToken(user, res);
  } catch (error) {
    console.log(error);
    next(new ErrorResponse("Cannot log in check your credentials", 400));
  }
};
const generateToken = async (user, res) => {
  const token = await user.jwtGenerateToken();
  res.status(res.statusCode).json({ success: true, token });
};
exports.singleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};
