const Users = require("../../models/users.model");
const RoomChat = require("../../models/room-chat.model");

const getRoomChatList = async (req, res) => {
  try {
    const userId = res.locals.user.id;
    const roomChatList = await RoomChat.find({
      "users.user_id": userId,
      deleted: false,
      typeRoom: "group",
    }).select("title");
    res.render("client/pages/rooms-chat/index", {
      pageTitle: "Danh sách phòng chat",
      roomChatList,
    });
  } catch (error) {
    console.log(error);
  }
};

const getCreateRoomChat = async (req, res) => {
  try {
    const friendList = res.locals.user.friendList;
    for (const friend of friendList) {
      const infoFriend = await Users.findOne({
        _id: friend.user_id,
        deleted: false,
        status: "active",
      }).select("id fullName avatar");
      friend.infoFriend = infoFriend;
    }

    res.render("client/pages/rooms-chat/create", {
      pageTitle: "Tạo phòng",
      friendList,
    });
  } catch (error) {
    console.log(error);
  }
};

const postCreateRoomChat = async (req, res) => {
  try {
    const title = req.body.title;
    const usersId = req.body.usersId;
    const newRoomChat = {
      title: title,
      avatar: "",
      typeRoom: "group",
      users: [],
    };
    if (typeof usersId == "string") {
      newRoomChat.users.push({
        user_id: usersId,
        role: "user",
      });
    } else {
      usersId.forEach((userId) => {
        newRoomChat.users.push({
          user_id: userId,
          role: "user",
        });
      });
    }
    newRoomChat.users.push({
      user_id: res.locals.user.id,
      role: "superAdmin",
    });
    const room = new RoomChat(newRoomChat);
    await room.save();
    res.redirect(`/chat/${room.id}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getRoomChatList,
  getCreateRoomChat,
  postCreateRoomChat,
};
