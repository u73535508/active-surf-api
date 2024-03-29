const jwt = require("jsonwebtoken");
const User = require("../models/user");
const ErrorResponse = require("../utils/errorResponse");

// check if user is authenticated

exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  console.log("token", token);
  // make sure token exist
  if (!token) {
    return next(
      new ErrorResponse("You must log in to access this resource", 401)
    );
  }

  try {
    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      throw new Error("Invalid token");
    }

    // fetch user by id from database
    const user = await User.findById(decoded.id);
    console.log("user", user);
    if (!user) {
      throw new Error("User not found");
    }

    // attach user to request object
    req.user = user;
    next();
  } catch (error) {
    return next(new ErrorResponse("You must log in", 401));
  }
};
