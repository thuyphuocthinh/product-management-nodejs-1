const productRoutes = require("./product.route");
const homeRoutes = require("./home.route");
const controller = require("../../controllers/client/home.controller");
const categoryMiddleware = require("../../middlewares/clients/category.middleware");
const searchRoute = require("../../routes/client/search.route");
const cartMiddleware = require("../../middlewares/clients/cart.middleware");
const cartRoute = require("../../routes/client/cart.route");
const checkOutRoute = require("../../routes/client/checkout.route");
const userRoute = require("../../routes/client/user.route");
const userMiddleware = require("../../middlewares/clients/user.middleware");

module.exports = (app) => {
  app.use(categoryMiddleware.category);
  app.use(cartMiddleware.cartId);
  app.use(userMiddleware.infoUser);
  app.get("/", controller.index);
  app.use("/products", productRoutes);
  app.use("/home", homeRoutes);
  app.use("/search", searchRoute);
  app.use("/cart", cartRoute);
  app.use("/checkout", checkOutRoute);
  app.use("/user", userRoute);
};
