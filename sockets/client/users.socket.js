const Users = require("../../models/users.model");
const RoomChat = require("../../models/room-chat.model");

module.exports = (res) => {
  _io.once("connection", (socket) => {
    const myUserId = res.locals.user.id;
    // CLIENT_ADD_FRIEND
    socket.on("CLIENT_ADD_FRIEND", async (userId) => {
      // Them id cua A vao acceptFriend cua B
      const existUserAinB = await Users.findOne({
        _id: userId,
        deleted: false,
        acceptFriends: myUserId,
      });

      if (!existUserAinB) {
        await Users.updateOne(
          {
            _id: userId,
          },
          {
            $push: { acceptFriends: myUserId },
          }
        );
      }

      // Them id cua B vao requestFriend cua A
      const existUserBinA = await Users.findOne({
        _id: myUserId,
        deleted: false,
        requestFriends: userId,
      });

      if (!existUserBinA) {
        await Users.updateOne(
          {
            _id: myUserId,
          },
          {
            $push: { requestFriends: userId },
          }
        );
      }

      // Lay do dai acceptFriends cua B tra ve cho B
      const infoUserB = await Users.findOne({
        _id: userId,
        deleted: false,
        status: "active",
      });

      const lengthAcceptFriends = infoUserB.acceptFriends.length;
      socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
        userId,
        lengthAcceptFriends,
      });

      // Lay thong tin cua A tra ve cho B
      const infoUserA = await Users.findOne({
        _id: myUserId,
        deleted: false,
        status: "active",
      }).select("id avatar fullName");

      socket.broadcast.emit("SERVER_RETURN_INFO_ACCEPT_FRIEND", {
        userId,
        infoUserA,
      });
    });
    // CLIENT_CANCEL_REQUEST
    socket.on("CLIENT_CANCEL_REQUEST", async (userId) => {
      // Xoa id cua A trong acceptFriend cua B
      const existUserAinB = await Users.findOne({
        _id: userId,
        deleted: false,
        acceptFriends: myUserId,
      });

      if (existUserAinB) {
        await Users.updateOne(
          {
            _id: userId,
          },
          {
            $pull: { acceptFriends: myUserId },
          }
        );
      }

      // Xoa id cua B trong requestFriend cua A
      const existUserBinA = await Users.findOne({
        _id: myUserId,
        deleted: false,
        requestFriends: userId,
      });

      if (existUserBinA) {
        await Users.updateOne(
          {
            _id: myUserId,
          },
          {
            $pull: { requestFriends: userId },
          }
        );
      }
      // Lay do dai acceptFriends cua B tra ve cho B
      const infoUserB = await Users.findOne({
        _id: userId,
        deleted: false,
        status: "active",
      });
      const lengthAcceptFriends = infoUserB.acceptFriends.length;
      socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
        userId,
        lengthAcceptFriends,
      });

      // Lay userId cua A de tra ve cho B
      socket.broadcast.emit("SERVER_RETURN_USER_ID_CANCEL_FRIEND", {
        userIdB: userId,
        userIdA: myUserId,
      });
    });
    // CLIENT_REFUSE_REQUEST
    socket.on("CLIENT_REFUSE_REQUEST", async (userId) => {
      // Xoa id cua A trong acceptFriend cua B
      const existUserAinB = await Users.findOne({
        _id: myUserId,
        deleted: false,
        acceptFriends: userId,
      });

      if (existUserAinB) {
        await Users.updateOne(
          {
            _id: myUserId,
          },
          {
            $pull: { acceptFriends: userId },
          }
        );
      }

      // Xoa id cua B trong requestFriend cua A
      const existUserBinA = await Users.findOne({
        _id: userId,
        deleted: false,
        requestFriends: myUserId,
      });

      if (existUserBinA) {
        await Users.updateOne(
          {
            _id: userId,
          },
          {
            $pull: { requestFriends: myUserId },
          }
        );
      }
    });
    // CLIENT_ACCEPT_FRIEND
    socket.on("CLIENT_ACCEPT_FRIEND", async (userId) => {
      const existUserAinB = await Users.findOne({
        _id: myUserId,
        deleted: false,
        acceptFriends: userId,
      });
      const existUserBinA = await Users.findOne({
        _id: userId,
        deleted: false,
        requestFriends: myUserId,
      });
      // Tao phong chat
      let roomChat;
      if (existUserBinA && existUserAinB) {
        roomChat = new RoomChat({
          typeRoom: "friend",
          users: [
            {
              userId: existUserAinB.id,
              role: "superAdmin",
            },
            {
              userId: existUserBinA.id,
              role: "superAdmin",
            },
          ],
        });
        await roomChat.save();
      }
      // Thêm {user_id, room_chat_id} của A vào friendList của B
      // Xoa id cua A trong acceptFriend cua B
      if (existUserAinB) {
        await Users.updateOne(
          {
            _id: myUserId,
          },
          {
            $push: {
              friendList: { user_id: userId, room_chat_id: roomChat.id },
            },
            $pull: { acceptFriends: userId },
          }
        );
      }
      // Thêm {user_id, room_chat_id} của B vào friendList của A
      // Xoa id cua B trong requestFriend cua A
      if (existUserBinA) {
        await Users.updateOne(
          {
            _id: userId,
          },
          {
            $push: {
              friendList: { user_id: myUserId, room_chat_id: roomChat.id },
            },
            $pull: { requestFriends: myUserId },
          }
        );
      }
    });
  });
};
