const express = require("express");
const {
  getAccounts,
  getAccountsCreate,
  postAccountsCreate,
  getAccountsEdit,
  patchAccountsEdit,
} = require("../../controllers/admin/accounts.controller");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/", getAccounts);
router.get("/create", getAccountsCreate);
router.post(
  "/create",
  upload.single("avatar"),
  uploadCloud.upload,
  postAccountsCreate
);
router.get("/edit/:id", getAccountsEdit);
router.patch(
  "/edit/:id",
  upload.single("avatar"),
  uploadCloud.upload,
  patchAccountsEdit
);
module.exports = router;
