const { Router } = require("express");
const authController = require("../controller/authController");
const { requireAdmin, requireAuth } = require("../middlewares/authMiddleware");

const router = Router();

// require auth routes
// GET Request
router.get("/dashboard", requireAuth, authController.dashboard_get);
router.get("/color-blind-test", requireAuth, authController.color_blind_test_get);
router.get("/certificate-colorblindness", requireAuth, authController.certificate_get);
router.get("/profile-user/:id", requireAuth, authController.profile_user_get);
router.get("/profile-user/settings/:id", requireAuth, authController.profile_user_settings_get);
router.get("/visual-eye-test", requireAuth, authController.visual_eye_test_get);

// POST Request
router.post("/profile-user/:id", requireAuth, authController.profile_user_post);

module.exports = router;
