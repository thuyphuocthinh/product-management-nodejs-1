const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const settingsGeneralSchema = new mongoose.Schema(
  {
    websiteName: String,
    logo: String,
    phone: String,
    email: String,
    address: String,
    copyright: String,
  },
  { timestamps: true }
);

const SettingsGeneral = mongoose.model(
  "SettingsGeneral",
  settingsGeneralSchema,
  "settings-general"
);

module.exports = SettingsGeneral;
