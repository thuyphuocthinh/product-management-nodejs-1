const express = require("express");
const {
  getProductsCategory,
  getProductsCategoryCreate,
  createProductCategory,
} = require("../../controllers/admin/products-category.controller");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const { createCategory } = require("../../validation/admin/products-category.validate");

router.get("/", getProductsCategory);
router.get("/create", getProductsCategoryCreate);
router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  createCategory,
  createProductCategory
);

module.exports = router;
