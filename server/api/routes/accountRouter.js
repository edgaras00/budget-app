const express = require("express");
const accountController = require("../controllers/accountController");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protectRoute);

router.get(
  authController.restrictRouteTo("admin"),
  accountController.getAllAccounts
);

router.route("/").post(accountController.createAccount);

router.route("/user").get(accountController.getUserAccounts);

router
  .route("/:accountId")
  .get(accountController.getAccount)
  .patch(accountController.updateAccount)
  .delete(accountController.deleteAccount);

module.exports = router;
