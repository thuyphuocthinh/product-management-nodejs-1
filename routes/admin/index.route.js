const { prefixAdmin } = require("../../config/system");
const dashboardRoutes = require("./dashboard.route");
const productsRoutes = require("./products.route");
const productsCategoryRoutes = require("./products-category.route");

module.exports = (app) => {
  app.use(`${prefixAdmin}/dashboard`, dashboardRoutes);
  app.use(`${prefixAdmin}/products`, productsRoutes);
  app.use(`${prefixAdmin}/products-category`, productsCategoryRoutes);
};
