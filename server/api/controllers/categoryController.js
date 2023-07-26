const Category = require("../models/category");

const catchAsync = require("../../utils/catchAsync");

exports.getAllCategories = catchAsync(async (req, res) => {
  const categories = await Category.findAll();

  res.status(200).json({
    status: "success",
    results: categories.length,
    data: { categories },
  });
});

exports.getCategory = catchAsync(async (req, res) => {
  const categoryID = req.params.categoryID;
  const category = await Category.findByPk(categoryID);

  res.status(200).json({
    status: "success",
    data: { category },
  });
});

exports.createCategory = catchAsync(async (req, res) => {
  const category = await Category.create(req.body);

  res.status(201).json({
    status: "success",
    data: { category },
  });
});

exports.updateCategory = catchAsync(async (req, res) => {
  const categoryID = req.params.categoryID;
  const category = await Category.findByPk(categoryID);

  if (!category) return;

  await category.update(req.body);
  const updatedCategory = await Category.findByPk(categoryID);

  res.status(200).json({
    status: "success",
    data: { category: updatedCategory },
  });
});

exports.deleteCategory = catchAsync(async (req, res) => {
  const categoryID = req.params.categoryID;
  const deletedCount = await Category.destroy({ where: { id: categoryID } });

  if (!deletedCount) return;

  res.status(204).json({
    status: "success",
    message: "Category deleted successfully",
  });
});
