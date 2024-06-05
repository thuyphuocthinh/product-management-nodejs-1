const Accounts = require("../../models/accounts.model");
const md5 = require("md5");
const systemConfig = require("../../config/system");

const getLoginForm = async (req, res) => {
  if (req.cookies.token) {
    const user = await Accounts.findOne({
      token: req.cookies.token,
      deleted: false,
    });
    if (user) {
      res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
    } else {
      res.render("admin/pages/auth/login", {
        pageTitle: "Trang đăng nhập",
      });
    }
  } else {
    res.render("admin/pages/auth/login", {
      pageTitle: "Trang đăng nhập",
    });
  }
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Accounts.findOne({
      email: email,
      deleted: false,
    });

    if (!user) {
      req.flash("error", "Email does not exist");
      res.redirect("back");
      return;
    }

    if (md5(password) !== user.password) {
      req.flash("error", "Incorrect password");
      res.redirect("back");
      return;
    }

    if (user.status !== "active") {
      req.flash("error", "Account is being locked");
      res.redirect("back");
      return;
    }
    res.cookie("token", user.token);
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
  } catch (error) {
    console.log(error);
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
};

module.exports = {
  getLoginForm,
  postLogin,
  logout,
};
