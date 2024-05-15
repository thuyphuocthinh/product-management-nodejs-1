module.exports.filterStatus = (req) => {
  let filterStatus = [
    { name: "Tất cả", status: "", class: "active" },
    { name: "Hoạt động", status: "active", class: "" },
    { name: "Dừng hoạt động", status: "inactive", class: "" },
  ];

  if (req.query.status) {
    filterStatus = filterStatus.map((item) => {
      if (item.status === req.query.status) {
        return { ...item, ["class"]: "active" };
      } else {
        return { ...item, ["class"]: "" };
      }
    });
  }
  return filterStatus;
};
