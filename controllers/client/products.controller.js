const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {
  try {
    const products = await Product.find({
      status: "active",
      deleted: false,
    });
    const newProducts = products.map((product) => {
      const newPrice = (
        product.price -
        (product.price * product.discountPercentage) / 100
      ).toFixed(0);

      return {
        ...product._doc,
        newPrice,
      };
    });
    console.log(newProducts);

    res.render("client/pages/products/products", {
      pageTitle: "Trang sản phẩm",
      products: newProducts,
    });
  } catch (error) {
    console.log("Error lay danh sach san pham: ", error);
  }
};
