const RoomChat = require("../../models/room-chat.model");

module.exports.isChatRoomAllowed = async (req, res, next) => {
  try {
    const userId = res.locals.user.id;
    const roomChatId = req.params.roomChatId;
    const room = await RoomChat.findOne({
      _id: roomChatId,
      deleted: false,
      "users.user_id": userId,
    });
    if (room) {
      next();
    } else {
      res.redirect("/");
    }
  } catch (error) {
    res.redirect("/");
    console.log(error);
  }
};
