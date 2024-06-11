const express = require("express");
const {
  addToCart,
  getCart,
  deleteItem,
  updateQuantity,
} = require("../../controllers/client/cart.controller");
const router = express.Router();

router.post("/add/:productId", addToCart);
router.get("/", getCart);
router.get("/delete/:productId", deleteItem);
router.get("/update/:productId/:quantity", updateQuantity);

module.exports = router;
