const SettingsGeneral = require("../../models/settings-general.model");

const getSettingsGeneral = async (req, res) => {
  try {
    const settingsGeneral = await SettingsGeneral.findOne({});
    res.render("admin/pages/settings/general", {
      pageTitle: "Cài đặt chung",
      settingsGeneral,
    });
  } catch (error) {
    console.log(error);
  }
};

const patchSettingsGeneral = async (req, res) => {
  try {
    const settingsGeneral = await SettingsGeneral.findOne({});
    if (settingsGeneral) {
      await SettingsGeneral.updateOne(
        {
          _id: settingsGeneral.id,
        },
        req.body
      );
    } else {
      const record = new SettingsGeneral(req.body);
      await record.save();
    }
    req.flash("success", "Cập nhật cài đặt chung thành công");
    res.redirect("back");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getSettingsGeneral,
  patchSettingsGeneral,
};
