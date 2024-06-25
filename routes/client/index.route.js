const productRoutes = require("./product.route");
const homeRoutes = require("./home.route");
const controller = require("../../controllers/client/home.controller");
const searchRoute = require("../../routes/client/search.route");
const cartRoute = require("../../routes/client/cart.route");
const checkOutRoute = require("../../routes/client/checkout.route");
const userRoute = require("../../routes/client/user.route");
const chatRoute = require("../../routes/client/chat.route");
const usersRoute = require("../../routes/client/users.route");
const roomsChatRoute = require("../../routes/client/rooms-chat.route");
// middlewares
const categoryMiddleware = require("../../middlewares/clients/category.middleware");
const cartMiddleware = require("../../middlewares/clients/cart.middleware");
const userMiddleware = require("../../middlewares/clients/user.middleware");
const requireAuth = require("../../middlewares/clients/auth.middleware");

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
  app.use("/chat", requireAuth.requireAuth, chatRoute);
  app.use("/users", requireAuth.requireAuth, usersRoute);
  app.use("/rooms-chat", requireAuth.requireAuth, roomsChatRoute);
};
