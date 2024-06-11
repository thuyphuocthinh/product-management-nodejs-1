const goBack = () => {
  const btnGoBacks = document.querySelectorAll("[btn-goBack]");
  if (btnGoBacks.length > 0) {
    btnGoBacks.forEach((btn) => {
      btn.addEventListener("click", () => {
        history.back();
      });
    });
  }
};

goBack();
