const ProductCategory = require("../models/products-category.model");
module.exports.getSubCategory = async (parent_id) => {
  const getCategory = async (parent_id) => {
    const subs = await ProductCategory.find({
      parent_id: parent_id,
      deleted: false,
      status: "active",
    });
    let allSubs = [...subs];
    for (const sub of subs) {
      const childs = await getCategory(sub.id);
      allSubs.concat(childs);
    }
    return allSubs;
  };
  const result = await getCategory(parent_id);
  return result;
};
