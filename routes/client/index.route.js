const productRoutes = require("./product.route");
const homeRoutes = require("./home.route");
const controller = require("../../controllers/client/home.controller");
const categoryMiddleware = require("../../middlewares/clients/category.middleware");

module.exports = (app) => {
  app.use(categoryMiddleware.category)
  app.get("/", controller.index);
  app.use("/products",  productRoutes);
  app.use("/home", homeRoutes);
};
