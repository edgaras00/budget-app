const Account = require("../models/account");
const catchAsync = require("../../utils/catchAsync");

const AppError = require("../../utils/appError");

exports.getAllAccounts = catchAsync(async (req, res) => {
  const accounts = await Account.findAll();

  res.status(200).json({
    status: "success",
    results: accounts.length,
    data: { accounts },
  });
});

exports.getUserAccounts = catchAsync(async (req, res) => {
  const accounts = await Account.findAll({
    where: { userId: req.user.id },
    order: [["name", "ASC"]],
  });

  const totalBalance = accounts.reduce(
    (accumulator, currentValue) => accumulator + Number(currentValue.balance),
    0
  );

  res.status(200).json({
    status: "success",
    results: accounts.length,
    data: { accounts, totalBalance: totalBalance.toFixed(2) },
  });
});

exports.getAccount = catchAsync(async (req, res, next) => {
  const accountId = req.params.accountId;

  const account = await Account.findByPk(accountId);

  if (!account) {
    return next(new AppError("Account not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: { account },
  });
});

exports.createAccount = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const account = await Account.create({ ...req.body, userId });

  res.status(201).json({
    status: "success",
    data: { account },
  });
});

exports.updateAccount = catchAsync(async (req, res, next) => {
  const accountId = req.params.accountId;
  const account = await Account.findByPk(accountId);

  if (!account) {
    return next(new AppError("Account not found", 404));
  }

  const updatedFields = [];
  for (key in req.body) {
    updatedFields.push(key);
  }

  await account.update(req.body, { fields: updatedFields, validate: true });
  const updatedAccount = await Account.findByPk(accountId);

  res.status(200).json({
    status: "success",
    data: { account: updatedAccount },
  });
});

exports.deleteAccount = catchAsync(async (req, res, next) => {
  const accountId = req.params.accountId;
  const deletedAccount = await Account.destroy({ where: { id: accountId } });

  if (!deletedAccount) {
    return next(new AppError("Account not found", 404));
  }

  res.status(204).json({
    status: "success",
    message: "Account deleted successfully",
  });
});
