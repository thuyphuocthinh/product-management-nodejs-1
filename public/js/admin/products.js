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
  const selectOption = document.querySelector("[select-option]");
  let typeChange = "";
  let idsArr = [];

  // check
  if (checkBoxAll && checkBoxes && ids) {
    checkBoxAll.addEventListener("click", () => {
      if (checkBoxAll.checked) {
        checkBoxes.forEach((checkBox) => {
          const value = checkBox.getAttribute("value");
          checkBox.checked = true;
          const position = checkBox
            .closest("tr")
            .querySelector("input[name='position'").value;
          idsArr.push(`${value}-${position}`);
        });
      } else {
        checkBoxes.forEach((checkBox) => {
          checkBox.checked = false;
        });
        idsArr = [];
      }
    });

    checkBoxes.forEach((checkBox) => {
      checkBox.addEventListener("click", () => {
        const numOfCheckBoxes = document.querySelectorAll(
          "[checkbox-multi] tbody input[type='checkbox']:checked"
        );
        const valueID = checkBox.getAttribute("value");
        const valueIndex = idsArr.findIndex((v) => v === valueID);
        if (checkBox.checked) {
          const position = checkBox
            .closest("tr")
            .querySelector("input[name='position'").value;
          idsArr.push(`${valueID}-${position}`);
        } else {
          if (valueIndex !== -1) {
            idsArr.splice(valueIndex, 1);
          }
        }
        if (numOfCheckBoxes.length === checkBoxes.length)
          checkBoxAll.checked = true;
        else checkBoxAll.checked = false;
      });
    });
  }

  selectOption.addEventListener("change", (e) => {
    const { value } = e.target;
    typeChange = value;
    switch (typeChange) {
      case "changePosition": {
        ids.value = idsArr.join(",");
        break;
      }
      case "active":
      case "inactive":
      case "deleteAll":
        let tempArr = idsArr.map((id) => {
          return id.slice(0, id.indexOf("-"));
        });
        ids.value = tempArr.join(",");
        break;
      default:
        break;
    }
  });

  // apply
  if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
      e.preventDefault();
      if (idsArr.length === 0) alert("Vui lòng chọn ít nhất 1 sản phẩm");
      else if (typeChange === "deleteAll") {
        let isConfirm = confirm("Do you want to delete these products");
        if (isConfirm) {
          formChangeMulti.submit();
        }
      } else formChangeMulti.submit();
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

const hideAlert = () => {
  const alert = document.querySelector("[show-alert]");
  if (alert) {
    const alertBtnClose = alert.querySelector(".alert-btn-close");
    const time = parseInt(alert.getAttribute("data-time"));
    const timeOutId = setTimeout(() => {
      alert.classList.add("alert-hide");
    }, time);
    alertBtnClose.addEventListener("click", () => {
      console.log("close");
      alert.classList.add("alert-hide");
      clearTimeout(timeOutId);
    });
  }
};

const sortProducts = () => {
  const sortSelect = document.querySelector("[sort-select]");
  const sortClearBtn = document.querySelector("[sort-clear]");
  let url = new URL(window.location.href);
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      const { value } = e.target;
      const [sortKey, sortValue] = value.split("-");
      url.searchParams.set("sortKey", sortKey);
      url.searchParams.set("sortValue", sortValue);
      window.location.href = url.href;
    });
  }
  if (sortClearBtn) {
    sortClearBtn.addEventListener("click", () => {
      url.searchParams.delete("sortKey");
      url.searchParams.delete("sortValue");
      window.location.href = url.href;
    })
  }
  const sortKey = url.searchParams.get("sortKey");
  const sortValue = url.searchParams.get("sortValue");
  if (sortKey && sortValue) {
    const sortString = sortKey + "-" + sortValue;
    const selectedOption = sortSelect.querySelector(`option[value=${sortString}]`);
    selectedOption.selected = true;
  }
};

const productApp = () => {
  changeStatus();
  changeMultiStatus();
  deleteProduct();
  sortProducts();
  hideAlert();
};

productApp();
