const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {
  try {
    const products = await Product.find({});
    res.render("./admin/pages/products/products.pug", {
      pageTitle: "Trang sản phẩm",
      products: products,
    });
  } catch (error) {
    console.log("Error lay danh sach san pham admin");
  }
};
