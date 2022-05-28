const router = require("express").Router();

const authController = require("../Controllers/Auth.controller");

router.post("/login", authController.login);

router.post("/register", authController.register);

module.exports = router;
