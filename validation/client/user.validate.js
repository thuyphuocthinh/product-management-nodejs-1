module.exports.registerPost = (req, res, next) => {
  if (!req.body.fullName) {
    req.flash("error", "Vui lòng nhập fullName");
    res.redirect("back");
    return;
  }
  if (!req.body.email) {
    req.flash("error", "Vui lòng nhập email");
    res.redirect("back");
    return;
  }
  if (!req.body.password) {
    req.flash("error", "Vui lòng nhập password");
    res.redirect("back");
    return;
  }
  next();
};

module.exports.loginPost = (req, res, next) => {
  if (!req.body.email) {
    req.flash("error", "Vui lòng nhập email");
    res.redirect("back");
    return;
  }
  if (!req.body.password) {
    req.flash("error", "Vui lòng nhập password");
    res.redirect("back");
    return;
  }
  next();
};

module.exports.forgotPasswordPost = (req, res, next) => {
  if (!req.body.email) {
    req.flash("error", "Vui lòng nhập email");
    res.redirect("back");
    return;
  }
  next();
};

module.exports.resetPasswordPost = (req, res, next) => {
  if (!req.body.password) {
    req.flash("error", "Vui lòng nhập password");
    res.redirect("back");
    return;
  }
  if (!req.body.confirmPassword) {
    req.flash("error", "Vui lòng xac nhan password");
    res.redirect("back");
    return;
  }
  if (req.body.password !== req.body.confirmPassword) {
    req.flash("error", "Xac nhan mat khau khong khop");
    res.redirect("back");
    return;
  }
  next();
};
