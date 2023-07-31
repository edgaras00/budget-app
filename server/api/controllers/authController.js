const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const catchAsync = require("../../utils/catchAsync");

const User = require("../models/user");
const AppError = require("../../utils/appError");

const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  const cookieOptions = {
    httpOnly: true,
    expires: new Date(process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const user = await User.create(newUser, {
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  user.password = undefined;

  createAndSendToken(user, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 401));
  }

  const user = await User.unscoped().findOne({
    where: { email },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  user.password = undefined;

  createAndSendToken(user, 200, res);
});

exports.logout = catchAsync(async (req, res) => {
  res.cookien("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
  });
});

exports.protectRoute = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  // Check if received token
  if (!token) {
    return next(new AppError("Please log in to gain access", 401));
  }

  // Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Check if user still exists
  const user = await User.findByPk(decoded.id);

  if (!user) {
    return next(
      new AppError("The user who this token belongs to does not exist", 401)
    );
  }

  req.user = user;
  next();
});

exports.restrictRouteTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

exports.validate = (req, res) => {
  res.status(200);
};
