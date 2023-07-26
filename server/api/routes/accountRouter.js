const express = require("express");
const accountController = require("../controllers/accountController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(accountController.getAllAccounts)
  .post(authController.protectRoute, accountController.createAccount);

router
  .route("/user")
  .get(authController.protectRoute, accountController.getUserAccounts);

router
  .route("/:accountId")
  .get(accountController.getAccount)
  .patch(authController.protectRoute, accountController.updateAccount)
  .delete(authController.protectRoute, accountController.deleteAccount);

module.exports = router;
