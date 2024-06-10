const Product = require("../../models/product.model");
const { priceNewProduct } = require("../../helpers/products");

module.exports.index = async (req, res) => {
  try {
    // get featured products
    const productsFeatured = await Product.find({
      featured: "featured1",
      deleted: false,
      status: "active",
    });
    const newProductsFeatured = priceNewProduct(productsFeatured);

    // get latest products
    const productsNew = await Product.find({
      deleted: false,
      status: "active",
    })
      .sort({ position: "desc" })
      .limit(6);
    const newProductsNew = priceNewProduct(productsNew);

    res.render("client/pages/home/index", {
      pageTitle: "Trang chủ",
      productsFeatured: newProductsFeatured,
      productsNew: newProductsNew,
    });
  } catch (error) {
    console.log(error);
  }
};

