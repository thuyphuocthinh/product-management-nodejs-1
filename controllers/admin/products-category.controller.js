const ProductCategory = require("../../models/products-category.model");
const systemConfig = require("../../config/system");
const { tree } = require("../../helpers/createTree");
// [GET] /admin/products-category
const getProductsCategory = async (req, res) => {
  const find = {
    deleted: false,
  };

  try {
    const records = await ProductCategory.find(find);
    const newRecords = tree(records);

    res.render("admin/pages/products-category/index", {
      pageTitle: "Danh mục sản phẩm",
      records: newRecords,
    });
  } catch (error) {
    console.log(error);
  }
};

// [GET] /admin/products-category/create
const getProductsCategoryCreate = async (req, res) => {
  let find = {
    deleted: false,
  };

  try {
    const records = await ProductCategory.find(find);
    const newRecords = tree(records);

    res.render("admin/pages/products-category/create", {
      pageTitle: "Tạo danh mục sản phẩm mới",
      records: newRecords,
    });
  } catch (error) {
    console.log(error);
  }
};

// [POST] /admin/products-category/create
const createProductCategory = async (req, res) => {
  try {
    const permissions = res.locals.role.permissions;
    if (!permissions.includes("product-category_create")) {
      res.send("403");
      return;
    }
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

// [GET] /admin/products-category/edit/:id

const getProductsCategoryEdit = async (req, res) => {
  try {
    // Get product
    const id = req.params.id;
    const product = await ProductCategory.findOne({ _id: id, deleted: false });

    // Get parent categories
    let find = {
      deleted: false,
    };
    const records = await ProductCategory.find(find);
    const newRecords = tree(records);
    res.render("admin/pages/products-category/edit", {
      pageTitle: "Chỉnh sửa danh mục sản phẩm",
      product,
      records: newRecords,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
    console.log(error);
  }
};

const patchProductsCategoryEdit = async (req, res) => {
  try {
    const id = req.params.id;
    req.body.position = parseInt(req.body.position);
    await ProductCategory.updateOne({ _id: id }, req.body);
    res.redirect("back");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProductsCategory,
  getProductsCategoryCreate,
  createProductCategory,
  getProductsCategoryEdit,
  patchProductsCategoryEdit,
};
