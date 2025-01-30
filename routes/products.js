// File Routing เก็บ Endpoint ของ Server
const express = require("express");
const router = express.Router();
// import controller
const productController = require("../controllers/products");
// import middlewares
const { auth } = require("../middlewares/auth");

// ENDPOINT http://localhost:5000/api/products
router.get("/products",auth, productController.listProducts);
router.get("/product/:id", productController.readProduct);
router.post("/products", productController.createProduct);
router.put("/product/:id", productController.updateProduct);
router.delete("/product/:id", productController.deleteProduct);

//filter
router.get("/products/filter", productController.filterProduct);

module.exports = router;
