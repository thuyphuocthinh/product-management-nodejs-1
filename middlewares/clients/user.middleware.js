const User = require("../../models/users.model");

module.exports.infoUser = async (req, res, next) => {
  try {
    if (req.cookies.tokenUser) {
      const user = await User.findOne({
        tokenUser: req.cookies.tokenUser,
        deleted: false,
        status: "active",
      }).select("-password");
      if (user) {
        res.locals.user = user;
      }
    }
    // always next
    next();
  } catch (error) {
    console.log(error);
  }
};
