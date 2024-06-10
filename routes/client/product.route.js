const express = require("express");
const controller = require("../../controllers/client/products.controller");
const router = express.Router();

// get(path, callback)
router.get("/", controller.index);
router.get("/:slugCategory", controller.category);
// router.get("/:slug", controller.detail);

module.exports = router;
