const Role = require("../../models/role.model");
const systemConfig = require("../../config/system");

const getRoles = async (req, res) => {
  let find = {
    deleted: false,
  };

  try {
    const records = await Role.find(find);
    res.render("admin/pages/roles/index", {
      pageTitle: "Nhóm quyền",
      records,
    });
  } catch (error) {
    console.log(error);
  }
};

const getRolesCreate = async (req, res) => {
  try {
    res.render("admin/pages/roles/create", {
      pageTitle: "Tạo nhóm quyền ",
    });
  } catch (error) {
    console.log(error);
  }
};

const postRolesCreate = async (req, res) => {
  try {
    const record = new Role(req.body);
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  } catch (error) {
    console.log(error);
  }
};

const getRolesEdit = async (req, res) => {
  try {
    const id = req.params.id;
    const role = await Role.findOne({ _id: id });
    res.render("admin/pages/roles/edit", {
      pageTitle: "Chỉnh sửa nhóm quyền",
      role,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  }
};

const patchRolesEdit = async (req, res) => {
  try {
    const id = req.params.id;
    await Role.updateOne({ _id: id }, req.body);
    res.redirect("back");
  } catch (error) {
    console.log(error);
  }
};

const getPermissions = async (req, res) => {
  let find = { deleted: false };
  try {
    const records = await Role.find(find);
    res.render("admin/pages/roles/permissions", {
      pageTitle: "Phân quyền",
      records,
    });
  } catch (error) {
    console.log(error);
  }
};

const patchRolesPermissions = async (req, res) => {
  try {
    const permissions = JSON.parse(req.body.permissions);
    for (const item of permissions) {
      await Role.updateOne({ _id: item.id }, { permissions: item.permissions });
    }
    res.redirect("back");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getRoles,
  getRolesCreate,
  postRolesCreate,
  getRolesEdit,
  patchRolesEdit,
  getPermissions,
  patchRolesPermissions,
};
