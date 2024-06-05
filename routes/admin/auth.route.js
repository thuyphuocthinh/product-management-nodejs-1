const express = require("express");
const {
  getLoginForm,
  postLogin,
  logout,
} = require("../../controllers/admin/auth.controller");
const router = express.Router();
const validate = require("../../validation/admin/auth.validate");

router.get("/login", getLoginForm);
router.post("/login", validate.loginPost, postLogin);
router.get("/logout", logout);

module.exports = router;
