const { priceNewAProduct } = require("../../helpers/products");
const Cart = require("../../models/carts.model");
const Products = require("../../models/product.model");
// [POST] /add/:productId
const addToCart = async (req, res) => {
  const productId = req.params.productId;
  const cartId = req.cookies.cartId;
  const objectCart = {
    product_id: productId,
    quantity: parseInt(req.body.quantity),
  };
  const cart = await Cart.findOne({ _id: cartId });
  const productExists = cart.products.find(
    (item) => item.product_id === productId
  );
  if (productExists) {
    const newQuantity = objectCart.quantity + productExists.quantity;
    await Cart.updateOne(
      {
        _id: cartId,
        "products.product_id": productId,
      },
      {
        "products.$.quantity": newQuantity,
      }
    );
  } else {
    await Cart.updateOne(
      { _id: cartId },
      {
        $push: { products: objectCart },
      }
    );
  }
  res.redirect("back");
};

// [GET]
const getCart = async (req, res) => {
  try {
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({ _id: cartId });
    let totalPrice = 0;
    if (cart.products.length > 0) {
      for (const item of cart.products) {
        const productId = item.product_id;
        let productInfo = await Products.findOne({
          _id: productId,
        });
        productInfo = priceNewAProduct(productInfo);
        productInfo.quantity = item.quantity;
        item.totalPrice = item.quantity * productInfo.newPrice;
        item.productInfo = productInfo;
        totalPrice += item.totalPrice;
      }
      cart.totalPrice = totalPrice;
    }
    res.render("client/pages/cart/index", {
      pageTitle: "Giỏ hàng",
      cart: cart,
    });
  } catch (error) {
    console.log(error);
  }
};

// [DELETE]
const deleteItem = async (req, res) => {
  const productId = req.params.productId;
  const cartId = req.cookies.cartId;
  try {
    await Cart.updateOne(
      {
        _id: cartId,
      },
      {
        $pull: { products: { product_id: productId } },
      }
    );
  } catch (error) {
    console.log(error);
  }
  res.redirect("back");
};

// [GET]
const updateQuantity = async (req, res) => {
  try {
    const productId = req.params.productId;
    const quantity = req.params.quantity;
    const cartId = req.cookies.cartId;
    await Cart.updateOne(
      {
        _id: cartId,
        "products.product_id": productId,
      },
      {
        "products.$.quantity": quantity,
      }
    );
    res.redirect("back");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addToCart,
  getCart,
  deleteItem,
  updateQuantity,
};
