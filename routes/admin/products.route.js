const express = require("express");
const controller = require("../../controllers/admin/products.controller");
const router = express.Router();
const multer = require("multer");
const storageMulter = require("../../helpers/storageMulter");
const { createPost } = require("../../validation/admin/product.validate");
const upload = multer({ storage: storageMulter.storage() });

router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMultiStatus);

router.delete("/delete/id/:id", controller.deleteItem);

router.get("/create", controller.createItem);
router.post(
  "/create",
  upload.single("thumbnail"),
  createPost,
  controller.createItemPost
);

router.get("/edit/:id", controller.editItem);
router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  createPost,
  controller.editItemPatch
);

router.get("/detail/:id", controller.detail);
module.exports = router;
