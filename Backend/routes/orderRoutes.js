const express = require("express");
const orderController = require("../controllers/orderController");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

router.use(verifyToken);

router.post("/order", orderController.createOrder);
router.get("/order", orderController.getAllOrders);

module.exports = router;
