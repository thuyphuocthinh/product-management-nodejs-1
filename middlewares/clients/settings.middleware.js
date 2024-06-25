const SettingsGeneral = require("../../models/settings-general.model");

// no need to login
module.exports.settingsGeneral = async (req, res, next) => {
  const settingsGeneral = await SettingsGeneral.findOne({});
  res.locals.settingsGeneral = settingsGeneral;
  next();
};
