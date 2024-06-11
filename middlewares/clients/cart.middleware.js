const Cart = require("../../models/carts.model");
module.exports.cartId = async (req, res, next) => {
  if (req.cookies.cartId) {
    // already has cart
    const cart = await Cart.findOne({
      _id: req.cookies.cartId,
    });
    cart.totalQuantity = cart.products.reduce((total, item) => {
        total += item.quantity;
        return total;
    }, 0);
    res.locals.miniCart = cart;
  } else {
    // does not have cart yet
    try {
      const cart = new Cart();
      await cart.save();
      const expiresTime = 1000 * 60 * 24 * 365;
      res.cookie("cartId", cart.id, {
        expires: new Date(Date.now() + expiresTime),
      });
    } catch (error) {
      console.log(error);
    }
  }
  next();
};
