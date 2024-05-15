const express = require("express");
const controller = require("../../controllers/admin/products.controller");
const router = express.Router();

router.get("/", controller.index);
router.patch("/change-status/:status/:id", controller.changeStatus)
router.patch("/change-multi", controller.changeMultiStatus);

module.exports = router;
