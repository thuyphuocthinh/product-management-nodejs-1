const User = require("../../models/users.model");

module.exports.requireAuth = async (req, res, next) => {
  if (!req.cookies.tokenUser) {
    res.redirect(`/user/login`);
  } else {
    const user = await User.findOne({
      tokenUser: req.cookies.tokenUser,
      deleted: false,
    }).select("-password");
    if (user) {
      res.locals.user = user;
      next();
    } else {
      res.redirect(`/user/login`);
    }
  }
};
