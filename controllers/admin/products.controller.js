const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");

const Product = require("../../models/product.model");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  try {
    // filter
    let filter = {
      deleted: false,
    };
    if (req.query.status) {
      filter.status = req.query.status;
    }
    let filterStatus = filterStatusHelper.filterStatus(req);

    // search
    const objectSearch = searchHelper.search(req);
    if (objectSearch.regex) {
      filter.regex = objectSearch.regex;
    }
    // pagination
    const countProducts = await Product.countDocuments(filter);
    let objectPagination = paginationHelper.pagination(
      req,
      {
        currentPage: 1,
        limitItems: 4,
      },
      countProducts
    );

    // Call DB
    let products = await Product.find(filter)
      .limit(objectPagination.limitItems)
      .skip(objectPagination.skip);

    res.render("./admin/pages/products/products.pug", {
      pageTitle: "Trang sản phẩm",
      products: products,
      filterStatus: filterStatus,
      keyword: objectSearch.keyword,
      pagination: objectPagination,
    });
  } catch (error) {
    console.log("Error lay danh sach san pham admin");
  }
};

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  await Product.updateOne({ _id: id }, { status: status });
  res.redirect("back");
};

// [PATCH] /admin/products/change-multi
module.exports.changeMultiStatus = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(",");
  switch (type) {
    case "active": {
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      break;
    }
    case "inactive": {
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      break;
    }
    default:
      console.log("Unknown type");
      break;
  }
  res.redirect("back");
};
