// send friend-request
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");
if (listBtnAddFriend.length > 0) {
  listBtnAddFriend.forEach((btn) => {
    btn.addEventListener("click", () => {
      const friendBtns = btn.closest(".friend-btns");
      const cancelBtn = friendBtns.querySelector("[btn-cancel-friend]");
      const userId = btn.getAttribute("btn-add-friend");
      socket.emit("CLIENT_ADD_FRIEND", userId);
      cancelBtn.style.display = "block";
      btn.style.display = "none";
      window.location.reload();
    });
  });
}

// cancel friend-request
const listBtnCancelRequest = document.querySelectorAll("[btn-cancel-friend]");
if (listBtnCancelRequest.length > 0) {
  listBtnCancelRequest.forEach((btn) => {
    btn.addEventListener("click", () => {
      const userId = btn.getAttribute("btn-cancel-friend");
      socket.emit("CLIENT_CANCEL_REQUEST", userId);
      window.location.reload();
    });
  });
}

// refuse friend-request
const listBtnRefuseRequest = document.querySelectorAll("[btn-refuse-friend]");
if (listBtnRefuseRequest.length > 0) {
  listBtnRefuseRequest.forEach((btn) => {
    btn.addEventListener("click", () => {
      const userId = btn.getAttribute("btn-refuse-friend");
      socket.emit("CLIENT_REFUSE_REQUEST", userId);
      window.location.reload();
    });
  });
}

// accept friend-request
const listBtnAcceptRequest = document.querySelectorAll("[btn-accept-friend]");
if (listBtnAcceptRequest.length > 0) {
  listBtnAcceptRequest.forEach((btn) => {
    btn.addEventListener("click", () => {
      const userId = btn.getAttribute("btn-accept-friend");
      socket.emit("CLIENT_ACCEPT_FRIEND", userId);
      window.location.reload();
    });
  });
}

// SERVER_RETURN_LENGTH_ACCEPT_FRIEND
socket.on("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", (data) => {
  const badgeUserAccept = document.querySelector("[badge-users-accept]");
  if (badgeUserAccept) {
    const userId = badgeUserAccept.getAttribute("badge-users-accept");
    if (data.userId === userId) {
      badgeUserAccept.innerHTML = data.lengthAcceptFriends;
    }
  }
});

// SERVER_RETURN_INFO_ACCEPT_FRIEND
socket.on("SERVER_RETURN_INFO_ACCEPT_FRIEND", (data) => {
  // Trang loi moi ket ban
  const dataUsersAccept = document.querySelector("[data-users-accept]");
  if (dataUsersAccept) {
    const userId = badgeUserAccept.getAttribute("data-users-accept");
    if (data.userId === userId) {
      // Ve user ra giao dien
      const div = document.createElement("div");
      div.classList.add(".col-md-6.col-12.mb-4.mb-md-0");
      div.setAttribute("user-id", data.infoUserA._id);
      div.innerHTML = `
        <div class="d-flex gap-3 justify-content-center py-2 align-items-center shadow-sm bg-white rounded">
          <div>
            <img src="https://picsum.photos/50/50" alt="${data.infoUserA.fullName}" style="border-radius: 50%;">
          </div>
          <div class="friend-btns"> 
            <p class="fw-bold">${data.infoUserA.fullName}</p>
            <button class="btn btn-primary" btn-accept-friend="${data.infoUserA._id}">Chấp nhận</button>
            <button class="btn btn-secondary" btn-refuse-friend="${data.infoUserA._id}">Xóa</button>
          </div>
        </div>
      `;
      dataUsersAccept.appendChild(div);
      // bat su kien cho cac nut
      // tu choi ket ban
      const btnRefuseFriend = div.querySelector("[btn-refuse-friend]");
      btnRefuseFriend.addEventListener("click", () => {
        const userId = btn.getAttribute("btn-refuse-friend");
        socket.emit("CLIENT_REFUSE_REQUEST", userId);
        window.location.reload();
      });

      // chap nhan loi moi ket ban
      const btnAcceptFriend = div.querySelector("[btn-accept-friend]");
      btnAcceptFriend.addEventListener("click", () => {
        const userId = btn.getAttribute("btn-accept-friend");
        socket.emit("CLIENT_ACCEPT_FRIEND", userId);
        window.location.reload();
      });
    }
  }
  // Trang danh sach nguoi dung
  const dataUserNotFriend = document.querySelector("[data-users-not-friend]");
  if (dataUserNotFriend) {
    const userIdB = dataUserNotFriend.getAttribute("data-users-not-friend");
    if (data.userId === userIdB) {
      const boxUserRemove = dataUsersAccept.querySelector(
        `[user-id="${data.infoUserA._id}"]`
      );
      dataUserNotFriend.removeChild(boxUserRemove);
    }
  }
});

// SERVER_RETURN_USER_ID_CANCEL_FRIEND
socket.on("SERVER_RETURN_USER_ID_CANCEL_FRIEND", (data) => {
  const dataUsersAccept = document.querySelector("[data-users-accept]");
  if (dataUsersAccept) {
    const userId = badgeUserAccept.getAttribute("data-users-accept");
    if (data.userIdB === userId) {
      const userIdA = data.userIdA;
      const boxUserRemove = dataUsersAccept.querySelector(
        `[user-id="${userIdA}"]`
      );
      dataUsersAccept.removeChild(boxUserRemove);
    }
  }
});

// SERVER_RETURN_USER_ONLINE
socket.on("SERVER_RETURN_USER_ONLINE", (data) => {
  const dataUsersFriend = document.querySelector("[data-users-friend]");
  if (dataUsersFriend) {
    const boxUser = dataUsersFriend.querySelector("[user-id]");
    if (boxUser) {
      boxUser.querySelector("[status]").setAttribute("status", "online");
    }
  }
});

// SERVER_RETURN_USER_OFFLINE
socket.on("SERVER_RETURN_USER_OFFLINE", (data) => {
  const dataUsersFriend = document.querySelector("[data-users-friend]");
  if (dataUsersFriend) {
    const boxUser = dataUsersFriend.querySelector("[user-id]");
    if (boxUser) {
      boxUser.querySelector("[status]").setAttribute("status", "offline");
    }
  }
});
