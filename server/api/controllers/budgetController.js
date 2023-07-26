const Budget = require("../models/budget");
const Category = require("../models/category");

const catchAsync = require("../../utils/catchAsync");

exports.getAllBudgets = catchAsync(async (req, res) => {
  const budgets = await Budget.findAll();

  res.status(200).json({
    status: "success",
    results: budgets.length,
    data: { budgets },
  });
});

exports.getUserBudgets = catchAsync(async (req, res) => {
  const user = req.user;
  const budgets = await Budget.findAll({
    where: { userId: user.id },
    include: [{ model: Category, attributes: ["name"] }],
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });

  const budgetsWithProgress = budgets.map((budget) => {
    budget.progress = Math.round((budget.amount / budget.initialAmount) * 100);
    return budget;
  });

  res.status(200).json({
    status: "success",
    data: { budgets: budgetsWithProgress },
  });
});

exports.getBudget = catchAsync(async (req, res) => {
  const budgetId = req.params.budgetId;

  const budget = Budget.findByPk(budgetId);

  if (!budget) return;

  res.status(200).json({
    status: "success",
    data: { budget },
  });
});

exports.createBudget = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const budget = await Budget.create({ ...req.body, userId });

  res.status(201).json({
    status: "success",
    data: { budget },
  });
});

exports.updateBudget = catchAsync(async (req, res) => {
  const budgetId = req.params.budgetId;
  const budget = await Budget.findByPk(budgetId);

  if (!budget) return;

  await budget.update(req.body);

  res.status(200).json({
    status: "success",
    data: { budget },
  });
});

exports.deleteBudget = catchAsync(async (req, res) => {
  const budgetId = req.params.budgetId;

  const deletedBudget = await Budget.destroy({ where: { id: budgetId } });

  if (!deletedBudget) return;

  res.status(204).json({
    status: "success",
    message: "Budget deleted successfully",
  });
});
