let text = document.getElementById("text-field");
let imgBox = document.getElementById("imgBox");
let image = document.getElementById("image");
let dBox = document.getElementById("dBox");
let dBtn = document.getElementById("dBtn");
let container = document.getElementById("container");

function generateQR() {
  if (text.value.length > 0) {
    image.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${text.value}`;
    imgBox.classList.add("showImg");
    dBox.classList.add("showBtn");
  } else {
    imgBox.classList.remove("showImg");
    dBox.classList.remove("showBtn");
    text.classList.add("empty");
    setTimeout(() => {
      text.classList.remove("empty");
    }, 1000);
  }
}
function downloadQR() {
  axios({
    url: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${text.value}`,
    method: "GET",
    responseType: "blob",
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;

    link.setAttribute("download", "QR.jpg");
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
  imgBox.classList.remove("showImg");
  dBox.classList.remove("showBtn");
  text.value = null;
}
