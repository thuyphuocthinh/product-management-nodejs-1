const handleChangeQuantity = () => {
  const quantities = document.querySelectorAll("input[name='quantity']");
  if (quantities.length > 0) {
    quantities.forEach((input) => {
      input.addEventListener("change", (e) => {
        const productId = input.getAttribute("product-id");
        const newQuantity = parseInt(e.target.value);
        if (newQuantity >= 1) {
          window.location.href = `/cart/update/${productId}/${newQuantity}`;
        }
      });
    });
  }
};

handleChangeQuantity();
