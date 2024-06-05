const Accounts = require("../../models/accounts.model");
const Roles = require("../../models/role.model");
const systemConfig = require("../../config/system");
const md5 = require("md5");

const getAccounts = async (req, res) => {
  let find = {
    deleted: false,
  };

  const records = await Accounts.find(find).select("-password -token");
  for (const record of records) {
    const role = await Roles.findOne(
      { _id: record.role_id },
      { deleted: false }
    );
    record.role = role;
  }

  res.render("admin/pages/accounts/index", {
    pageTitle: "Danh sách tài khoản",
    records,
  });
};

const getAccountsCreate = async (req, res) => {
  try {
    const roles = await Roles.find({ deleted: false });

    res.render("admin/pages/accounts/create", {
      pageTitle: "Tạo tài khoản",
      roles,
    });
  } catch (error) {}
};

const postAccountsCreate = async (req, res) => {
  try {
    const emailExist = await Accounts.findOne({
      email: req.body.email,
      deleted: false,
    });

    if (emailExist) {
      alert("Email already exists!");
      req.flash("error", "Email already exists");
    } else {
      req.body.password = md5(req.body.password);
      const account = new Accounts(req.body);
      account.save();
    }
  } catch (error) {
    console.log(error);
  } finally {
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
};

const getAccountsEdit = async (req, res) => {
  try {
    const id = req.params.id;
    const account = await Accounts.findOne(
      { _id: id },
      { deleted: false }
    ).select("-password -token");
    const roles = await Roles.find({ deleted: false });
    res.render("admin/pages/accounts/edit", {
      pageTitle: "Chỉnh sửa tài khoản",
      account,
      roles,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
};

const patchAccountsEdit = async (req, res) => {
  try {
    const id = req.params.id;

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
  } catch (error) {}
};

module.exports = {
  getAccounts,
  getAccountsCreate,
  postAccountsCreate,
  getAccountsEdit,
  patchAccountsEdit,
};
