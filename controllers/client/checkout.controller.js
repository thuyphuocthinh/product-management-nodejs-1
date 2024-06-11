const Cart = require("../../models/carts.model");
const Products = require("../../models/product.model");
const Order = require("../../models/order.model");
const { priceNewAProduct } = require("../../helpers/products");

// [GET]
const getCheckOut = async (req, res) => {
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
    res.render("client/pages/checkout/index", {
      pageTitle: "Đặt hàng",
      cart: cart,
    });
  } catch (error) {
    console.log(error);
  }
};

// [POST]
const order = async (req, res) => {
  try {
    const cartId = req.cookies.cartId;
    const userInfo = req.body;
    const cart = await Cart.findOne({ _id: cartId });

    let products = [];
    if (cart.products.length > 0) {
      for (const item of cart.products) {
        const product = await Products.findOne({ _id: item.product_id });
        const objectProduct = {
          product_id: item.product_id,
          price: product.price,
          discountPercentage: product.discountPercentage,
          quantity: item.quantity,
        };
        products.push(objectProduct);
      }

      const objectOrder = {
        cart_id: cartId,
        userInfo: userInfo,
        products: products,
      };
      const order = new Order(objectOrder);
      await order.save();

      if (res.locals.user) {
        await order.updateOne(
          {
            _id: order.id,
          },
          { user_id: res.locals.user.id }
        );
      }
      
      // order successfully => cart quantity = 0
      await Cart.updateOne(
        {
          _id: cartId,
        },
        {
          products: [],
        }
      );

      // Cập nhật số sản phẩm còn lại trong kho sản phẩm
      for (const item of order.products) {
        const product = await Products.findOne({ _id: item.product_id });
        await product.updateOne({
          stock: product.stock - item.quantity,
        });
      }
      // Chuyển hướng sang trang đặt hàng thành công
      res.redirect(`/checkout/success/${order.id}`);
    }
  } catch (error) {
    console.log(error);
  }
};

// [GET] /success/:id
const getSuccessPage = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await Order.findOne({
      _id: orderId,
    });
    let totalPrice = 0;
    for (const product of order.products) {
      const productInfo = await Products.findOne({ _id: product.product_id });
      product.title = productInfo.title;
      product.newPrice =
        productInfo.price -
        (productInfo.price * productInfo.discountPercentage) / 100;
      product.totalPrice = product.newPrice * product.quantity;
      totalPrice += product.newPrice * product.quantity;
    }
    order.totalPrice = totalPrice;
    res.render("client/pages/checkout/success", {
      pageTitle: "Đặt hàng thành công",
      order,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getCheckOut,
  order,
  getSuccessPage,
};
