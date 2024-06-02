const ProductCategory = require("../../models/products-category.model");
const systemConfig = require("../../config/system");
const { tree } = require("../../helpers/createTree");
// [GET] /admin/products-category
const getProductsCategory = async (req, res) => {
  const find = {
    deleted: false,
  };

  const records = await ProductCategory.find(find);
  const newRecords = tree(records);

  res.render("admin/pages/products-category/index", {
    pageTitle: "Danh mục sản phẩm",
    records: newRecords,
  });
};

// [GET] /admin/products-category/create
const getProductsCategoryCreate = async (req, res) => {
  let find = {
    deleted: false,
  };

  const records = await ProductCategory.find(find);
  const newRecords = tree(records);

  res.render("admin/pages/products-category/create", {
    pageTitle: "Tạo danh mục sản phẩm mới",
    records: newRecords,
  });
};

// [POST] /admin/products-category/create
const createProductCategory = async (req, res) => {
  try {
    if (req.body.position === "") {
      const count = await ProductCategory.countDocuments();
      req.body.position = count + 1;
    } else {
      req.body.position = parseInt(req.body.position);
    }
    const record = new ProductCategory(req.body);
    await record.save();
  } catch (error) {
    console.log(error);
  } finally {
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
  }
};

module.exports = {
  getProductsCategory,
  getProductsCategoryCreate,
  createProductCategory,
};
