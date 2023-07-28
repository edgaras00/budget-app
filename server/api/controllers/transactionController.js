const { Sequelize } = require("sequelize");
const { sequelize } = require("../../config/db");
const { Op } = require("sequelize");
const Transaction = require("../models/transaction");
const Account = require("../models/account");
const Category = require("../models/category");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");

exports.getAllTransactions = catchAsync(async (req, res) => {
  const transactions = await Transaction.findAll();

  res.status(200).json({
    status: "success",
    results: transactions.length,
    data: { transactions },
  });
});

exports.getUserTransactions = catchAsync(async (req, res) => {
  // Build query filter
  const {
    amountMin,
    amountMax,
    accountOptions,
    categoryOptions,
    sort,
    order,
  } = req.query;

  const filter = { userId: req.user.id };

  let sortBy = ["date", "DESC"];

  if (sort !== undefined) {
    if (order !== undefined) {
      sortBy = [sort, order.toUpperCase()];

      if (sort === "category") {
        sortBy = [{ model: Category }, "name", order];
      }

      if (sort === "account") {
        sortBy = [{ model: Account }, "name", order];
      }
    } else {
      sortBy = [sort, "DESC"];
    }
  }

  if (amountMin !== undefined && amountMax !== undefined) {
    filter.amount = {
      [Op.gte]: amountMin,
      [Op.lte]: amountMax,
    };
  } else if (amountMin !== undefined) {
    filter.amount = { [Op.gte]: amountMin };
  } else if (amountMax !== undefined) {
    filter.amount = { [Op.lte]: amountMax };
  }

  // if (startDate !== undefined && endDate !== undefined) {
  //   // const parsedStartDate = new Date(startDate);
  //   // const parsedEndDate = new Date(endDate);
  //   filter.transactionDate = { [Op.between]: [startDate, endDate] };
  // }

  if (categoryOptions !== undefined) {
    filter.categoryId = { [Op.in]: categoryOptions.split(",") };
  }

  if (accountOptions !== undefined) {
    filter.accountId = { [Op.in]: accountOptions.split(",") };
  }

  const transactions = await Transaction.findAll({
    where: filter,
    include: [
      { model: Category, attributes: ["name"] },
      { model: Account, attributes: ["name", "accountType"] },
    ],
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    order: [sortBy],
  });

  res.status(200).json({
    status: "success",
    results: transactions.length,
    data: { transactions },
  });
});

exports.getTransaction = catchAsync(async (req, res, next) => {
  const transactionId = req.params.transactionId;

  const transaction = await Transaction.findByPk(transactionId);

  if (!transaction) {
    return next(new AppError("Transaction not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: { transaction },
  });
});

exports.createTransaction = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const parsedDate = new Date(req.body.transactionDate);
  req.body.transactionDate = parsedDate;
  const newTransaction = await Transaction.create({ ...req.body, userId });

  const account = await Account.findByPk(req.body.accountId);
  const newBalance = account.balance - newTransaction.amount;
  await account.update({ balance: newBalance });

  res.status(201).json({
    status: "success",
    data: { transaction: newTransaction },
  });
});

exports.updateTransaction = catchAsync(async (req, res, next) => {
  const transactionId = req.params.transactionId;

  const transaction = await Transaction.findByPk(transactionId);

  if (!transaction) {
    return next(new AppError("Transaction not found", 404));
  }

  await transaction.update(req.body);
  const updatedTransaction = await Transaction.findByPk(transactionId);

  res.status(200).json({
    status: "success",
    data: { transaction: updatedTransaction },
  });
});

exports.deleteTransaction = catchAsync(async (req, res, next) => {
  const transactionId = req.params.transactionId;
  const deletedTransaction = await Transaction.destroy({
    where: { id: transactionId },
  });

  if (!deletedTransaction) {
    return next(new AppError("Transaction not found", 404));
  }

  res.status(204).json({
    status: "success",
    message: "Transaction deleted successfully",
  });
});

exports.getSpendingBreakdown = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const sqlQuery = `
  SELECT
    "Transaction"."categoryId",
    "Category"."name" AS "categoryName",
    SUM("Transaction"."amount") AS "totalAmount"
  FROM
    "transactions" AS "Transaction"
  JOIN
    "categories" AS "Category"
  ON
    "Transaction"."categoryId" = "Category"."id"
  WHERE
    "Transaction"."userId" = :userId
  GROUP BY
    "Transaction"."categoryId",
    "Category"."name";
`;
  const transactionSumsByCategory = await sequelize.query(sqlQuery, {
    replacements: { userId },
    type: Sequelize.QueryTypes.SELECT,
  });

  res.status(200).json({
    status: "success",
    data: { spendingBreakdown: transactionSumsByCategory },
  });
});

exports.getMonthlySpending = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const categoryTransactions = await Transaction.findAll({
    where: { userId },
    attributes: [
      "amount",
      [sequelize.fn("date_trunc", "month", sequelize.col("date")), "month"],
    ],
    include: { model: Category, attributes: ["name"] },
    order: [["month", "ASC"]],
    raw: true,
  });

  const categories = categoryTransactions.map((txn) => txn["category.name"]);
  const uniqueCategories = [...new Set(categories)];

  const spendingByMonth = {};
  for (const txn of categoryTransactions) {
    const date = dayjs.utc(txn.month).format("MMM-YY");
    if (date in spendingByMonth) {
      if (txn["category.name"] in spendingByMonth[date]) {
        spendingByMonth[date][txn["category.name"]] += txn.amount;
      } else {
        spendingByMonth[date][txn["category.name"]] = txn.amount;
      }
    } else {
      spendingByMonth[date] = { [txn["category.name"]]: txn.amount };
    }
  }

  const dataPoints = Object.keys(spendingByMonth).map((date) => {
    return { name: date, ...spendingByMonth[date] };
  });

  res.status(200).json({
    status: "success",
    data: {
      categories: uniqueCategories,
      monthlyTransactions: dataPoints,
    },
  });
});
