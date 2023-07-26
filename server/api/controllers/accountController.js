const Account = require("../models/account");
const catchAsync = require("../../utils/catchAsync");

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
  });

  console.log(accounts);

  const totalBalance = accounts.reduce(
    (accumulator, currentValue) => accumulator + parseInt(currentValue.balance),
    0
  );

  res.status(200).json({
    status: "success",
    results: accounts.length,
    data: { accounts, totalBalance },
  });
});

exports.getAccount = catchAsync(async (req, res) => {
  const accountId = req.params.accountId;

  const account = await Account.findByPk(accountId);

  if (!account) return;

  res.status(200).json({
    status: "success",
    data: { account },
  });
});

exports.createAccount = catchAsync(async (req, res) => {
  console.log("Hit here");
  const userId = req.user.id;
  const account = await Account.create({ ...req.body, userId });

  res.status(201).json({
    status: "success",
    data: { account },
  });
});

exports.updateAccount = catchAsync(async (req, res) => {
  const accountId = req.params.accountId;
  const account = await Account.findByPk(accountId);

  if (!account) return;

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

exports.deleteAccount = catchAsync(async (req, res) => {
  const accountId = req.params.accountId;
  const deletedAccount = await Account.destroy({ where: { id: accountId } });

  if (!deletedAccount) {
    throw new Error("something went wrong");
  }

  res.status(204).json({
    status: "success",
    message: "Account deleted successfully",
  });
});
