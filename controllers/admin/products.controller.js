const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system");
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
      .sort({ position: "desc" })
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
  req.flash("success", "Updated status successfully");
  res.redirect("back");
};

// [PATCH] /admin/products/change-multi
module.exports.changeMultiStatus = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(",");
  switch (type) {
    case "active": {
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash(
        "success",
        `Updated  status successfully of ${ids.length} products`
      );
      break;
    }
    case "inactive": {
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash(
        "success",
        `Updated  status successfully of ${ids.length} products`
      );
      break;
    }
    case "deleteAll": {
      await Product.updateMany(
        { _id: { $in: ids } },
        { deleted: true, deletedAt: new Date() }
      );
      req.flash("success", `Deleted all successfully`);
      break;
    }
    case "changePosition": {
      for (const item of ids) {
        const itemArr = item.split("-");
        let [id, position] = itemArr;
        position = parseInt(position);
        await Product.updateOne({ _id: id }, { position: position });
      }
      req.flash("success", `Change positions successfully`);
      break;
    }
    default:
      console.log("Unknown type");
      break;
  }
  res.redirect("back");
};

// [DELETE] /admin/products/delete
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  // await Product.deleteOne({ _id: id });
  await Product.deleteOne(
    { _id: id },
    { deleted: true },
    {
      deletedAt: new Date(),
    }
  );
  req.flash("success", `Deleted product successfully`);
  res.redirect("back");
};

// [GET] /admin/products/create
module.exports.createItem = async (req, res) => {
  res.render("admin/pages/products/create", {
    pageTitle: "Thêm mới sản phẩm",
  });
};

// [POST] /admin/products/create
module.exports.createItemPost = async (req, res) => {
  // validate data before working with database

  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);

  if (req.body.position === "") {
    const count = await Product.countDocuments();
    req.body.position = count + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }

  const product = new Product(req.body);
  await product.save();
  req.flash("success", "Created product successfully");
  res.redirect(`${systemConfig.prefixAdmin}/products`);
};

// [GET] /admin/products/edit
module.exports.editItem = async (req, res) => {
  const productId = req.params.id;
  // get data from db
  const find = {
    deleted: false,
    _id: productId,
  };
  const product = await Product.findOne(find);
  // pass to pug in render
  res.render("admin/pages/products/edit", {
    pageTitle: "Chỉnh sửa sản phẩm",
    product: product,
  });
};

// [PATCH] /admin/products/edit
module.exports.editItemPatch = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  req.body.position = parseInt(req.body.position);

  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }
  try {
    await Product.updateOne({ _id: req.params.id }, req.body);
    req.flash("success", "Updated product successfully");
  } catch (error) {
    req.flash("error", "Updated product failed");
  }
  res.redirect("back");
};

// [GET] /admin/products/detail
module.exports.detail = async (req, res) => {
  try {
    const productId = req.params.id;
    // get data from db
    const find = {
      deleted: false,
      _id: productId,
    };
    const product = await Product.findOne(find);
    // pass to pug in render
    res.render("admin/pages/products/detail", {
      pageTitle: `Chi tiết sản phẩm ${product.title} `,
      product: product,
    });
  } catch (error) {}
};

