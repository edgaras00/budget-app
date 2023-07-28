const User = require("../models/user");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.findAll();

  res.status(200).json({
    status: "success",
    results: users.length,
    data: { users },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.params.userId);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByPk(req.params.userId);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  await user.update(req.body);

  const updateduser = await User.findByPk(req.params.userId);

  res.status(200).json({
    status: "success",
    data: { user: updateduser },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const deletedUser = await User.destroy({
    where: { userId: req.params.userId },
  });

  if (!deletedUser) {
    return next(new AppError("User not found", 404));
  }

  res.status(204);
});
