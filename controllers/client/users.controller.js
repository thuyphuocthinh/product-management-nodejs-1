const Users = require("../../models/users.model");
const usersSocket = require("../../sockets/client/users.socket");

const getNotFriends = async (req, res) => {
  try {
    // Socket
    usersSocket(res);

    // End Socket
    const userId = res.locals.user.id;
    const myUser = await Users.findOne({
      _id: userId,
      deleted: false,
      status: "active",
    });

    const requestFriends = myUser.requestFriends;
    const acceptFriends = myUser.acceptFriends;
    const friendList = myUser.friendList.map((item) => item.user_id);

    const users = await Users.find({
      $and: [
        {
          _id: { $ne: userId },
        },
        {
          _id: { $nin: requestFriends },
        },
        {
          _id: { $nin: acceptFriends },
        },
        {
          _id: { $nin: friendList },
        },
      ],
      status: "active",
      deleted: false,
    }).select("id avatar fullName");

    res.render("client/pages/users-chat/not-friend", {
      pageTitle: "Danh sách người dùng",
      users,
    });
  } catch (error) {
    console.log(error);
  }
};

const getRequestFriends = async (req, res) => {
  try {
    // Socket
    usersSocket(res);

    // End Socket
    const userId = res.locals.user.id;
    const myUser = await Users.findOne({
      _id: userId,
      deleted: false,
      status: "active",
    });
    const requestFriends = myUser.requestFriends;
    const users = await Users.find({
      $and: [
        {
          _id: { $ne: userId },
        },
        {
          _id: { $in: requestFriends },
        },
      ],
      deleted: false,
      status: "active",
    }).select("id avatar fullName");
    res.render("client/pages/users-chat/request", {
      pageTitle: "Lời mời đã gửi",
      users,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAcceptFriends = async (req, res) => {
  try {
    // Socket
    usersSocket(res);

    // End Socket
    const userId = res.locals.user.id;
    const myUser = await Users.findOne({
      _id: userId,
      deleted: false,
      status: "active",
    });

    const requestFriends = myUser.requestFriends;
    const acceptFriends = myUser.acceptFriends;

    const users = await Users.find({
      $and: [
        {
          _id: { $ne: userId },
        },
        {
          _id: { $nin: requestFriends },
        },
        {
          _id: { $in: acceptFriends },
        },
      ],
      status: "active",
      deleted: false,
    }).select("id avatar fullName");
    res.render("client/pages/users-chat/accept", {
      pageTitle: "Lời mời kết bạn",
      users,
    });
  } catch (error) {
    console.log(error);
  }
};

const getFriendsList = async (req, res) => {
  try {
    // Socket
    usersSocket(res);

    // End Socket
    const userId = res.locals.user.id;
    const myUser = await Users.findOne({
      _id: userId,
      deleted: false,
      status: "active",
    });

    const requestFriends = myUser.requestFriends;
    const acceptFriends = myUser.acceptFriends;
    const friendList = myUser.friendList.map((item) => item.user_id);

    const users = await Users.find({
      $and: [
        {
          _id: { $ne: userId },
        },
        {
          _id: { $nin: requestFriends },
        },
        {
          _id: { $nin: acceptFriends },
        },
        {
          _id: { $in: friendList },
        },
      ],
      status: "active",
      deleted: false,
    }).select("id avatar fullName statusOnline");

    // Lay ra roomChatId cho tung thang ban
    for (const user of users) {
      const infoUser = myUser.friendList.find(
        (item) => item.user_id === user.id
      );
      user.roomChatId = infoUser.room_chat_id;
    }

    res.render("client/pages/users-chat/friend", {
      pageTitle: "Danh sách bạn bè",
      users,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getNotFriends,
  getRequestFriends,
  getAcceptFriends,
  getFriendsList,
};
