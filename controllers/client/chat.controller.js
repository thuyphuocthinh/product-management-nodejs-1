const Chat = require("../../models/chats.model");
const User = require("../../models/users.model");
const socket = require("../../sockets/client/chat.socket");

const getChatPage = async (req, res) => {
  const roomChatId = req.params.roomChatId;

  // socket
  socket(req, res);

  // end socket
  const chats = await Chat.find({
    room_chat_id: roomChatId,
    deleted: false,
  });

  for (const chat of chats) {
    const infoUser = await User.findOne({
      _id: chat.user_id,
    }).select("fullName");
    chat.infoUser = infoUser;
  }

  res.render("client/pages/chat/index", {
    pageTitle: "Chat",
    chats,
  });
};

module.exports = {
  getChatPage,
};
