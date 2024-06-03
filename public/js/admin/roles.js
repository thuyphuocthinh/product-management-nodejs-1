const setPermissions = () => {
  const btnUpdatePermissions = document.querySelector(
    "[button-update-permissions]"
  );
  const tablePermissions = document.querySelector("[table-permissions]");
  if (tablePermissions) {
    if (btnUpdatePermissions) {
      btnUpdatePermissions.addEventListener("click", () => {
        const permissions = [];
        const rows = tablePermissions.querySelectorAll("[data-name]");
        rows.forEach((row) => {
          const name = row.getAttribute("data-name");
          const inputs = row.querySelectorAll("input");
          if (name === "id") {
            inputs.forEach((input) => {
              const id = input.value;
              permissions.push({
                id,
                permissions: [],
              });
            });
          } else {
            inputs.forEach((input, index) => {
              const checked = input.checked;
              if (checked) {
                permissions[index].permissions.push(name);
              }
            });
          }
        });
        if (permissions.length > 0) {
          const formChangePermission = document.querySelector(
            "#form-change-permissions"
          );
          const inputPermissions = formChangePermission.querySelector(
            "input[name='permissions']"
          );
          console.log(permissions);
          inputPermissions.value = JSON.stringify(permissions);
          formChangePermission.submit();
        }
      });
    }
  }
};

const getPermissions = () => {
  const dataRecords = document.querySelector("[data-records]");
  if (dataRecords) {
    const records = JSON.parse(dataRecords.getAttribute("data-records"));
    const tablePermissions = document.querySelector("[table-permissions]");

    records.forEach((record, index) => {
      const permissions = record.permissions;
      permissions.forEach((permission) => {
        const row = tablePermissions.querySelector(`[data-name="${permission}"]`);
        console.log(row);
        const input = row.querySelectorAll("input")[index];
        input.checked = true;
      });
    });
  }
};

setPermissions();
getPermissions();