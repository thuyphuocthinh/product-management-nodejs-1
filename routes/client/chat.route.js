const express = require("express");
const { getChatPage } = require("../../controllers/client/chat.controller");
const router = express.Router();
// middleware
const chatMiddleware = require("../../middlewares/clients/chat.middleware");

router.get("/:roomChatId", chatMiddleware.isChatRoomAllowed, getChatPage);

module.exports = router;
