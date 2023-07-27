const AppError = require("../../utils/appError");

const handleValidationError = (err) => {
  const message = err.message;
  return new AppError(message, 400);
};

const handleDuplicateError = (err) => {
  let errorMessageArr = err.errors.map(
    (errorInstance) => errorInstance.message
  );
  const message = errorMessageArr.join(" | ");
  return new AppError(message, 400);
};

const handleJWTError = (err) =>
  new AppError("Invalid token. Please log in again", 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const handleJWTExpiredError = () =>
  new AppError("Your token has expird. Please log in again", 401);

const sendErrorProd = (err, res) => {
  console.log(err);
  // Operational errors can be sent to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Programming or other errors should be hidden from the client
    // console.error(err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;
    error.name = err.name;

    if (error.name === "SequelizeValidationError") {
      error = handleValidationError(error);
    }
    if (error.name === "SequelizeUniqueConstraintError") {
      error = handleDuplicateError(error);
    }
    if (error.name === "JsonWebTokenError") {
      error = handleJWTError(error);
    }
    if (error.name === "TokenExpiredError") {
      error = handleJWTExpiredError(error);
    }
    sendErrorProd(error, res);
  }
};
