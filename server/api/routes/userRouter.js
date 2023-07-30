const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

// Restricted routes
// router.use(authController.protectRoute);
// router.use(authController.restrictRouteTo("admin"));

router.get("/validate", authController.protectRoute, authController.validate);

router.get(
  "/",
  authController.protectRoute,
  authController.restrictRouteTo("admin"),
  userController.getAllUsers
);
router
  .route("/:userId")
  .get(
    authController.protectRoute,
    authController.restrictRouteTo("admin"),
    userController.getUser
  )
  .patch(
    authController.protectRoute,
    authController.restrictRouteTo("admin"),
    userController.updateUser
  )
  .delete(
    authController.protectRoute,
    authController.restrictRouteTo("admin"),
    userController.deleteUser
  );

module.exports = router;
