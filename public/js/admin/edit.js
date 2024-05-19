const createItem = () => {
  const formCreateItem = document.querySelector("#form-edit-product");
  if (formCreateItem) {
    const formData = new FormData(formCreateItem);
    const [
      title,
      desc,
      price,
      discountPercentage,
      stock,
      thumbnail,
      position,
      status,
    ] = Object.entries(formData);
    formCreateItem.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  }
};

const productApp2 = () => {
  //   createItem();
};

productApp2();
