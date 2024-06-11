const express = require("express");
const {
  getRegisterPage,
  registerPost,
  getLoginPage,
  loginPost,
  logout,
  getForgotPasswordPage,
  postForgotPassword,
  getOtpPage,
  postOtp,
  getResetPage,
  postResetPassword,
  getUserInfo,
} = require("../../controllers/client/user.controller");
const router = express.Router();
const validate = require("../../validation/client/user.validate");
const requireAuth = require("../../middlewares/clients/auth.middleware");

router.get("/register", getRegisterPage);
router.post("/register", validate.registerPost, registerPost);

router.get("/login", getLoginPage);
router.post("/login", validate.loginPost, loginPost);

router.get("/logout", logout);

router.get("/password/forgot", getForgotPasswordPage);
router.post(
  "/password/forgot",
  validate.forgotPasswordPost,
  postForgotPassword
);
router.get("/password/otp", getOtpPage);
router.post("/password/otp", postOtp);
router.get("/password/reset", getResetPage);
router.post("/password/reset", validate.resetPasswordPost, postResetPassword);

router.get("/info", requireAuth.requireAuth, getUserInfo);
module.exports = router;
