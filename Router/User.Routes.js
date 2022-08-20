const router = require("express").Router();

const UserController = require("../Controllers/User.Controller");

router.get("/cart", UserController.getCart);

router.post("/cart", UserController.addProductToCart);

router.delete("/cart", UserController.removeProductFromCart);

router.patch("/cart", UserController.updateProductQuantity);

router.post("/order", UserController.orderProducts);

module.exports = router;
