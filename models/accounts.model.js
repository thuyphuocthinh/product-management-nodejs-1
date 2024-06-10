const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const generate = require("../helpers/generate");

const accountsScheme = new mongoose.Schema(
  {
    fullName: String,
    password: String,
    email: String,
    phone: String,
    token: {
      type: String,
      default: generate.generateRandomString(30),
    },
    avatar: String,
    role_id: String,
    status: String,
    position: Number,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  { timestamps: true }
);

const Accounts = mongoose.model("Accounts", accountsScheme, "accounts");

module.exports = Accounts;
