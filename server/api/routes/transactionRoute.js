const express = require("express");
const transactionController = require("../controllers/transactionController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(transactionController.getAllTransactions)
  .post(authController.protectRoute, transactionController.createTransaction);

router.get(
  "/user",
  authController.protectRoute,
  transactionController.getUserTransactions
);

router.get(
  "/breakdown",
  authController.protectRoute,
  transactionController.getSpendingBreakdown
);

router.get(
  "/monthly",
  authController.protectRoute,
  transactionController.getMonthlySpending
);

router
  .route("/:transactionId")
  .get(transactionController.getTransaction)
  .patch(transactionController.updateTransaction)
  .delete(authController.protectRoute, transactionController.deleteTransaction);

module.exports = router;
