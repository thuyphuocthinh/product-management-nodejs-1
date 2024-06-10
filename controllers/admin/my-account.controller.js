const Accounts = require("../../models/accounts.model");
const md5 = require("md5");

const getMyAccount = async (req, res) => {
  res.render("admin/pages/my-account/index", {
    pageTitle: "Hồ sơ cá nhân",
  });
};

const getMyAccountEdit = async (req, res) => {
  res.render("admin/pages/my-account/edit", {
    pageTitle: "Cập nhật thông tin cá nhân",
  });
};

const patchMyAccountEdit = async (req, res) => {
  try {
    const id = res.locals.user.id;
    
    const emailExist = await Accounts.findOne({
      _id: { $ne: id }, // ne => not equal
      email: req.body.email,
      deleted: false,
    });

    if (emailExist) {
      req.flash("error", `Email ${req.body.email} already exists!`);
    } else {
      if (req.body.password) {
        req.body.password = md5(req.body.password);
      } else {
        delete req.body.password;
      }
      await Accounts.updateOne({ _id: id }, req.body);
      req.flash("success", "Edited successfully");
    }

    res.redirect("back");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getMyAccount,
  getMyAccountEdit,
  patchMyAccountEdit,
};
