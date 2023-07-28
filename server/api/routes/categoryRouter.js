const express = require("express");
const categoryController = require("../controllers/categoryController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(categoryController.getAllCategories)
  .post(
    authController.protectRoute,
    authController.restrictRouteTo("admin"),
    categoryController.createCategory
  );

router
  .route("/:categoryID")
  .get(categoryController.getCategory)
  .patch(
    authController.protectRoute,
    authController.restrictRouteTo("admin"),
    categoryController.updateCategory
  )
  .delete(
    authController.protectRoute,
    authController.restrictRouteTo("admin"),
    categoryController.deleteCategory
  );

module.exports = router;
