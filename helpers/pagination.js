const Product = require("../models/product.model");

module.exports.pagination = (req, objectPagination, countProducts) => {
  if (req.query.page) {
    objectPagination.currentPage = Number(req.query.page);
    if (isNaN(objectPagination.currentPage)) {
      objectPagination.currentPage = 1;
    }
    objectPagination.skip =
      (objectPagination.currentPage - 1) * objectPagination.limitItems;
  }
 
  const totalPage = Math.ceil(countProducts / objectPagination.limitItems);
  objectPagination.totalPage = totalPage;
  return objectPagination;
};
