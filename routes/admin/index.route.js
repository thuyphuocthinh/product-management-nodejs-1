const { prefixAdmin } = require("../../config/system");
const dashboardRoutes = require("./dashboard.route");
const productsRoutes = require("./products.route");
const productsCategoryRoutes = require("./products-category.route");
const rolesRoutes = require("./role.route");
const accountsRoutes = require("./account.route");
const authRoutes = require("./auth.route");
const authMiddlware = require("../../middlewares/admin/auth.middleware");

module.exports = (app) => {
  app.use(
    `${prefixAdmin}/dashboard`,
    authMiddlware.requireAuth,
    dashboardRoutes
  );
  app.use(`${prefixAdmin}/products`, authMiddlware.requireAuth, productsRoutes);
  app.use(
    `${prefixAdmin}/products-category`,
    authMiddlware.requireAuth,
    productsCategoryRoutes
  );
  app.use(`${prefixAdmin}/roles`, authMiddlware.requireAuth, rolesRoutes);
  app.use(`${prefixAdmin}/accounts`, authMiddlware.requireAuth, accountsRoutes);
  app.use(`${prefixAdmin}/auth`, authRoutes);
};
