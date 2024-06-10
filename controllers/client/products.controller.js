const { priceNewProduct } = require("../../helpers/products");
const { getSubCategory } = require("../../helpers/products-categories");
const Product = require("../../models/product.model");
const ProductCategory = require("../../models/products-category.model");

// [GET] /
module.exports.index = async (req, res) => {
  try {
    const products = await Product.find({
      status: "active",
      deleted: false,
    }).sort({ position: "desc" });

    const newProducts = priceNewProduct(products);

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

module.exports.category = async (req, res) => {
  try {
    const slug = req.params.slugCategory;

    const category = await ProductCategory.findOne({
      slug: slug,
      status: "active",
      deleted: false,
    });

    const listSubCategory = await getSubCategory(category.id);

    const listSubCategoryId = listSubCategory.map((item) => item.id);

    const products = await Product.find({
      product_category_id: { $in: [category.id, ...listSubCategoryId] },
      deleted: false,
      status: "active",
    }).sort({ position: "desc" });

    const newProdutcs = priceNewProduct(products);

    res.render("client/pages/products/products", {
      pageTitle: category.title,
      products: newProdutcs,
    });
  } catch (error) {
    console.log(error);
  }
};
