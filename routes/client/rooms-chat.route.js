const express = require("express");
const router = express.Router();
// middleware
const chatMiddleware = require("../../middlewares/clients/chat.middleware");
const {
  getRoomChatList,
  getCreateRoomChat,
  postCreateRoomChat,
} = require("../../controllers/client/rooms-chat.controller");

router.get("/", getRoomChatList);
router.get("/create", getCreateRoomChat);
router.post("/create", postCreateRoomChat);

module.exports = router;
