const filterByStatus = () => {
  const filterBtns = document.querySelectorAll(".btn-filter");
  if (filterBtns) {
    let url = new URL(window.location.href);
    for (let i = 0; i < filterBtns.length; i++) {
      filterBtns[i].addEventListener("click", () => {
        const status = filterBtns[i].getAttribute("button-status");
        if (status) {
          url.searchParams.set("status", status);
        } else {
          url.searchParams.delete("status");
        }
        window.location.href = url.href;
      });
    }
  }
};

const search = () => {
  const formSearch = document.querySelector("#form-search");
  if (formSearch) {
    let url = new URL(window.location.href);
    formSearch.addEventListener("submit", (e) => {
      e.preventDefault();
      const keyword = e.target.elements.keyword.value;
      if (keyword) {
        url.searchParams.set("keyword", keyword);
      } else {
        url.searchParams.delete("keyword");
      }
      window.location.href = url.href;
    });
  }
};

const pagination = () => {
  const paginationBtns = document.querySelectorAll("[button-pagination]");
  if (paginationBtns) {
    paginationBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const currentPage = btn.getAttribute("button-pagination");
        const url = new URL(window.location.href);
        url.searchParams.set("page", currentPage);
        window.location.href = url.href;
      });
    });
  }
};

/*
const prevNextPageHandle = () => {
  const prevPageBtn = document.querySelector("#prevPageBtn");
  const nextPageBtn = document.querySelector("#nextPageBtn");
  let url = new URL(window.location.href);
  let currentPage = Number(url.searchParams.get("page"));
  if (prevPageBtn) {
    if (currentPage === 1) {
      prevPageBtn.disabled = true;
      prevPageBtn.style.cursor = "no-drop";
    } else {
      prevPageBtn.disabled = false;
      prevPageBtn.addEventListener("click", () => {
        url.searchParams.set("page", currentPage - 1);
        window.location.href = url.href;
      });
    }
  }
  if (nextPageBtn) {
    const maxPage = Number(nextPageBtn.getAttribute("max-page"));
    if (currentPage === maxPage) 
    {
      nextPageBtn.disabled = true;
      nextPageBtn.style.cursor = "no-drop";
    }
    else {
      nextPageBtn.disabled = false;
      nextPageBtn.addEventListener("click", () => {
        url.searchParams.set("page", currentPage + 1);
        window.location.href = url.href;
      });
    }
  }
};
*/

// Upload
const handlePreviewUpload = () => {
  const formUploadImage = document.querySelector("[upload-image]");
  if (formUploadImage) {
    const uploadInput = formUploadImage.querySelector("[upload-image-input]");
    const uploadPreview = formUploadImage.querySelector(
      "[upload-image-preview]"
    );
    if (uploadInput) {
      uploadInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          if (uploadPreview) {
            uploadPreview.src = URL.createObjectURL(file);
          }
        }
      });
    }
  }
};

function app() {
  search();
  filterByStatus();
  pagination();
  handlePreviewUpload();
}

app();
