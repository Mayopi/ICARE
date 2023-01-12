const { Router } = require("express");
const authController = require("../controller/authController");
const { requireAdmin, requireAuth } = require("../middlewares/authMiddleware");

const adminRouter = Router();

// require admin routes
adminRouter.get("/dashboard-admin", requireAdmin, authController.dashboard_admin_get);
adminRouter.get("/manage-user", requireAdmin, authController.manage_user_get);
adminRouter.get("/manage-user/:id", requireAdmin, authController.update_user_get);
adminRouter.get("/delete-user/:id", requireAdmin, authController.delete_user_get);

// post method routes
adminRouter.post("/signup", authController.signup_post);
adminRouter.post("/login", authController.login_post);
adminRouter.post("/login-admin", authController.admin_login_post);
adminRouter.post("/update-user", authController.update_user_post);
adminRouter.post("/manage-user", authController.search_user_post);

module.exports = adminRouter;
