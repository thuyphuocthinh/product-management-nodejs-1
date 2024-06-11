module.exports.priceNewProduct = (products) => {
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
  return newProducts;
};


module.exports.priceNewAProduct = (product) => {
  const newPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(0);
  product.newPrice = newPrice;
  return product;
};
