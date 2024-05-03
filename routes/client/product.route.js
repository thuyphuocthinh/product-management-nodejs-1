const express = require("express");
const controller = require("../../controllers/client/products.controller");
const router = express.Router();

// get(path, callback)
router.get("/", controller.index);

module.exports = router;