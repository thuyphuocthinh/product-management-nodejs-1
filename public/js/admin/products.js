const changeStatus = () => {
  const statusBtns = document.querySelectorAll("[button-change-status]");
  if (statusBtns) {
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");

    statusBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const dataId = btn.getAttribute("data-id");
        const dataStatus = btn.getAttribute("data-status");
        let statusChange = dataStatus === "active" ? "inactive" : "active";
        const action = path + `/${statusChange}/${dataId}?_method=PATCH`;
        formChangeStatus.action = action;
        formChangeStatus.submit();
      });
    });
  }
};

const changeMultiStatus = () => {
  // variables
  const checkBoxAll = document.querySelector("input[name='checkall'");
  const checkBoxes = document.querySelectorAll(
    "[checkbox-multi] tbody input[type='checkbox']"
  );
  const ids = document.querySelector("input[name='ids']");
  const formChangeMulti = document.querySelector("[form-change-multi]");
  let idsArr = [];
  // check
  if (checkBoxAll && checkBoxes && ids) {
    checkBoxAll.addEventListener("click", () => {
      if (checkBoxAll.checked) {
        checkBoxes.forEach((checkBox) => {
          const value = checkBox.getAttribute("value");
          checkBox.checked = true;
          idsArr.push(value);
        });
      } else {
        checkBoxes.forEach((checkBox) => {
          checkBox.checked = false;
        });
        idsArr = [];
      }
      ids.value = idsArr.join(",");
    });

    checkBoxes.forEach((checkBox) => {
      checkBox.addEventListener("click", () => {
        const numOfCheckBoxes = document.querySelectorAll(
          "[checkbox-multi] tbody input[type='checkbox']:checked"
        );
        const value = checkBox.getAttribute("value");
        const valueIndex = idsArr.findIndex((v) => v === value);
        if (checkBox.checked) {
          idsArr.push(value);
        } else {
          if (valueIndex !== -1) {
            idsArr.splice(valueIndex, 1);
          }
        }
        if (numOfCheckBoxes.length === checkBoxes.length)
          checkBoxAll.checked = true;
        else checkBoxAll.checked = false;
        ids.value = idsArr.join(",");
      });
    });
  }
  // apply
  if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
      e.preventDefault();
      if (idsArr.length === 0) alert("Vui lòng chọn ít nhất 1 sản phẩm");
      else formChangeMulti.submit();
    });
  }
};

const deleteProduct = () => {
  const btnDeleteLists = document.querySelectorAll("[btn-delete]");
  if (btnDeleteLists && btnDeleteLists.length > 0) {
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path");
    btnDeleteLists.forEach((btn) => {
      btn.addEventListener("click", () => {
        const isConfirm = confirm("Bạn có chắc xóa sản phẩm này?");
        if (isConfirm) {
          const dataId = btn.getAttribute("data-id");
          const action = `${path}/${dataId}?_method=DELETE`;
          formDeleteItem.action = action;
          formDeleteItem.submit();
        }
      });
    });
  }
};

const productApp = () => {
  changeStatus();
  changeMultiStatus();
  deleteProduct();
};

productApp();
