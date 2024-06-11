const User = require("../../models/users.model");
const md5 = require("md5");
const ForgotPassword = require("../../models/forgot-password.model");
const Cart = require("../../models/carts.model");
const { generateRandomNumber } = require("../../helpers/generate");
const { sendMail } = require("../../helpers/sendMail");

const getRegisterPage = async (req, res) => {
  res.render("client/pages/users/register", {
    pageTitle: "Đăng kí tài khoản",
  });
};

const registerPost = async (req, res) => {
  try {
    const emailExist = await User.findOne({
      email: req.body.email,
      deleted: false,
    });

    if (emailExist) {
      console.log("Email da ton tai");
      return;
    } else {
      req.body.password = md5(req.body.password);
      const user = new User(req.body);
      await user.save();
      res.cookie("tokenUser", user.tokenUser);
    }

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const getLoginPage = async (req, res) => {
  res.render("client/pages/users/login", {
    pageTitle: "Đăng nhập",
  });
};

const loginPost = async (req, res) => {
  try {
    const emailExist = await User.findOne({
      email: req.body.email,
      deleted: false,
    });

    if (!emailExist) {
      console.log("Email khong ton tai");
      res.redirect("back");
      return;
    }
    if (emailExist.password !== md5(req.body.password)) {
      console.log("Password khong chinh xac");
      res.redirect("back");
      return;
    }

    if (emailExist.status === "inactive") {
      console.log("Tai khoan dang bi khoa");
      res.redirect("back");
      return;
    }

    res.cookie("tokenUser", emailExist.tokenUser);

    // Save user_id into cart collection
    await Cart.updateOne(
      {
        _id: req.cookies.cartId,
      },
      {
        user_id: emailExist.id,
      }
    );

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const logout = async (req, res) => {
  res.clearCookie("tokenUser");
  res.redirect("/user/login");
};

const getForgotPasswordPage = async (req, res) => {
  res.render("client/pages/users/forgot-password", {
    pageTitle: "Lấy lại mật khẩu",
  });
};

const postForgotPassword = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({
      email: email,
      deleted: "false",
    });

    if (!user) {
      console.log("Email khong ton tai");
      res.redirect("back");
      return;
    }

    // Step 1: create OTP and save it in collection
    const otp = generateRandomNumber(8);
    const objectForgotPassword = {
      email: email,
      otp: otp,
      expireAt: Date.now(),
    };

    const forgotPassword = new ForgotPassword(objectForgotPassword);
    await forgotPassword.save();

    // Step 2: Send OTP to user's email
    const subject = "Mã OTP xác minh lấy lại mật khẩu";
    const html = `
        Mã OTP xác minh lấy lại mật khẩu là: <b>${otp}</b>.
        <br />
        Thời hạn sử dụng là 3 phút.
        <br />
        Lưu ý, không được để lộ mã OTP.
    `;
    sendMail(email, subject, html);

    // Redirect to the form to type OTP
    res.redirect(`/user/password/otp?email=${email}`);
  } catch (error) {
    console.log(error);
  }
};

const getOtpPage = async (req, res) => {
  const email = req.query.email;
  res.render("client/pages/users/otp-password", {
    pageTitle: "Nhập mã OTP",
    email,
  });
};

const postOtp = async (req, res) => {
  const { email, otp } = req.body;
  const result = await ForgotPassword.findOne({
    email: email,
    otp: otp,
  });

  if (!result) {
    console.log("OTP khong hop le");
    res.redirect("back");
    return;
  }

  const user = await User.findOne({ email: email });
  res.cookie("tokenUser", user.tokenUser);
  res.redirect(`/user/password/reset`);
};

const getResetPage = async (req, res) => {
  res.render("client/pages/users/reset-password", {
    pageTitle: "Đổi mật khẩu",
  });
};

const postResetPassword = async (req, res) => {
  try {
    const password = req.body.password;
    const tokenUser = req.cookies.tokenUser;
    await User.updateOne(
      {
        tokenUser: tokenUser,
      },
      {
        password: md5(password),
      }
    );
    console.log("Reset password thanh cong");
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const getUserInfo = async (req, res) => {
  res.render("client/pages/users/info", {
    pageTitle: "Thông tin tài khoản",
  });
};

module.exports = {
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
};
