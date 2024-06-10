const express = require("express");
const {
  getMyAccount,
  getMyAccountEdit,
  patchMyAccountEdit,
} = require("../../controllers/admin/my-account.controller");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/", getMyAccount);
router.get("/edit", getMyAccountEdit);
router.patch(
  "/edit",
  upload.single("avatar"),
  uploadCloud.upload,
  patchMyAccountEdit
);

module.exports = router;
