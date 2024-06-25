// fileUpload
const upload = new FileUploadWithPreview.FileUploadWithPreview(
  "upload-image-chat",
  {
    multiple: true,
    maxFileCount: 6,
  }
);
upload.emulateInputSelection(); // to open image browser

// CLIENT_SEND_MESSAGE
let idTimeOut;
const formChat = document.querySelector(".form-chat");
if (formChat) {
  const inputForm = formChat.querySelector(".input-chat");
  formChat.addEventListener("submit", (e) => {
    e.preventDefault();
    const images = upload.cachedFileArray || [];
    if (inputForm) {
      const content = inputForm.value;
      // socketio cannot emit images with high memory
      if (content || images.length > 0) {
        console.log(images);
        socket.emit("CLIENT_SEND_MESSAGE", {
          content: content,
          images: images,
        });
        inputForm.value = "";
        upload.resetPreviewPanel();
        socket.emit("CLIENT_SEND_TYPING", "hidden");
      }
    }
  });
}

// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
  const chatBox = document.querySelector(".chat-box");
  const userId = chatBox.getAttribute("my-id");
  const div = document.createElement("div");
  const listTyping = document.querySelector(".inner-typing");
  div.classList.add("message-block");
  if (userId === data.userId) {
    div.classList.add("outgoing");
  }
  const htmlName =
    userId !== data.userId
      ? `<p class="sender-name fw-bold"> ${data.fullName}</p>`
      : "";
  const htmlContent = data.content
    ? `
    ${htmlName}
    <p class="message ${
      userId === data.userId ? "message-outgoing" : "message-incoming"
    }"> ${data.content} </p>`
    : "";
  let htmlImages;
  if (data.images) {
    for (const image of data.images) {
      htmlImages += `<img src=${image} style="width: 100px;" />`;
    }
  }
  div.innerHTML = `
    ${htmlName}
    ${htmlContent}
    ${htmlImages}
  `;
  chatBox.insertBefore(div, listTyping);
  chatBox.scrollTop = chatBox.scrollHeight;
});

// Scroll Chat
const chatBox = document.querySelector(".chat-box");
if (chatBox) {
  chatBox.scrollTop = chatBox.scrollHeight;
}
// show typing
const showTyping = () => {
  socket.emit("CLIENT_SEND_TYPING", "show");
  clearTimeout(idTimeOut);
  idTimeOut = setTimeout(() => {
    socket.emit("CLIENT_SEND_TYPING", "hidden");
  }, 3000);
};

// Emoji Picker
const emojiPicker = document.querySelector("emoji-picker");
if (emojiPicker) {
  emojiPicker.addEventListener("emoji-click", (event) => {
    const inputForm = formChat.querySelector(".input-chat");
    const icon = event.detail.unicode;
    inputForm.value += icon;
    inputForm.focus();
    inputForm.setSelectionRange(inputForm.value.length, inputForm.value.length);
    showTyping();
  });
}
const iconBtn = formChat.querySelector(".icon-btn");
const chatIcon = document.querySelector(".chat-icon");
if (iconBtn) {
  iconBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    chatIcon.classList.toggle("hide");
  });
}

document.addEventListener("click", (e) => {
  if (!emojiPicker.contains(e.target)) {
    if (!chatIcon.classList.contains("hide")) {
      chatIcon.classList.add("hide");
    }
  }
});

// typing
const inputForm = formChat.querySelector(".input-chat");
inputForm.addEventListener("keyup", () => {
  showTyping();
});

const listTyping = document.querySelector(".inner-typing");
if (listTyping) {
  socket.on("SERVER_RETURN_TYPING", (data) => {
    if (data.type === "show") {
      const existTyping = listTyping.querySelector(
        `[user-id="${data.userId}"]`
      );
      if (!existTyping) {
        const boxTyping = document.createElement("div");
        boxTyping.classList.add("box-typing");
        boxTyping.setAttribute("user-id", data.userId);
        boxTyping.innerHTML = `
          <div class="inner-name"> ${data.fullName}</div>
          <div class="inner-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
      `;
        listTyping.appendChild(boxTyping);
      }
      chatBox.scrollTop = chatBox.scrollHeight;
    } else {
      listTyping.removeChild(
        listTyping.querySelector(`[user-id="${data.userId}"]`)
      );
    }
  });
}

//https://github.com/nolanlawson/emoji-picker-element
//https://johndatserakis.github.io/file-upload-with-preview/typedoc/
