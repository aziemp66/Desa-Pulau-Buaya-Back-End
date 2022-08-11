const router = require("express").Router();

const adminController = require("../Controllers/Admin.controller");

router.post("/product", adminController.addProduct);

router.get("/product", adminController.getAllProducts);

router.get("/product/:id", adminController.getProductById);

router.patch("/product/:id", adminController.updateProduct);

router.delete("/product/:id", adminController.deleteProduct);

router.get("/order", adminController.getAllOrder);

router.patch("/order/:id", adminController.changeOrderStatus);

router.delete("/order/:id", adminController.deletingOrder);

module.exports = router;
