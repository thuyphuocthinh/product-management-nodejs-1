const createTreeHelper = require("../../helpers/createTree");
const ProductsCategories = require("../../models/products-category.model");

module.exports.category = async (req, res, next) => {
  const find = { deleted: false };
  const productsCategories = await ProductsCategories.find(find);
  const newProductsCategories = createTreeHelper.tree(productsCategories);
  res.locals.layoutProductsCategories = newProductsCategories;
  next();
};
