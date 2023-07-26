const express = require("express");
const budgetController = require("../controllers/budgetController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(budgetController.getAllBudgets)
  .post(authController.protectRoute, budgetController.createBudget);

router
  .route("/user")
  .get(authController.protectRoute, budgetController.getUserBudgets);

router
  .route("/:budgetId")
  .get(budgetController.getBudget)
  .patch(budgetController.updateBudget)
  .delete(budgetController.deleteBudget);

module.exports = router;
