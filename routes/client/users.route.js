// for chat, friends

const express = require("express");
const {
  getNotFriends,
  getRequestFriends,
  getAcceptFriends,
  getFriendsList,
} = require("../../controllers/client/users.controller");
const router = express.Router();

router.get("/not-friend", getNotFriends);
router.get("/request", getRequestFriends);
router.get("/accept", getAcceptFriends);
router.get("/friends", getFriendsList);

module.exports = router;
