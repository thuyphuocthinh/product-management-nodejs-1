const express = require("express");
const controller = require("../../controllers/admin/products.controller");
const router = express.Router();


router.get("/", controller.index);

module.exports = router;