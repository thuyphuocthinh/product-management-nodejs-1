const { priceNewProduct } = require("../../helpers/products");
const searchHelper = require("../../helpers/search");
const Product = require("../../models/product.model");

const search = async (req, res) => {
  const keyword = req.query.keyword;
  const regex = searchHelper.search(req).regex;
  try {
    let products = [];
    if (keyword) {
      products = await Product.find({
        title: regex,
        status: "active",
        deleted: false,
      });
      products = priceNewProduct(products);
    }
    res.render("client/pages/search/index", {
      pageTitle: "Kết quả tìm kiếm",
      keyword,
      products,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  search,
};
