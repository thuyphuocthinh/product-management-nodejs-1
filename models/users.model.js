const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const generate = require("../helpers/generate");

const usersSchema = new mongoose.Schema(
  {
    fullName: String,
    password: String,
    email: String,
    phone: String,
    tokenUser: {
      type: String,
      default: generate.generateRandomString(30),
    },
    avatar: String,
    statusOnline: String,
    status: {
      type: String,
      default: "active",
    },
    // list of friends
    friendList: [
      {
        user_id: String,
        room_chat_id: String,
      },
    ],
    // list of friend-requests sent by others
    acceptFriends: Array,
    // list of friend-requests sent by this user
    requestFriends: Array,
    position: Number,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  { timestamps: true }
);

const User = mongoose.model("User", usersSchema, "users");

module.exports = User;
