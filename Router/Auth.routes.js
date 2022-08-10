const router = require("express").Router();

const authController = require("../Controllers/Auth.controller");

router.post("/login", authController.login);

router.post("/register", authController.register);

router.post("/forgot-password", authController.forgotPassword);

router.post("/reset-password", authController.resetPassword);

router.post("/admin", authController.adminLogin);

module.exports = router;
