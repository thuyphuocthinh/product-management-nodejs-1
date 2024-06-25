const ProductCategory = require("../../models/products-category.model");
const Account = require("../../models/accounts.model");
const Product = require("../../models/product.model");
const User = require("../../models/users.model");

module.exports.dashboard = async (req, res) => {
  const statistic = {
    categoryProduct: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    product: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    account: {
      total: 0,
      active: 0,
      inactive: 0,
    },
    user: {
      total: 0,
      active: 0,
      inactive: 0,
    },
  };

  try {
    statistic.categoryProduct.total = await ProductCategory.countDocuments({
      deleted: false,
    });
    statistic.categoryProduct.active = await ProductCategory.countDocuments({
      deleted: false,
      status: "active",
    });
    statistic.categoryProduct.inactive = await ProductCategory.countDocuments({
      deleted: false,
      status: "inactive",
    });
    res.render("admin/pages/dashboard/index", {
      pageTitle: "Trang tổng quan",
      statistic,
    });
  } catch (error) {
    console.log(error);
  }
};
