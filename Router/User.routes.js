const router = require("express").Router();
const userController = require("../Controllers/User.Controller");

router.get("/cart", userController.getCart);

router.post("/cart", userController.addProductToCart);

router.delete("/cart", userController.removeProductFromCart);

router.patch("/cart", userController.updateProductQuantity);

router.post("/order", userController.orderProducts);

module.exports = router;
