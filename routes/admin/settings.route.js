const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const {
  getSettingsGeneral,
  patchSettingsGeneral,
} = require("../../controllers/admin/settings.controller");

router.get("/general", getSettingsGeneral);
router.patch(
  "/general",
  upload.single("logo"),
  uploadCloud.upload,
  patchSettingsGeneral
);

module.exports = router;
