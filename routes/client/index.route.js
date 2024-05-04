const productRoutes = require("./product.route");
const homeRoutes = require("./home.route");
const controller = require("../../controllers/client/home.controller");

module.exports = (app) => {
  app.get("/", controller.index);  
  app.use("/products", productRoutes);
  app.use("/home", homeRoutes);
};
