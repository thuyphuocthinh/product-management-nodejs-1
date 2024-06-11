const express = require("express");
const {
  getCheckOut,
  order,
  getSuccessPage,
} = require("../../controllers/client/checkout.controller");
const router = express.Router();

router.get("/", getCheckOut);
router.post("/order", order);
router.get("/success/:orderId", getSuccessPage);

module.exports = router;
