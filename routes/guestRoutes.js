const { Router } = require("express");
const authController = require("../controller/authController");

const router = Router();

// get method routes
router.get("/login", authController.login_get);
router.get("/signup", authController.signup_get);
router.get("/logout", authController.logout_get);

module.exports = router;
