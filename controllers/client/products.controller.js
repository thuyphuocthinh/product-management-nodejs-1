const Product = require("../../models/product.model");

// [GET] /
module.exports.index = async (req, res) => {
  try {
    const products = await Product.find({
      status: "active",
      deleted: false,
    }).sort({ position: "desc" });

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

    res.render("client/pages/products/products", {
      pageTitle: "Trang sản phẩm",
      products: newProducts,
    });
  } catch (error) {
    console.log("Error lay danh sach san pham: ", error);
  }
};

// [GET] /products/:slug
module.exports.detail = async (req, res) => {
  const slug = req.params.slug;
  try {
    const find = { slug: slug, deleted: false, status: "active" };
    const product = await Product.findOne(find);
    res.render("client/pages/products/detail", {
      pageTitle: `Chi tiết sản phẩm ${product.title}`,
      product,
    });
  } catch (error) {
    res.redirect("/products");
  }
};
