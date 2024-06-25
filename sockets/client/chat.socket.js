const Chat = require("../../models/chats.model");
const { uploadToCloudinary } = require("../../helpers/uploadCloudinary");

module.exports = (req, res) => {
  const userId = res.locals.user.id;
  const fullName = res.locals.user.fullName;
  const roomChatId = req.params.roomChatId;

  _io.once("connection", async (socket) => {
    socket.join(roomChatId);
    
    socket.on("CLIENT_SEND_MESSAGE", async (data) => {
      let images = [];
      for (const imageBuffer of data.images) {
        const link = await uploadToCloudinary(imageBuffer);
        images.push(link);
      }

      const chat = new Chat({
        user_id: userId,
        room_chat_id: req.params.roomChatId,
        content: data.content,
        images: images,
      });
      await chat.save();

      // Return data to clients
      _io.to(roomChatId).emit("SERVER_RETURN_MESSAGE", {
        userId: userId,
        fullName: fullName,
        content: data.content,
        images: images,
      });
    });

    socket.on("CLIENT_SEND_TYPING", (type) => {
      socket.broadcast.to(roomChatId).emit("SERVER_RETURN_TYPING", {
        userId: userId,
        fullName: fullName,
        type: type,
      });
    });
  });
};
