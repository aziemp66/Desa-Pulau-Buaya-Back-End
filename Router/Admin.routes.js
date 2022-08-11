const router = require("express").Router();

const adminController = require("../Controllers/Admin.controller");

router.post("/product", adminController.addProduct);

router.get("/product", adminController.getAllProducts);

router.get("/product/:id", adminController.getProductById);

router.patch("/product/:id", adminController.updateProduct);

router.delete("/product/:id", adminController.deleteProduct);

module.exports = router;
