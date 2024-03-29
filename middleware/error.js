const ErrorResponse = require("../utils/errorResponse");
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  if (err.name === `CastError`) {
    const message = "Resource not found";
    error = new ErrorResponse(message, 404);
  }
  if (err.code === 11000) {
    console.log(err);
    const message = "Username duplicated";
    error = new ErrorResponse(message, 404);
  }
  res
    .status(err.statusCode || 500)
    .json({ success: false, error: error.message || "Server Error" });
};
module.exports = errorHandler;
